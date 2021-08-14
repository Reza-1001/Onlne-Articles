const path = require('path');
const url = require('url');
const Blogger = require('../models/Users');
const Article = require('../models/Article');
const generalTools = require('./../tools/general-tools.js');

// ********************************************************************************

// ********************************************************************************
const createBlogger = (req, res) => {
    console.log(req.body)
    if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.password || req.body.phonNumber) {
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
            profileImage: req.body.profileImage,
            phoneNumber: req.body.phoneNumber
        })
        NEW_BLOGGER.save(err => {
            return res.redirect('/api/login');
            // res.send("OK")
        });
    })
}

const registerPage = (req, res, next) => {
    return res.render('./pages/register', {
        error: null
    });
}

const createAdmin = (req, res, next) => {
    Blogger.findOne({
        role: 'Admin'
    }, (err, adminExist) => {
        if (err) return res.send('Error in Create Admin');
        if (adminExist) return res.status(404).send('Not found');
        new Blogger({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
            profileImage: "",
            phoneNumber: req.body.phoneNumber,
            role: "Admin"
        }).save(err => {
            if (err) return res.send(err)
            return res.send('Admin created succesfully')
        })
    })
}

module.exports = {
    registerPage,
    createBlogger,
    createAdmin
};