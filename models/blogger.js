const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const essentialSchema = {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  };
  const bloggerShcema=new mongoose.Schema({
      firstName:{
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
      userName:{
          ...essentialSchema,
          unique:true,
          validate(value){
            if (value.length < 3) {
              throw new Error("Username must be at least 3 characters long");
            }
          }
      },
      password:{
        type:String,  
        required:true,

      },
      gender:{
          type:String,
          enum: ['Male', 'Female']
      },
      profileImage:{
          type:String
      },
      phoneNumber:{
          type:String,
          trim:true
      }
  })
  const Blogger = mongoose.model("Blogger", bloggerShcema);

  module.exports = Blogger;