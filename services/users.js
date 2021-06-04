const path = require('path');
const url = require('url');

const Blogger = require('../models/users');
const Article = require('./../models/article');
const generalTools = require('./../tools/general-tools.js');

const getAllUsers = (req, res, next) => {
    Blogger.find({
        role: 'blogger'
    }, (err, bloggers) => {
        if (err) return res.send("Server Error")
        if (!bloggers) return res.send("No Blogger Found")

        // res.render('pages/dashboard',{users:bloggers})
        return res.send(bloggers);
    })
}

const updateUserPassword = (req, res, next) => {
    Blogger.updateOne({
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

const updateUserInfo = (req, res, next) => {
    Blogger.findByIdAndUpdate(req.session.user._id, req.body, {
        new: true
    }, (err, user) => {
        if (err) return res.status(500).json(false);
        res.json(true);
    })
}


module.exports = {
    getAllUsers,
    updateUserPassword,
    updateUserInfo
};