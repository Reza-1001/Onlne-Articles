const url = require('url');
const generalTools = {};
const User = require('../models/users');
const bcrypt = require('bcrypt');


generalTools.SessionCheck = function (req, res, next) {
  if (req.cookies.user_sid && req.session.user) {
    return res.redirect('/api/dashboard')
  };
  return next()
};

generalTools.LoginCheck = function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/api/login");
  };
  return next()
};

generalTools.DeleteBloggerCheck = function (req, res, next) {
  // console.log(req.body.userName)
  // console.log(req.session.user)
  User.findOne({
    'userName': req.body.userName
  }, (err, user) => {
    if (err) return res.send("Server Error")
    if (req.session.user.role == "admin" && user.role != "admin") {
      return next();
    } else if (req.session.user.role != "admin" && user.userName == req.session.user.userName) {
      return next();
    } else {
      return res.send('User can not be Deleted')
    }

  })
}

generalTools.PasswordCheck = function (req, res, next) {
  bcrypt.compare(req.body.curr_password, req.session.user.password, function (err, passCompResult) {
    if (!passCompResult) {
      return res.json(false)
    } else {
      return next();
    }

  })
}

generalTools.IsAdmin=function(req,res,next){
  if (req.session.user.role=='admin'){
    return next();
  }
  return res.send("Access Denied");
}

module.exports = generalTools;