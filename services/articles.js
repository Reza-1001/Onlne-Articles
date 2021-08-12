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
    new Article({
        avatar: " ",
        content: articleFile,
        writer: req.session.user._id,
        title: req.body.title,
        category: req.body.category,
        views: 20

    }).save(err => {
        if (err) {
            console.log(err);
            return res.send('Error in Save Article');
        }
        fs.writeFileSync(articleFile, req.body.mytext);
        return res.redirect('/api/dashboard')
    })
}

const getArticle = (req, res, next) => {

}

const deleteArticle = (req, res, next) => {

}


const getAllArticles = (req, res, next) => {

}


module.exports = {
    addNewArticle,
    deleteArticle,
    getArticle,
    getAllArticles,
    newArticlePage
};