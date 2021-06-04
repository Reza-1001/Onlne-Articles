const express = require('express');
const router = express.Router();
const generalTools=require('../tools/general-tools');
const {IsAdmin}=require('../tools/general-tools');
const {
    getAllUsers,
    updateBlogger
} = require('../services/users');



router.get('/', IsAdmin, getAllUsers);

router.patch('/', generalTools.PasswordCheck,updateBlogger)

module.exports = router;