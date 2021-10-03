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

const usersService = require('../services/users');


router.get('/', IsAdmin, usersService.getAllUsers);

router.patch('/', generalTools.PasswordCheck, usersService.updateUserPassword)


router.post('/update', usersService.updateUserInfo)

router.get('/user:id', usersService.getOneUser)

router.post('/avatar', usersService.addAvatar)

router.delete('/avatar', usersService.deleteAvatar)

router.delete('/:user_id', generalTools.DeleteBloggerCheck, usersService.deleteUser)

router.get('/reset_pass/:user_id', usersService.resetPassword)


router.get('/statistics', usersService.usersStatistics)



module.exports = router;