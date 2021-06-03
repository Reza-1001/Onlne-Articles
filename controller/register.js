const express = require('express');
const router = express.Router();

const {
    registerPage,
    createBlogger,
    createAdmin
} = require('../services/register');

router.post('/createadmin', createAdmin)

router.get('/', registerPage);

router.post('/', createBlogger);

module.exports = router;