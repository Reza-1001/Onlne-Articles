const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools')
const {
    registerPage,
    createBlogger,
    createAdmin
} = require('../services/register');

router.post('/createadmin', generalTools.DefaultAvatar, createAdmin)

router.get('/', registerPage);

router.post('/', generalTools.DefaultAvatar, createBlogger);

module.exports = router;