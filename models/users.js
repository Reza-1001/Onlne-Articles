const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const essentialSchema = {
  type: String,
  required: true,
  trim: true,
};
const bloggerShcema = new mongoose.Schema({
  firstName: {
    ...essentialSchema,
    validate(value) {
      if (value.length < 3) {
        throw new Error("First name must be at least 3 characters long");
      }
    },
  },
  lastName: {
    ...essentialSchema,
    validate(value) {
      if (value.length < 3) {
        throw new Error("last name must be at least 3 characters long");
      }
    },
  },
  userName: {
    ...essentialSchema,
    unique: true,
    lowercase: true,
    validate(value) {
      if (value.length < 3) {
        throw new Error("Username must be at least 3 characters long");
      }
    }
  },
  password: {
    type: String,
    required: true,

  },
  createAt: {
    type: Date,
    default: new Date(),
  },
  lastUpdate: {
    type: Date,
    default: new Date(),
  },
  role: {
    ...essentialSchema,
    enum: ['Admin', 'Blogger'],
    default: 'Blogger'
  },
  profileImage: {
    type: String
  },
  aboutMe: {
    type: String,
    default: ""
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  resetPassRequest: {
    type: Boolean,
    default: false
  }
})
bloggerShcema.pre('save', function (next) {
  const user = this;
  if (user.isNew || user.isModified('password')) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        return next();
      })
    })
  } else return next();
})

bloggerShcema.pre('updateOne', function (next) {
  console.log(11)
  const password = this._update.$set.newPass;

  console.log("pre--" + password)
  if (!password)
    return next();
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  this._update.$set.password = hash;
  return next();
})


const Users = mongoose.model("Users", bloggerShcema);

module.exports = Users;