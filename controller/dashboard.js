const express = require('express');
const router = express.Router();
const generalTools=require('../tools/general-tools')
const comment=require('./comments');
const {
    dashboard,
    logOut,
    deleteUser,
    getProfileInfoPage, 
} = require('../services/dashboard');

router.get('/', generalTools.LoginCheck, dashboard);

router.get('/profile', getProfileInfoPage)

router.get('/logout', logOut)

router.delete('/deleteuser', generalTools.DeleteBloggerCheck, deleteUser)

router.post('/comment', comment);

module.exports = router;