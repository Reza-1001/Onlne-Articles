const path = require('path');
const url = require('url');
const Blogger = require('../models/Users');
const Article = require('../models/Article');
const generalTools = require('./../tools/general-tools.js');


const createBlogger = (req, res) => {
    // check if fileds are empty
    if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.password || req.body.phonNumber) {
        // if filed or fields are empty render register page with err
        return res.redirect(url.format({
            pathname: '/register',
            query: {
                "msg": "Empty Fields"
            }
        }));
    }

    // if fileds are not empty
    // check if new user's username already exists
    Blogger.findOne({
        userName: req.body.userName
    }, (err, user) => {
        if (err) {
            res.status(302);
            return res.redirect(url.format({
                pathname: '/register',
                query: {
                    "msg": "Server Error"
                }
            }))
        }
        // if username already exist render register page
        if (user) {
            return res.render(url.format({
                pathname: "/register",
                query: {
                    "msg": "Username Already Exists"
                }
            }))
        }

        // if username not exist create new blogger model
        const NEW_BLOGGER = new Blogger({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
            profileImage: req.body.profileImage,
            phoneNumber: req.body.phoneNumber
        })
        NEW_BLOGGER.save(err => {
            // if registeration is successful redirect user to login page
            return res.redirect('/login');

        });
    })
}

const registerPage = (req, res, next) => {
    return res.render('./pages/register', {
        error: null
    });
}
// creating Admin
const createAdmin = (req, res, next) => {

    // check if user with role Admin Already exist | only one admin can be created
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