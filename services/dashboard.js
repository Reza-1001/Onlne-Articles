const path = require('path');
const User = require('../models/Users');


const dashboard = (req, res, next) => {
  // check if user is Admin render Admin dashboard
  if (req.session.user.role === "Admin") {
    res.render('pages/admin/dashboard', {
      user: req.session.user
    })
  } else {
    // if user is blogger render blogger dashboard
    res.render('pages/blogger/dashboard', {
      user: req.session.user
    })
  }
}

// render user profile page
const getProfileInfoPage = (req, res, next) => {
  res.render('pages/profile_info', {
    user: req.session.user
  });
}

// render user management page for Admin
const usersInfoPage = (req, res, next) => {
  // check if user requesting for All user lst is admin
  if (req.session.user.role === "Admin") {
    res.render('pages/admin/user_management', {
      user: req.session.user
    });

    // if user is not admin do not return users list
  } else {
    res.send("Access Denied")
  }

}

// log out user
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