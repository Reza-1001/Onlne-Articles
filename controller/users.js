const express = require('express');
const router = express.Router();
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const generalTools = require('../tools/general-tools');
const User = require('../models/Users')
const {
    IsAdmin
} = require('../tools/general-tools');

const {
    getAllUsers,
    getOneUser,
    updateUserPassword,
    updateUserInfo,
    addAvatar,
    deleteAvatar
} = require('../services/users');


router.get('/', IsAdmin, getAllUsers);

router.patch('/', generalTools.PasswordCheck, updateUserPassword)
// router.patch('/', (req,res)=>{
//     console.log(req.body)
// })

router.post('/update', updateUserInfo)

router.get('/user:id', getOneUser)
 
router.post('/avatar', addAvatar)

router.delete('/avatar', deleteAvatar)


module.exports = router;