const path = require('path');
const User = require('../models/Users');


const dashboard = (req, res, next) => {
  if (req.session.user.role === "Admin") {
    res.render('pages/admin/dashboard', {
      user: req.session.user
    })
  } else {
    res.render('pages/blogger/dashboard', {
      user: req.session.user
    })
  }
}

const getProfileInfoPage = (req, res, next) => {
  res.render('pages/profile_info', {
    user: req.session.user
  });
}
const usersInfoPage = (req, res, next) => {
  res.render('pages/admin/users_info', {
    user: req.session.user
  });
}


const logOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/login');
  });
}


module.exports = {
  dashboard,
  logOut,
  getProfileInfoPage,
  usersInfoPage
};