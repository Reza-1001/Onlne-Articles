const path = require('path');
const User = require('../models/Users');
const Article = require('../models/Article');



// *****************************************************************************************************
//                                  SEND DASHBOARD
// *****************************************************************************************************
exports.dashboard = (req, res, next) => {
  // check if user is Admin render Admin dashboard
  if (req.session.user.role === "Admin") {
    res.render('pages/admin/dashboard', {
      user: req.session.user
    })
  } else {

    // if user is blogger render blogger dashboard
    let user = req.session.user;
    Article.countDocuments({
      writer: user._id
    }, (err, count) => {
      res.render('pages/blogger/dashboard', {
        user: user,
        articleCount: count
      })
    })

  }
}


// *****************************************************************************************************
//                                  SEND USER PROFILE PAGE IN DASHBOARD
// *****************************************************************************************************
exports.getProfileInfoPage = (req, res, next) => {
  res.render('pages/profile_info', {
    user: req.session.user
  });
}


// *****************************************************************************************************
//                                  SEND USER INFO PAGE IN DASHBOARD
// *****************************************************************************************************
exports.usersInfoPage = (req, res, next) => {
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

// *****************************************************************************************************
//                                  LOGOUT USER FROM ACCOUNT
// *****************************************************************************************************
exports.logOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/login');
  });
}