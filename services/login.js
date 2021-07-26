const path = require('path');
const Blogger = require('../models/Users');
const bcrypt = require('bcrypt');


const loginPage = (req, res, next) => {
    res.render('./pages/login', {
        error: null
    })
}


const bloggerLogin = (req, res, next) => {
    console.log(req.body)
    if (!req.body.userName || !req.body.password) {
        return res.render('pages/login', {
            error: "Empty Fields"
        })
    }
    Blogger.findOne({
        "userName": req.body.userName
    }, (err, user) => {
        console.log(user)
        if (err) return res.render('pages/login', {
            error: "Server Error"
        })
        if (!user) {
            return res.send('User Not Found')
            // return res.render('pages/login', {
            //     error: "User Not Found"
            // })
        }
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) return res.render('pages/login', {
                error: "Server Error"
            })
            if (!isMatch) {
                return res.send('User Not Found')
                // return res.render('pages/login', {
                //     error: "User Not Found"
                // })
            }
            req.session.user = user
            res.redirect('/api/dashboard');
        })
    })
}

module.exports = {
    loginPage,
    bloggerLogin
};