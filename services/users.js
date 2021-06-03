const path = require('path');
const url = require('url');

const Blogger = require('../models/users');
const Article = require('./../models/article');
const generalTools = require('./../tools/general-tools.js');

const getAllUsers=(req,res,next)=>{
    Blogger.find({role:'blogger'},(err,bloggers)=>{
        if (err) return res.send("Server Error")
        if (!bloggers) return res.send("No Blogger Found")
         
        // res.render('pages/dashboard',{users:bloggers})
        return res.send(bloggers);
    })
}
module.exports={getAllUsers};