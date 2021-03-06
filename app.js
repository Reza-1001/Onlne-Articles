const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const cors = require('cors');
const app = express();

// app.use('/favicon.ico', express.static('publicfavicon.ico'));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
mongoose.connect(
  'mongodb://localhost:27017/AnyArticle', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
)
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  key: 'user_sid',
  secret: 'mysecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 6000000
  }
}));

const accessLog = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
});
app.use(logger('dev', {stream: accessLog}));
app.use('/', apiRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
  // res.render('error')
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;