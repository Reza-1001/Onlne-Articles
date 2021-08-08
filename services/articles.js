const path = require('path');
const Blogger = require('../models/Users');
const Comment = require('../models/Comment');
const Article = require('../models/Article');

const {deleteAllComments} = require('./comments'); 
 
const addNewArticle = (req, res, next) => {
    // new Article({
    //     title:req.body.title,
    //     content: request.body.content,
        
    // })
}
const getArticle = (req, res, next) => {

}

const deleteArticle = (req, res, next) => {

}


const getAllArticles = (req, res, next) => {
  
}


module.exports = {
    addNewArticle,
    deleteArticle,
    getArticle,
    getAllArticles
}; 