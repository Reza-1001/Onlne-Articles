const express = require('express');
const router = express.Router();
const generalTools=require('../tools/general-tools');
const {IsAdmin}=require('../tools/general-tools');

const {
    getAllUsers,
    getOneUser,
    updateUserPassword,
    updateUserInfo
} = require('../services/users');


router.get('/', IsAdmin, getAllUsers);

router.patch('/', generalTools.PasswordCheck,updateUserPassword)

router.put('/',updateUserInfo)

router.get('/user:id', getOneUser)


module.exports = router;