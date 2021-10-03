const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools')
const comment = require('./comments');
const dashboardService = require('../services/dashboard');

router.get('/', generalTools.LoginCheck, dashboardService.dashboard);

router.get('/profile', dashboardService.getProfileInfoPage)

router.get('/users', dashboardService.usersInfoPage)

router.get('/logout', dashboardService.logOut)



router.post('/comment', comment);

module.exports = router;