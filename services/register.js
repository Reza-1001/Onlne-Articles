const path = require('path');
const url = require('url');

const Blogger = require('./../models/blogger');
const Article = require('./../models/article');
const generalTools = require('./../tools/general-tools.js');

// ********************************************************************************

// ********************************************************************************
const createBlogger = (req, res) => {
    console.log(req.body)
    if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.password || !req.body.gender || req.body.phonNumber) {
        return res.redirect(url.format({
            pathname: '/api/register',
            query: {
                "msg": "Empty Fields"
            }
        }));
    }
    Blogger.findOne({
        userName: req.body.userName
    }, (err, user) => {
        if (err) {
            res.status(302);
            return res.redirect(url.format({
                pathname: '/api/register',
                query: {
                    "msg": "Server Error"
                }
            }))
        }
        if (user) {
            return res.redirect(url.format({
                pathname: "/api/register",
                query: {
                    "msg": "Username Already Exists"
                }
            }))
        }
        const NEW_BLOGGER = new Blogger({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
            gender: req.body.gender,
            profileImage: "",
            phoneNumber: req.body.phoneNumber
        })

        NEW_BLOGGER.save(err => {
            // return res.redirect('/api/auth/loginPage');
            res.send("OK")
        });
    })
}
const registerPage = (req, res, next) => {
    return res.render('./pages/register', {
        error: null
    });
}



module.exports = {
    registerPage,
    createBlogger
};