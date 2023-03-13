var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var sessionConfig = require('./config/session.config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/manager/users');
var managerRouter = require('./routes/manager/manager');
var authRouter = require('./routes/auth');
var registrationRouter = require('./routes/manager/registration');
var editItemRouter = require('./routes/manager/edititem');
var kioskRouter = require('./routes/user/kiosk');

var app = express();

app.use(session(sessionConfig));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manager', managerRouter);
app.use('/auth', authRouter);
app.use('/registration', registrationRouter);
app.use('/edititem', editItemRouter);
app.use('/kiosk', kioskRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
