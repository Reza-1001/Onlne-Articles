const path = require('path');
const Article = require('../models/Article');
const generalTools = require('../tools/general-tools');
const fs = require('fs');
const {
    deleteArticleComments
} = require('./comments');
const {
    deleteUserComments
} = require('./comments');


// *****************************************************************************************************
//                                  SEND NEW ARTICLE PAGE TO USER
// *****************************************************************************************************
exports.newArticlePage = (req, res, next) => {
    res.render('pages/article/newArticle', {
        user: req.session.user
    });
}


// *****************************************************************************************************
//                                  SAVE NEW ARTICLE'S INFO IN DB
// *****************************************************************************************************
exports.addNewArticle = (req, res, next) => {
    // file name for saving Article file as html file
    let articleFile = `public/articles/article-${Date.now()}-${req.session.user.userName}.html`;
    const NEW_ARTICLE = new Article({
        content: articleFile,
        snippet: req.body.snippet,
        writer: req.session.user._id,
        title: req.body.title,
        category: req.body.category,
        views: 20,
    });
    // check if article has avatar image
    // if avatar image is not set by user use default avatar for article and copy it to avatar images
    if (!req.file) {
        let filename = `article-avatar-${Date.now()}-article.jpg`;
        // copy and rename default article avatar image
        fs.copyFile(path.join(__dirname, '../public/assets/images/article.jpg'), path.join(__dirname, `../public/images/article/${filename}`), (err) => {
            if (err) throw err;
        });
        // addng avatar file path to article model schema
        NEW_ARTICLE.avatar = filename;
    } else {

        NEW_ARTICLE.avatar = req.file.filename;
    }

    // Saving article in db
    NEW_ARTICLE.save(err => {
        if (err) {
            console.log(err);
            return res.send('Error in Save Article');
        }
        // saving article text in html file with specified file name
        fs.writeFileSync(articleFile, req.body.mytext);
        // return to dahsboard after save article
        return res.redirect('/dashboard')
    });
}


// *****************************************************************************************************
//                                  GET SINGLE ARTICLE BY ID
// *****************************************************************************************************
exports.getArticle = (req, res, next) => {
    Article.findOne({
        _id: req.params.article_id
    }).populate('writer', {
        _id: 1,
        firstName: 1,
        lastName: 1, 
        profileImage: 1
    }).exec((err, article) => {
        if (err) return res.send("Server Error");
        if (!article) return res.send("Article Not Found");
        // read article saved html file 
        let data = fs.readFileSync(path.join(__dirname, "../", article.content));
        res.render('pages/article/readArticle', {
            article: {
                content: data,
                info: article
            },
            user: req.session.user
        })
    })
}


// *****************************************************************************************************
//                                  DELETE SINGLE ARTICLE BY ID
// *****************************************************************************************************
exports.deleteArticle = (req, res, next) => {
    Article.findByIdAndDelete({
        _id: req.params.article_id
    }, (err, article) => {
        if (err) return res.send("Server Error");
        if (!article) return res.send("Article Not Found");
        console.log("DELETED ARTICLE   = " + article)
        // use generaltools method to delete article file and avatar after deleting article from db
        generalTools.deleteArticleFiles([article.content], [article.avatar]);
        deleteArticleComments([req.params.article_id]);
        res.send(true);
    })
}


// *****************************************************************************************************
//                                  DELETE ALL ARTICLES FOR A USER
// *****************************************************************************************************
exports.deleteAllArticles = async (userId, userAvatar) => {
    let articleFiles = [];
    let avatarFiles = [];
    let articleIdList = [];
    await Article.find({
        writer: userId
    }, (err, articles) => {
        if (err) return res.send("Server Error");
        if (!articles) return res.send("Articles not found");
        if (articles) {
            articles.forEach(article => {
                console.log(article)
                articleFiles.push(article.content);
                avatarFiles.push(article.avatar);
                articleIdList.push(article._id);
            })
        }
    })
    await Article.deleteMany({
        writer: userId
    }, (err, articles) => {
        if (err) return res.send(`Error in Deleting Articles for ${userId}`);
    })
    generalTools.deleteArticleFiles(articleFiles, avatarFiles, userAvatar);
    deleteUserComments(userId);
    deleteArticleComments(articleIdList);

}



