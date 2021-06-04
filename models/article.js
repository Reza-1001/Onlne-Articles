const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const essentialSchema = {
  type: String,
  require: true,
  trim: true,
};
const articleShcema = new mongoose.Schema({
  title: {
    ...essentialSchema,
    validate(value) {
      if (value.length < 5) {
        throw new Error("article title must be at least 5 characters long");
      }
    },
  },
  content: {
    ...essentialSchema,
    validate(value) {
      if (value.length < 200) {
        throw new Error("article content must be at least 200 characters long");
      }
    },
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: new Date()
  },
  writer: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Users'
  },
  views: {
    type: Number,
    trim: true
  }
})
const Article = mongoose.model("Article", articleShcema);

module.exports = Article;