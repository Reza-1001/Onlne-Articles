const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools')

// Service for Handling Article Operations 
const articlesService = require('../services/articles.js');

// send new article page to client
router.get('/new', generalTools.LoginCheck, articlesService.newArticlePage)

// add new article | save article picture
router.post('/new', generalTools.UploadAvatar.single('article'), articlesService.addNewArticle);

// delete article by ID
router.delete('/:article_id', articlesService.deleteArticle);

// Get an article by ID
router.get('/:article_id', articlesService.getArticle);

// 
router.get('/edit/:article_id', articlesService.editArticle);

router.post('/update/:article_id', generalTools.UploadAvatar.single('article'), articlesService.updateArticle);

// Get All Articles for All users || Get All Articles of a single user by id in query
router.get('/', articlesService.getAllArticles);

router.post('/statistics', articlesService.articleStatistics);

module.exports = router;