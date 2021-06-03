const path = require('path');
const Blogger= require('../models/users');
const bcrypt = require('bcrypt');


const dashboard = (req, res, next) => {
  
    res.render('pages/dashboard', {
        user: req.session.user
      })
}

const logOut=(req,res,next) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/api/login');
  });
}
const deleteUser =(req,res,next)=>{
  Blogger.findByIdAndDelete(req.session.user._id, function (err, obj) {
      if (err) throw err;
      if (req.session.user.role != "admin"){
        console.log("1 document deleted" + obj);
        req.session.destroy((err) => {
          if (err) {
            return console.log(err);
          }
          res.redirect('/api/login');
        });
      }
    });
}


module.exports={dashboard, logOut, deleteUser}; 