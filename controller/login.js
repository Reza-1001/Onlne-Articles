const express = require('express');
const router = express.Router();
const generalTools=require('../tools/general-tools')


const {
    loginPage,
    userLogin
} = require('../services/login.js');

router.get('/', generalTools.SessionCheck, loginPage);

router.post('/', userLogin);




module.exports = router;