const express = require('express');
const router = express.Router();
const generalTools=require('../tools/general-tools');
const register = require('../controller/register');
const login = require('../controller/login');
const dashboard = require('../controller/dashboard');
const users = require('../controller/users');

router.use('/register', register);

router.use('/login', login);

router.use('/dashboard', dashboard);

router.use('/users' , users);


module.exports = router;