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
        role: 'Blogger'
    }, {
        userName: 1,
        firstName: 1,
        lastName: 1,
        profileImage: 1,
        createAt: 1,
        aboutMe: 1,
        resetPassRequest: 1
    }, (err, users) => {
        if (err) return res.send("Server Error")
        if (!users) return res.send("No User Found")

        // res.render('pages/dashboard',{users:bloggers})
        if (req.query.search) {
            let keyWord = req.query.search.toLowerCase();
            users = users.filter(user => {
                if (user.firstName.toLowerCase().indexOf(keyWord) != -1 ||
                    user.lastName.toLowerCase().indexOf(keyWord) != -1 ||
                    user.userName.toLowerCase().indexOf(keyWord) != -1) {
                    return true
                }
            })
            return res.send(users);
        }
        return res.send(users);
    })
}


const getOneUser = (req, res, next) => {
    User.find({
        _id: req.params.id
    }, (err, user) => {
        if (err) return res.send("Server Error");
        if (!user) return res.send("User Not Found");
        if (req.session.user.role == 'Admin' || req.session.user._id == req.params.id) {
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
    // let oldUseAvatar= req.session.user.profileImage;
    // let oldUserName=req.session.user.userName;
    User.findByIdAndUpdate(req.session.user._id, req.body, {
        new: true
    }, (err, user) => {
        if (err) return res.status(500).json(false);
        // if (user.userName !== oldUserName) fs.renameSync(`/images/avatar/${user.userName}-avatar`, `/images/avatar/${oldUseAvatar}`)
        return res.redirect('/dashboard')
    })
}

const addAvatar = (req, res, next) => {
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

                        })
                    }
                    req.session.user = user;
                    return res.redirect('/dashboard')
                }
            })
        }
    })
}

const deleteAvatar = (req, res, next) => {
    User.findByIdAndUpdate(req.session.user._id, {
        profileImage: ""
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

                })
            }
            req.session.user = user;
            res.json(true)

        }
    })
}

const deleteUser = (req, res, next) => {
    User.deleteOne({
        _id: req.params.user_id
    }, function (err, user) {
        if (err) return res.send("Error Deleting User");
        if (user) {
            let userId = user._id;

        }
        res.send("User Deleted")
    });
}

const resetPassword = (req, res, next) => {
    console.log(req.params.user_id)
    let newPass;
    User.findOne({
        _id: req.params.user_id
    }, (err, user) => {
        if (err) return res.status(500).send("Serrver Error \n" + err);
        if (!user) return res.status(404).send("User Not Found");
        newPass = user.phoneNumber;
        User.updateOne({
            _id: req.params.user_id
        }, {
            $set: {
                newPass: newPass,
                resetPassRequest: false
            }
        }, {
            new: true
        }, (err, user2) => {
            if (err) return console.log(err);

            return res.json(true)
        })
    })

}


const usersStatistics = (req, res, next) => {

    User.countDocuments({
        role: 'Blogger'
    }, (err, count) => {

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        User.countDocuments({
            createAt: {
                $gte: today
            }
        }, (err2, newUsers) => {
            User.find({
                role: 'Blogger'
            }).sort({
                createAt: -1
            }).exec((err3, recentUsers) => {

                User.find({
                    resetPassRequest: true
                }, (err, users) => {
                    res.json({
                        allUsers: count,
                        newUsers: newUsers,
                        recentUsers: recentUsers,
                        users: users
                    })
                })

            })
        });

    })
}







module.exports = {
    getAllUsers,
    getOneUser,
    updateUserPassword,
    updateUserInfo,
    addAvatar,
    deleteAvatar,
    deleteUser,
    resetPassword,
    usersStatistics

};