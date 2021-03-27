const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const essentialSchema = {
    type: String,
    require: true,
    trim: true,
  };
  const articleShcema=new mongoose.Schema({
      title:{
          ...essentialSchema,
          validate(value) {
            if (value.length < 5) {
              throw new Error("article title must be at least 5 characters long");
            }
          },
      },
      content:{
          ...essentialSchema,
      },
      avatar:{
          type:String,
      },
      createdAt:{
        type:Date,  
        default:Date.now,

      },
      views:{
          type:Number,
          trim:true
      }
  })
  const Article = mongoose.model("Article", articleShcema);

  module.exports = Article;