const path = require('path');
const fs = require('fs');
const url = require('url');
const multer = require('multer');
const upload = multer({
    dest: 'public/images/avatar'
})
const User = require('../models/Users');
const Article = require('../models/Article');
const generalTools = require('./../tools/general-tools.js');

const getAllUsers = (req, res, next) => {
    User.find({
        role: 'blogger'
    }, (err, bloggers) => {
        if (err) return res.send("Server Error")
        if (!bloggers) return res.send("No Blogger Found")

        // res.render('pages/dashboard',{users:bloggers})
        return res.send(bloggers);
    })
}


const getOneUser = (req, res, next) => {
    console.log(req.params.id);
    User.find({
        _id: req.params.id
    }, (err, user) => {
        console.log(user)
        if (err) return res.send("Server Error");
        if (!user) return res.send("User Not Found");
        if (req.session.user.role == 'admin' || req.session.user._id == req.params.id) {
            return res.send(user);
        }
        return res.send('Access Denied');
    })
}


const updateUserPassword = (req, res, next) => {
    User.updateOne({
        _id: req.session.user._id
    }, {
        $set: req.body
    }, {
        new: true
    }, (err, user) => {
        if (err) return res.status(500).send("Somthing went wrong in update user! \n" + err);
        return res.json(true)
    })
}

const updateUserInfo = (req, res, next) => {
    console.log(110011);
    console.log(req.body)
    User.findByIdAndUpdate(req.session.user._id, req.body, {
        new: true
    }, (err, user) => {
        if (err) return res.status(500).json(false);
        return res.redirect('/api/dashboard')
    })
}

const addAvatar = (req, res, next) => {
    console.log(11111111)
    const upload = generalTools.UploadAvatar.single('avatar');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.send("Server Error")
        } else if (err) return res.send("Server Error")
        else {
            User.findByIdAndUpdate(req.session.user._id, {
                profileImage: req.file.filename
            }, { 
                new: true
            }, (err, user) => {
                if (err) {
                    return res.send("Server Error")
                } else {
                    if (req.session.user.profileImage) {
                        fs.unlink(path.join(__dirname, '../public/images/avatar', req.session.user.profileImage), err => {
                            if (err) {
                                return res.status(500).json({
                                    msg: "Server Error!"
                                })
                            } 
                            // else {
                            //     req.session.user = user;
                            //     // res.json(true)
                            //     return res.redirect('/api/dashboard')
                            // }
                        })  
                    }
                    req.session.user = user;
                    // res.json(true)
                    return res.redirect('/api/dashboard')
                }
            })
        }
    })
}


module.exports = {
    getAllUsers,
    getOneUser,
    updateUserPassword,
    updateUserInfo,
    addAvatar
};