const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools');

const commentsService = require('../services/comments.js');


router.post('/', commentsService.addComment);


router.delete('/:comment_id', commentsService.deleteComment);


router.get('/:article_id', commentsService.getAllComments);


module.exports = router;