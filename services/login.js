const path = require('path');
const Blogger = require('../models/Users');
const bcrypt = require('bcrypt');


const loginPage = (req, res, next) => {
    res.render('./pages/login', {
        error: null
    })
}

const userLogin = (req, res, next) => {
    // check if fileds are empty
    if (!req.body.userName || !req.body.password) {
        return res.render('pages/login', {
            error: "Empty Fields"
        })
    }
    // find the user for login, by user name
    Blogger.findOne({
        "userName": req.body.userName
    }, (err, user) => {
        if (err) return res.render('pages/login', {
            error: "Server Error"
        })
        if (!user) {
            // if  user not found return login page and not found msg
            return res.render('pages/login', {
                error: "User Not Found"
            })
        }

        // if user found check for password, compare password sent for login and stored in db
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) return res.render('pages/login', {
                error: "Server Error"
            })

            // if password in not match return login page and err msg
            if (!isMatch) {
                // return res.send('User Not Found')
                return res.render('pages/login', {
                    error: "User Not Found"
                })
            }
            // if password match set user info to the session
            req.session.user = user
            // redrect user to dashbaord
            res.redirect('/dashboard');
        })
    })
}

module.exports = {
    loginPage,
    userLogin
};