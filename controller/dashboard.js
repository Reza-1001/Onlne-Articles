const express = require('express');
const router = express.Router();
const generalTools=require('../tools/general-tools')

const {
    dashboard,
    logOut,
    deleteUser,
} = require('../services/dashboard.js');

router.get('/', generalTools.LoginCheck, dashboard);

router.get('/logout', logOut)

router.delete('/deleteuser', generalTools.DeleteBloggerCheck, deleteUser)


module.exports = router;