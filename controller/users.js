const express = require('express');
const router = express.Router();
const multer=require('multer')
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
    updateAvatar
} = require('../services/users');


router.get('/', IsAdmin, getAllUsers);

router.patch('/', generalTools.PasswordCheck, updateUserPassword)
// router.patch('/', (req,res)=>{
//     console.log(req.body)
// })

router.put('/', updateUserInfo)

router.get('/user:id', getOneUser)

router.post('/avatar', (req, res, next) => {
    const upload = generalTools.UploadAvatar.single('avatar');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.send("Server Error")
        } else if (err) return res.send("Server Error")
        else {

           User.findByIdAndUpdate(req.session.user._id, {profileImage: req.file.filename},{new: true},(err, user)=>{
            if (err) {
                return res.send("Server Error")
            }else{
                req.session.user=user;
                res.json(user)
            }   
           })
        }
    })
})


module.exports = router;