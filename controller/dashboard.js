const express = require('express');
const router = express.Router();
const generalTools=require('../tools/general-tools')
const comment=require('./comments');
const {
    dashboard,
    logOut,
    getProfileInfoPage,
    usersInfoPage, 
} = require('../services/dashboard');

router.get('/', generalTools.LoginCheck, dashboard);

router.get('/profile', getProfileInfoPage)

router.get('/users', usersInfoPage)

router.get('/logout', logOut)



router.post('/comment', comment);

module.exports = router;