// *****************************************************************************************************
//                                  FIND AN ARTICLE AND SEND EDIT ARTICLE PAGE
// *****************************************************************************************************
exports.editArticle = (req, res, next) => {
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
        let data = fs.readFileSync(path.join(__dirname, "../", article.content), 'utf8');
        res.render('pages/article/editArticle', {
            article: {
                content: data,
                info: article
            }
        })
    })
}


// *****************************************************************************************************
//                                  #FIND ALL ARTICLES
//                                  #FIND ALL ARTICLES OF A USER
//                                  #FIND ALL ARTICLES FILTERED BY SEARCH KEYWORD
// *****************************************************************************************************
exports.getAllArticles = (req, res, next) => {
    let pageNumber
    if (!req.query.page)
        pageNumber = 1;
    else
        pageNumber = req.query.page;

    Article.find({}).sort({
        createdAt: -1
    }).populate('writer', {
        userName: 1,
        firstName: 1,
        lastName: 1,
        _id: 1,
        profileImage: 1
    }).exec((err, articles) => {
        if (err) return res.send("Server Error")
        if (!articles) return res.send("No Article Found")
        let articleCount = articles.length;
        // if request contains id then flter result by writer ID
        if (req.query.id) {
            articles = articles.filter(article => {
                return article.writer._id == req.query.id
            })
            articleCount = articles.length;
            // return all articles for a writer
            return res.render('pages/article/myArticles', {
                articles: articles,
                count: articleCount
            })
        }
        if (req.query.search) {

            // keword for search in articles
            let keyWord = req.query.search.toLowerCase();

            // filter articles that contains search keyword and send to client
            articles = articles.filter(article => {

                // read article cntent from file and search for keyword
                content = fs.readFileSync(path.join(__dirname, `../${article.content}`), 'utf-8');
                if (content.toLowerCase().indexOf(keyWord) != -1 || article.title.toLowerCase().indexOf(keyWord) != -1) {
                    return true
                }
            });
        }

        // send all article count for pagination in client side
        articleCount = articles.length;

        // send number of articles base on page number
        articles = articles.slice((pageNumber - 1) * 9, pageNumber * 9)
        res.render('pages/article/allArticles', {
            articles: articles,
            count: articleCount
        })
    })
}

// *****************************************************************************************************
//                                  UPDATE AN ARTICLE
// *****************************************************************************************************
exports.updateArticle = (req, res, next) => {
    let articleFile = `public/articles/article-${Date.now()}-${req.session.user.userName}.html`;
    let newArticle
    if (req.file) {
        newArticle = {
            title: req.body.title,
            category: req.body.category,
            snippet: req.body.snippet,
            content: articleFile,
            avatar: req.file.filename,
        };
    } else if (!req.file) {
        newArticle = {
            title: req.body.title,
            category: req.body.category,
            snippet: req.body.snippet,
            content: articleFile,
        };
    }
    let a
    Article.findOneAndUpdate({
            "_id": req.params.article_id
        },
        newArticle
    ).exec(function (err, article) {
        if (err) return res.status(500).send("Somthing went wrong in update Article! \n" + err);

        // if new article avatar updated remove previous avatar file
        if (req.file) {
            generalTools.deleteArticleFiles([article.content], [article.avatar]);

        } 
        fs.writeFileSync(articleFile, req.body.mytext);
        res.redirect(`/article/${article._id}`);
    })
}


// *****************************************************************************************************
//                                  GET ARTICLE STATISTICS
// *****************************************************************************************************
exports.articleStatistics = (req, res, next) => {
    Article.countDocuments({}, (err, count) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        Article.countDocuments({
            createdAt: {
                $gte: today
            }
        }, (err2, newArticles) => {
            Article.find({}).sort({
                createdAt: -1
            }).populate('writer', {
                userName: 1,
                _id: 1,
            }).exec((err3, recentArticles) => {
                res.json({
                    allArticles: count,
                    newArticles: newArticles,
                    recentArticles: recentArticles.slice(0, 8)
                })
            })
        });

    })
}