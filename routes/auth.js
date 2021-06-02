const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');
const bcrypt = require('bcrypt');
const Blogger = require('./../models/blogger');
const Article = require('./../models/article');
const generalTools = require('./../tools/general-tools.js');

// ********************************************************************************

// ********************************************************************************

router.get('/user',(req,res)=>{
    return res.render('./pages/login',{error:null});
})


module.exports = router;