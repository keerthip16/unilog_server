var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postLogRouter =require('./routes/post-log');
var systemStatsRouter =require('./routes/save-system-stats');
var processStatsRouter =require('./routes/save-process-stats');
var logFileStashRouter =require('./routes/save-file-logs');


var app = express();
var cors = require('cors')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Enable CORS for ALL Requests
app.use(cors());

//Default set of routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

//User defined routes for our logic
app.use("/unilog/postLog", postLogRouter);
app.use("/save/stats/system", systemStatsRouter);
app.use("/save/stats/process", processStatsRouter);
app.use("/save/log", logFileStashRouter);

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

// app.get('/hello', function (request, response) {
//   console.log("==========VIHAAN");
//   response.end("SUCCESS");
// });

module.exports = app;
