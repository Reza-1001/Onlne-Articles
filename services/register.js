const path = require('path');
const url = require('url');
const Blogger = require('../models/Users');
const Article = require('../models/Article');
const generalTools = require('./../tools/general-tools.js');



// *****************************************************************************************************
//                                  CREATE NEW BLOGGER
// *****************************************************************************************************
exports.createBlogger = (req, res, next) => {
    // check if fileds are empty
    if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.password || req.body.phonNumber) {
        // if filed or fields are empty render register page with err
        return res.send({
            error: "Empty Fields"

        });
    } 

    // if fileds are not empty
    // check if new user's username already exists
    Blogger.findOne({
        userName: req.body.userName
    }, (err, user) => {
        if (err) {
            res.status(302);
            return res.send({
                error: "Server Error"
            });
        }
        // if username already exist render register page
        if (user) {
            return res.send({
                error: "Username Already Exists"

            });
        }

        // if username does not exist then create new blogger

        const NEW_BLOGGER = new Blogger({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
            profileImage: 'default-avatar.jpg',
            phoneNumber: req.body.phoneNumber
        })
        NEW_BLOGGER.save(err => {
            // if registeration is successful redirect user to login page
            return res.send({
                msg: "Registration Successful"

            });

        });
    })
}


// *****************************************************************************************************
//                                  SEND REGISTER PAGE TO USER
// *****************************************************************************************************
exports.registerPage = (req, res, next) => {
    return res.render('./pages/register', {
        error: null
    });
}


// *****************************************************************************************************
//                                  CREATE ADMIN
// *****************************************************************************************************
exports.createAdmin = (req, res, next) => {

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