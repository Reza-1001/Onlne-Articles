const express = require('express');
const router = express.Router();
const multer=require('multer')
const generalTools = require('../tools/general-tools');
const {
    IsAdmin
} = require('../tools/general-tools');

const {
    getAllUsers,
    getOneUser,
    updateUserPassword,
    updateUserInfo,
    updateAvatar
} = require('../services/users');


router.get('/', IsAdmin, getAllUsers);

router.patch('/', generalTools.PasswordCheck, updateUserPassword)

router.put('/', updateUserInfo)

router.get('/user:id', getOneUser)

router.post('/avatar', (req, res, next) => {
    const upload = generalTools.UploadAvatar.single('avatar');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.send("Server Error")
        } else if (err) return res.send("Server Error")
        else {
            res.json(true)
        }
    })
})

module.exports = router;