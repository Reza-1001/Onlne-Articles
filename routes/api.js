const express = require('express');
const router = express.Router();
const authenticationRouter = require('./auth');
const register=require('../controller/register');

router.use('/register', register);

module.exports = router;