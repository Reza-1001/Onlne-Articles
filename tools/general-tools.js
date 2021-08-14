const url = require('url');
const path = require('path');
const generalTools = {};
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');


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
    if (req.session.user.role == "Admin" && user.role != "Admin") {
      return next();
    } else if (req.session.user.role != "Admin" && user.userName == req.session.user.userName) {
      return next();
    } else {
      return res.send('User can not be Deleted')
    }

  })
}

generalTools.PasswordCheck = function (req, res, next) {
  bcrypt.compare(req.body.oldPass, req.session.user.password, function (err, passCompResult) {
    if (!passCompResult) {
      return res.json(false)
    } else {
      return next();
    }

  })
}

generalTools.IsAdmin = function (req, res, next) {
  if (req.session.user.role == 'Admin') {
    return next();
  }
  return res.send("Access Denied");
}


const avatarStorage = multer.diskStorage({

  destination: function (req, file, cb) {
    if (file.fieldname == 'avatar')
      cb(null, path.join(__dirname, '../public/images/avatar'))
    if (file.fieldname == 'article')
      cb(null, path.join(__dirname, '../public/images/article'))
  },
  filename: function (req, file, cb) {
    if (file.fieldname == 'avatar')
      cb(null, `${req.session.user.userName}-${Date.now()}-${file.originalname}`)
    if (file.fieldname == 'article')
      cb(null, `${req.body.title}-${Date.now()}-${file.originalname}`)
  }
})

generalTools.UploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/bmp' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
      cb(new Error('invalid file type'), false)
    } else {
      cb(null, true)
    }
  }
})


generalTools.DefaultAvatar = function (req, res, next) {

  if (req.body.profileImage == '') {
    let filename = `${req.body.userName}-${Date.now()}-default-user-pic.jpg`
    req.body.profileImage = filename

    // fs.unlinkSync(path.join(__dirname,`../public/images/avatar//^${req.body.userName}/`));
    fs.copyFile(path.join(__dirname, '../public/assets/images/default-user-pic.jpg'), path.join(__dirname, `../public/images/avatar/${filename}`), (err) => {
      if (err) throw err;
    });
  }
  next();
}

module.exports = generalTools;