const express = require('express');
const router = express.Router();

const {
    registerPage,
    createBlogger
} = require('../services/register');

router.get('/', registerPage);
router.post('/', createBlogger);

module.exports = router;