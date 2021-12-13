const path = require('path');
const Blogger = require('../models/Users');
const Comment = require('../models/Comment');



// *****************************************************************************************************
//                                  ADD NEW COMMENT
// *****************************************************************************************************
exports.addComment = (req, res, next) => {
    // check for empty comment filds
    if (!req.body.content || !req.body.writer_id || !req.body.article_id) {
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



// *****************************************************************************************************
//                                  DELETE SINGLE COMMENT
// *****************************************************************************************************
exports.deleteComment = (req, res, next) => {
    // if request for delete comment is not Admin return failed
    if (req.session.user.role != 'Admin') {
        return res.send("Comment Delete Failed")
    }
    Comment.findByIdAndDelete({
        _id: req.params.comment_id
    }, function (err, deletedComment) {
        if (err) throw err;
        console.log("1 document deleted");
        res.send("Comment Deleted");
    });
}
// *****************************************************************************************************
//                                  DELETE COMMENT BY ARTICLE ID
// *****************************************************************************************************
exports.deleteArticleComments = (articleId) => {
    articleId.forEach(id => {
        Comment.deleteMany({
            article_id: id
        }, function (err, deletedComment) {
            if (err) throw err;
        });

    });
}


// *****************************************************************************************************
//                                  DELETE ALL COMMENTS
// *****************************************************************************************************
exports.deleteUserComments = (userId) => {
    Comment.deleteMany({
        writer_id: userId
    }, function (err, deletedComments) {
        if (err) throw err;
    })
}


// *****************************************************************************************************
//                                  GET ALL COMMENTS FOR AN ARTICLE
// *****************************************************************************************************
exports.getAllComments = (req, res, next) => {
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

        // check if the user is Admin | use this for allow delete comment in client side   
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