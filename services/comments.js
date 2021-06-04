const path = require('path');
const Blogger = require('../models/users');
const Comment = require('../models/Comment');

const addComment = (req, res, next) => {
    if (!req.body.content || !req.body.writer || req.body.article)
        return res.send("Empty Fields")
    const NEW_COMMENT = new Comment({
        content: req.body.content,
        writer_id: req.body.writer_id,
        article_id: req.body.article_id
    })

    NEW_COMMENT.save(err => {
        res.send("comment added")
    })
}

const deleteComment = (req, res, next) => {
    Comment.findOne({
        _id: req.body.id
    }, (err, comment) => {
        if (err) return res.send("Server Error")
        if (!comment) return res.send("Comment Not Found")
        if (req.session.user.role != 'admin' && req.session.user._id != comment.writer_id) {
            return res.send("Comment Delete Failed")
        }
        Comment.deleteOneById({
            _id: req.body._id
        }, function (err, deletedComment) {
            if (err) throw err;

            console.log("1 document deleted");

            res.send("Comment Deleted")
        });

    })
}

const getAllComments = (req, res, next) => {
    Comment.find({article_id: req.params.article_id},{content:1,writer_id:1,createdAt:1,article_id:1},(err,comments)=>{
        if (err) return res.send("Server Error");
        if (!comments) return res.send([])
        return res.send(comments);
    })
}


module.exports = {
    addComment,
    deleteComment,
    getAllComments
};