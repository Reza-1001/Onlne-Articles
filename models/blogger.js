const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const essentialSchema = {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
  };
  const bloggerShcema=new mongoose.Schema({
      firstnme:{
          ...essentialSchema,
          validate(value) {
            if (value.length < 3) {
              throw new Error("First name must be at least 3 characters long");
            }
          },
      },
      lastName:{
          ...essentialSchema,
          validate(value) {
            if (value.length < 3) {
              throw new Error("last name must be at least 3 characters long");
            }
          },
      },
      username:{
          ...essentialSchema,
          unique:true,
          validate(value){
              throw new Error("Username must be at least 3 characters long");
          }
      },
      password:{
        type:String,  
        required:true,

      },
      gender:{
          ...essentialSchema,
          enum: ['Male', 'Female']
      },
      profileImage:{
          type:String
      },
      phoneNumber:{
          required:true,
          type:String,
          trim:true
      }
  })
  const Blogger = mongoose.model("Blogger", bloggerShcema);

  module.exports = Blogger;