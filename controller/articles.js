const express = require('express');
const router = express.Router();
const generalTools=require('../tools/general-tools')

const {
    addNewArticle,
    deleteArticle,
    getArticle,
    getAllArticles,
    newArticlePage
} = require('../services/articles.js');
 
router.get('/new', newArticlePage)

router.post('/new', addNewArticle);

router.delete('/', deleteArticle);

router.get('/:article_id', getArticle);

// Get All Articles for All users || Get All Articles of a single user by id in query
router.get('/', getAllArticles);


module.exports = router;