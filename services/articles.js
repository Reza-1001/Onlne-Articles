const path = require('path');
const Blogger = require('../models/Users');
const Comment = require('../models/Comment');
const Article = require('../models/Article');

const fs = require('fs');
const {
    deleteAllComments
} = require('./comments');


const newArticlePage = (req, res, next) => {
    res.render('pages/article/newArticle', {
        user: req.session.user
    });
}

const addNewArticle = (req, res, next) => {

    let articleFile = `public/articles/${req.body.title}-${req.session.user.userName}.html`;
    const NEW_ARTICLE = new Article({
        avatar: req.file.filename,
        content: articleFile,
        snippet: req.body.snippet,
        writer: req.session.user._id,
        title: req.body.title,
        category: req.body.category,
        views: 20,
    });
    NEW_ARTICLE.save(err => {
        if (err) {
            console.log(err);
            return res.send('Error in Save Article');
        }
        fs.writeFileSync(articleFile, req.body.mytext);
        return res.redirect('/api/dashboard')
    });
}

const getArticle = (req, res, next) => {
    Article.findOne({
        _id: req.params.article_id
    }).populate('writer', {
        _id: 1,
        firstName: 1,
        lastName: 1,
        _id: 1,
        profileImage: 1
    }).exec((err, article) => {
        if (err) return res.send("Server Error");
        if (!article) return res.send("article Not Found");
        let data = fs.readFileSync(path.join(__dirname, "../", article.content));
        res.render('pages/article/readArticle', {
            article: {
                content: data,
                info: article
            }
        })
    })
}

const deleteArticle = (req, res, next) => {

}


const editArticle=(req,res,next)=>{
    console.log("--------"+req.params.raticle_id)
    Article.findOne({
        _id: req.params.article_id
    }).populate('writer', {
        _id: 1,
        firstName: 1,
        lastName: 1,
        _id: 1,
        profileImage: 1
    }).exec((err, article) => {
        if (err) return res.send("Server Error");
        if (!article) return res.send("article Not Found");
        let data = fs.readFileSync(path.join(__dirname, "../", article.content),'utf8');
        res.render('pages/article/editArticle', {
            article: {
                content: data,
                info: article
            }
        })
    })
}

const getAllArticles = (req, res, next) => {
    Article.find({}).populate('writer', {
        firstName: 1,
        lastName: 1,
        _id: 1,
        profileImage: 1
    }).exec((err, articles) => {
        if (err) return res.send("Server Error")
        if (!articles) return res.send("No Article Found")
        if (req.query.id) {
            articles = articles.filter(article => {
                return article.writer._id == req.query.id
            })
            return res.render('pages/article/myArticles', {
                articles: articles
            })
        }
        res.render('pages/article/allArticles', {
            articles: articles
        })
        // return res.send(articles); 
    })


}


module.exports = {
    addNewArticle,
    deleteArticle,
    getArticle,
    getAllArticles,
    newArticlePage,
    editArticle
};