const express = require('express');
const router = express.Router();
const authenticationRouter = require('./auth');

router.use('/auth', authenticationRouter);

module.exports = router;