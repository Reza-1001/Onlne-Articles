const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools')
const loginService = require('../services/login.js');

router.get('', generalTools.SessionCheck, loginService.loginPage);

router.post('/', loginService.userLogin);

router.post('/reset_pass', loginService.resetPasswordRequest)


module.exports = router;