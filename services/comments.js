const path = require('path');
const Blogger = require('../models/Users');
const Comment = require('../models/Comment');

const addComment = (req, res, next) => {
    console.log(req.body)
    if (!req.body.content || !req.body.writer_id || !req.body.article_id) {
        console.log("is here");
        return res.send("Empty Fields")
    }
    const NEW_COMMENT = new Comment({
        content: req.body.content,
        writer_id: req.body.writer_id,
        article_id: req.body.article_id
    })

    NEW_COMMENT.save(err => {
        console.log(err)
        res.send("comment added")
    })
}

const deleteComment = (req, res, next) => {
    console.log("+++++++" + req.params.comment_id)
    if (req.session.user.role != 'Admin') {
        return res.send("Comment Delete Failed")
    }
    Comment.findByIdAndDelete({
        _id: req.params.comment_id
    }, function (err, deletedComment) {
        if (err) throw err;
        console.log(deletedComment)
        console.log("1 document deleted");
        res.send("Comment Deleted");

    });


}

const deleteAllComments = (articleId) => {
    // Comment.find({
    //     _id: req.params.comment_id
    // }, function (err, deletedComments) {
    //     if (err) throw err;

    //     res.send(`All Comments of ${articleId} Deleted Successfully`);
    // })
}


const getAllComments = (req, res, next) => {
    Comment.find({
        article_id: req.params.article_id
    }).populate('writer_id', {
        _id: 1,
        firstName: 1,
        lastName: 1,
        profileImage: 1
    }).populate('article_id', {
        _id: 1,
        title: 1,
        createdAt: 1,
    }).exec((err, comments) => {
        if (err) return res.send("Server Error");
        if (!comments) return res.send([])
        let userRole;
        if (req.session.user)
            userRole = req.session.user.role
        else
            userRole = "visitor"

        // if (req.session.user.role=="Admin"){
        //     userRole="Admin"
        // }else if(!req.seesion.user){
        //     userRole="user"
        // }
        return res.send({
            comments,
            userRole
        });
    })
}


module.exports = {
    addComment,
    deleteComment,
    deleteAllComments,
    getAllComments
};