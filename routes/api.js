const express = require('express');
const router = express.Router();

const register=require('../controller/register');

router.use('/register', register);

router.use('/login', login);


module.exports = router;