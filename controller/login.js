const express = require('express');
const router = express.Router();

const {
    loginPage,
    bloggerLogin
} = require('../services/login.js');

router.get('/login', loginPage);

router.post('/', bloggerLogin);


module.exports = router;