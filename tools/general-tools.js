const url = require('url');
const generalTools = {};
const User = require('./../models/users');
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


generalTools.PasswordCheck = function (req, res, next) {
  bcrypt.compare(req.body.curr_password, req.session.user.password, function (err, passCompResult) {
    if (!passCompResult) {
      return res.json(false)
    }else{
      return next();
    }
    
  })
}

module.exports = generalTools;