const path = require('path');
const fs = require('fs');
const multer = require('multer');
const User = require('../models/Users');
const {
    deleteAllArticles
} = require('./articles');
const {
    deleteUserComments
} = require('./comments');
const generalTools = require('./../tools/general-tools.js');



// *****************************************************************************************************
//                                  GET ALL BLOGGERS INFO
// *****************************************************************************************************
exports.getAllUsers = (req, res, next) => {
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

        // no users found in db
        if (!users) return res.send("No User Found")

        // client searched for a user with
        // filter users list by search keyword
        if (req.query.search) {
            let keyWord = req.query.search.toLowerCase();
            users = users.filter(user => {
                // if users firstname or lastname or username match with keyword
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



// *****************************************************************************************************
//                                  GET SINGLE USER INFO
// *****************************************************************************************************
exports.getOneUser = (req, res, next) => {
    User.find({
        _id: req.params.id
    }, (err, user) => {
        if (err) return res.send("Server Error");
        if (!user) return res.send("User Not Found");

        // Check if client is Admin or client requests for its own info
        if (req.session.user.role == 'Admin' || req.session.user._id == req.params.id) {
            return res.send(user);
        }
        return res.send('Access Denied');
    })
}


// *****************************************************************************************************
//                                  UPDATE USERS PASSWORD
// *****************************************************************************************************
exports.updateUserPassword = (req, res, next) => {
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


// *****************************************************************************************************
//                                  UPDATE USERS INFO
// *****************************************************************************************************
exports.updateUserInfo = (req, res, next) => {
    User.findByIdAndUpdate(req.session.user._id, req.body, {
        new: true
    }, (err, user) => {
        if (err) return res.status(500).json(false);
        // if (user.userName !== oldUserName) fs.renameSync(`/images/avatar/${user.userName}-avatar`, `/images/avatar/${oldUseAvatar}`)
        return res.redirect('/dashboard')
    })
}


// *****************************************************************************************************
//                                  ADD USER AVATAR
// *****************************************************************************************************
exports.addAvatar = (req, res, next) => {
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
                    if (req.session.user.profileImage != "default-avatar.jpg") {
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


// *****************************************************************************************************
//                                  DELETE USER'S AVATAR
// *****************************************************************************************************
exports.deleteAvatar = (req, res, next) => {
    if (req.session.user.profileImage != "default-avatar.jpg") {
        User.findByIdAndUpdate(req.session.user._id, {
            profileImage: "default-avatar.jpg"
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
}


// *****************************************************************************************************
//                                  DELETE BLOGGER
// *****************************************************************************************************
exports.deleteUser = (req, res, next) => {
    let userId = req.params.user_id;
    let userAvatar;
    User.find({
        _id: userId
    }, (err, user) => {
        if (err) return res.send("Server Error");
        if (!user) return res.send("User not found");
        if (user) userAvatar = user.userAvatar;
    })
    User.deleteOne({
        _id: req.params.user_id
    }, function (err, user) {
        if (err) return res.send("Error Deleting User");
        deleteAllArticles(req.params.user_id, userAvatar);
        deleteUserComments(req.params.user_id);
        res.send("User Deleted")
    });
}



// *****************************************************************************************************
//                                  RESET USERS PASSWORD
// *****************************************************************************************************
exports.resetPassword = (req, res, next) => {
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

// *****************************************************************************************************
//                                  GET ALL BLOGGERS STATISTICS
// *****************************************************************************************************
exports.usersStatistics = (req, res, next) => {

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