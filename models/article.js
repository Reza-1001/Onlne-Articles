const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const domPurifier = require('dompurify');
const {
  JSDOM
} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

const {
  stripHtml
} = require("string-strip-html");


const essentialSchema = {
  type: String,
  required: true,
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
      // if (value.length < 200) {
      //   throw new Error("article content must be at least 200 characters long");
      // }
    },
  },
  snippet: {
    type: String,
    trim: true,
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
  },
  category: {
    type: String,
    trim: true
  }
})

// articleShcema.pre('validate', function (next) {

 
//   let description = this.snippet;
//   console.log(333333333)
//   console.log(description)
//   //check if there is a description
//     description = htmlPurify.sanitize(description);
//     console.log(444444444)
//     console.log(description)
//     this.snippet = stripHtml(description.substring(0, 200)).result;
//     console.log(555555555)
//   console.log(this.snippet)
//   next();
// });

const Article = mongoose.model("Article", articleShcema);

module.exports = Article;