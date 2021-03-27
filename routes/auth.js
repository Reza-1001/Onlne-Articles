const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');
const bcrypt = require('bcrypt');
const Blogger = require('./../models/blogger');
const Article = require('./../models/article');
const generalTools = require('./../tools/general-tools.js');

router.get('/registerPage', (req, res) => {
    res.render("register");
  
}) 
router.post('/register', (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.password) {
        return res.redirect(url.format({
            pathname: '/api/auth/registerPage',
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
                pathname: '/api/auth/registerPage',
                query: {
                    "msg": "Server Error"
                }
            }))
        }
        if (user) {
            return res.redirect(url.format({
                pathname: "/api/auth/registerPage",
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

        NEW_BLOGGER.save(err=>{
            // return res.redirect('/api/auth/loginPage');
            res.send("OK")
        });
    })
})


module.exports = router;