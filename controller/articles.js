const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools')

// Service for Handling Article Operations 
const {
    addNewArticle,
    deleteArticle,
    getArticle,
    getAllArticles,
    newArticlePage,
    editArticle,
    updateArticle,
    articleStatistics
} = require('../services/articles.js');

// send new article page to client
router.get('/new', generalTools.LoginCheck, newArticlePage)

// add new article | save article picture
router.post('/new', generalTools.UploadAvatar.single('article'), addNewArticle);

// delete article by ID
router.delete('/:article_id', deleteArticle);

// Get an article by ID
router.get('/:article_id', getArticle);

// 
router.get('/edit/:article_id', editArticle);

router.post('/update/:article_id', generalTools.UploadAvatar.single('article'), updateArticle);

// Get All Articles for All users || Get All Articles of a single user by id in query
router.get('/', getAllArticles);

router.post('/statistics', articleStatistics);

module.exports = router;