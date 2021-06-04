const mongoose = require('mongoose');


const essentialSchema = {
  type: String,
  require: true,
  trim: true,
};
const commentShcema = new mongoose.Schema({
  content: {
    ...essentialSchema,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  writer:{
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Users'
  },
  article: {
    type: mongoogse.Schema.ObjectId,
    required: true,
    ref: 'Article'
  }
})
const Comment = mongoose.model("Comment", commentShcema);

module.exports = Comment;