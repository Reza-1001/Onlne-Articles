const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools')

const {
    addNewArticle,
    deleteArticle,
    getArticle,
    getAllArticles,
    newArticlePage,
    editArticle,
    updateArticle
} = require('../services/articles.js');

router.get('/new', newArticlePage)

router.post('/new', generalTools.UploadAvatar.single('article'), addNewArticle);

router.delete('/:article_id', deleteArticle);

router.get('/:article_id', getArticle);

router.get('/edit/:article_id', editArticle);

router.post('/update/:article_id',generalTools.UploadAvatar.single('article'), updateArticle);
 
// Get All Articles for All users || Get All Articles of a single user by id in query
router.get('/', getAllArticles);

    
module.exports = router;