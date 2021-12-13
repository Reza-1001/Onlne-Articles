const path = require('path');
const User = require('../models/Users');
const bcrypt = require('bcrypt');



// *****************************************************************************************************
//                                  SEND LOGIN PAGE TO USER
// *****************************************************************************************************
exports.loginPage = (req, res, next) => {
    res.render('./pages/login', {
        error: null
    })
}


// *****************************************************************************************************
//                                  USER LOGIN CHECK
// *****************************************************************************************************
exports.userLogin = (req, res, next) => {
    // check if fileds are empty
    if (!req.body.userName || !req.body.password) {
        return res.send({
            error: "Empty Fields"
        })
    }
    // find the user for login, by user name
    User.findOne({
        "userName": req.body.userName
    }, (err, user) => {
        if (err) return res.send({
            error: "Server Error"
        })
        if (!user) {
            // if  user not found return login page and not found msg
            return res.send({
                error: "User Not Found"
            })
        }

        // if user found check for password, compare password sent for login and stored in db
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) return res.send({
                error: "Server Error"
            })

            // if password in not match return login page and err msg
            if (!isMatch) {
                // return res.send('User Not Found')
                return res.send({
                    error: "User Not Found"
                })
            }
            // if password match set user info to the session
            req.session.user = user
            // redrect user to dashbaord
            res.send({
                msg: "Login Successful"
            })
        })
    })
}


// *****************************************************************************************************
//                                  RESET PASSWORD REQUEST
// *****************************************************************************************************
exports.resetPasswordRequest = (req, res, next) => {
    console.log(req.body)
    User.findOne({
        userName: req.body.userName
    }, (err, user) => {
        if (err) return res.status(500).send({
            error: "Server Error"
        });
        if (!user) return res.status(404).send({
            error: "User Not Found 1"
        });
        if (user.firstName == req.body.firstName && user.lastName == req.body.lastName) {
            User.updateOne({
                _id: user._id
            }, {
                $set: {
                    resetPassRequest: true
                }
            }, {
                new: true
            }, (err, user2) => {
                if (err) return res.send({
                    error: "Server Error"
                })

                return res.send({
                    msg: "Password Reset Successful, you can use your registered phone number to login"
                })
            })
        } else {
            res.send({
                error: "User Not Found 2"
            })
        }

    })
}