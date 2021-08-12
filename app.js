const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const cors = require('cors');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
mongoose.connect(
  'mongodb://localhost:27017/AnyArticle', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
app.use(logger('dev'));
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
    
app.use('/api', apiRouter);

app.use('/', (req, res ,next) => {
  res.sendFile(path.join(__dirname,'public/pages/home.html'));
})
     
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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