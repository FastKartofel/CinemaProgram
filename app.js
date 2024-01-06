var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');


const starting = require('./routes/startPage');
const view = require('./routes/viewRepertuar');
const review = require('./routes/review');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })); // This allows you to access req.body



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'models')));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());


app.use('/', starting);
app.use('/all-films', view);
app.use('/reviews', review);

//connecting with the mongoDB database
mongoose.connect('mongodb://localhost:27017/TIN4', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("Connected successfully to MongoDB");
});

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