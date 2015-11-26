require('./db');
// require('./auth');
var express = require('express');
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var util = require('util');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var methodOverride = require('method-override');

var routes = require('./routes/index');
var fb = require('./routes/fb');
var api = require('./routes/api');

var FACEBOOK_APP_ID = "1666068127010516";
var FACEBOOK_APP_SECRET = "c92430f3b1228e0d7e8fc548a2b14692";

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var sessionOptions = {
  secret: 'secret for signing session id',
  saveUninitialized: false,
  resave: false
};
app.use(session(sessionOptions));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('anonymous function');
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook',
  passport.authenticate('facebook', { authType: 'rerequest', scope: ['user_status', 'public_profile', 'email', 'user_about_me'] }));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // console.log('========req', req.user);
    req.session.user = req.user;
    console.log('======', req.session.user);
    //get the user idea and search mongo for corresponding user, if not create new user
    res.redirect('/');
  });
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// app.use('/auth', fb);
app.use('/api', api);
app.use('*', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

//wipe out sessions after if storing user id in session ...
//authenticated api. how does front end know that backend is authenticated?
//
//has session so every request has a req.user and req.session
//check for 403 and redirect to login

