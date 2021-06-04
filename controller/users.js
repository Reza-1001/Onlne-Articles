const express = require('express');
const router = express.Router();
const generalTools=require('../tools/general-tools');
const {IsAdmin}=require('../tools/general-tools');

const {
    getAllUsers,
    updateUserPassword,
    updateUserInfo
} = require('../services/users');


router.get('/', IsAdmin, getAllUsers);

router.patch('/', generalTools.PasswordCheck,updateUserPassword)

router.put('/',updateUserInfo)


module.exports = router;