const express = require('express');
const router = express.Router();
const generalTools=require('../tools/general-tools')

const {
    addComment,
    deleteComment,
    getAllComments,
} = require('../services/comments.js');

router.post('/', addComment);

router.delete('/', deleteComment);

router.get('/:article_id', getAllComments);


module.exports = router;