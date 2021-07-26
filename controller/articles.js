const express = require('express');
const router = express.Router();
const generalTools=require('../tools/general-tools')

const {
    addNewArticle,
    deleteArticle,
    getArticle,
    getAllArticles
} = require('../services/articles.js');

router.post('/', addNewArticle);

router.delete('/', deleteArticle);

router.get('/:article_id', getArticle);

router.get('/:article_id', getAllArticles);


module.exports = router;