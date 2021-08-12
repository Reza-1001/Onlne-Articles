const path = require('path');
const Blogger = require('../models/Users');
const bcrypt = require('bcrypt');



const dashboard = (req, res, next) => {
  if (req.session.user.role === "admin") {
    res.render('pages/admin/dashboard', {
      user: req.session.user
    })
  } else {
    res.render('pages/blogger/dashboard', {
      user: req.session.user
    })
  }
}

const getProfileInfoPage=(req,res,next) => {
  res.render('pages/profile_info',{user:req.session.user});
}


const logOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/api/login');
  });
}
const deleteUser = (req, res, next) => {
  Blogger.deleteOne({
    userName: req.body.userName
  }, function (err, obj) {
    if (err) throw err;

    console.log("1 document deleted" + obj.userName);

    res.send("User Deleted")
  });
}


module.exports = {
  dashboard,
  logOut,
  deleteUser,
  getProfileInfoPage
};