const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools')

const {
    addNewArticle,
    deleteArticle,
    getArticle,
    getAllArticles,
    newArticlePage,
    editArticle
} = require('../services/articles.js');

router.get('/new', newArticlePage)

router.post('/new', generalTools.UploadAvatar.single('article'), addNewArticle);

router.delete('/:article_id', deleteArticle);

router.get('/:article_id', getArticle);

router.get('/edit/:article_id', editArticle);
 
// Get All Articles for All users || Get All Articles of a single user by id in query
router.get('/', getAllArticles);

    
module.exports = router;