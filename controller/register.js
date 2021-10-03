const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools')
const registerService = require('../services/register');

router.post('/createadmin', generalTools.DefaultAvatar, registerService.createAdmin)

router.get('/', registerService.registerPage);

router.post('/', generalTools.DefaultAvatar, registerService.createBlogger);

module.exports = router;