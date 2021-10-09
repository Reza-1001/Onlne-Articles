const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools')
const registerService = require('../services/register');

router.post('/createadmin', registerService.createAdmin)

router.get('/', registerService.registerPage);

router.post('/', registerService.createBlogger);

module.exports = router;