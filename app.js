var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var spotifyRouter = require('./routes/spotify');
var appRouter = require('./routes/app');
var widgetsRouter = require('./routes/widgets');

var app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/spotify', spotifyRouter);
app.use('/app', appRouter);
app.use('/widgets', widgetsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log("ERROR:");
  console.log(err.status);
  console.log(err.message);
  console.log("END ERROR");
  // render the error page
  res.sendStatus(err.status || 500);
});

module.exports = app;
