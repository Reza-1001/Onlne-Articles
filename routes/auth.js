const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');
const bcrypt = require('bcrypt');
const Blogger = require('./../models/blogger');
const Article = require('./../models/article');
const generalTools = require('./../tools/general-tools.js');

router.post('/register', (req, res) => {
    console.log(req.body)
    if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.password) {
        return res.redirect(url.format({
            pathname: '/api/auth/register',
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
                pathname: '/api/auth/register',
                query: {
                    "msg": "Server Error"
                }
            }))
        }
        if (user) {
            return res.redirect(url.format({
                pathname: "/api/auth/register",
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
})
router.get('/account-login',(req,res)=>{
    return res.render('./pages/login',{error:null});
})

router.post('/login', (req, res) => {
    console.log(req.body)
    if (!req.body.userName || !req.body.password) {
        return res.render('pages/login',{error:"Empty Fields"})
    }
    Blogger.findOne({
        "userName": req.body.userName
    }, (err, user) => {
        console.log(user)
        if (err) return res.render('pages/login',{error:"Server Error"})
        if (!user) {
            return res.render('pages/login',{error:"User Not Found"})
        }
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) return res.render('pages/login',{error:"Server Error"})
            if (!isMatch) return res.render('pages/login',{error:"User Not Found"})
            req.session.user = user
            // res.redirect('/api/user/dashboard')
            res.send('Enter')
        })

    })
})

module.exports = router;