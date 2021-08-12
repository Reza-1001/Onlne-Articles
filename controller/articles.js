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
 
router.get('/', newArticlePage)
router.post('/new', addNewArticle);

router.delete('/', deleteArticle);

router.get('/:article_id', getArticle);

router.get('/', getAllArticles);


module.exports = router;