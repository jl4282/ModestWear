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
var filter = require('content-filter');
var session = require('express-session');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var methodOverride = require('method-override');

var routes = require('./routes/index');
var fb = require('./routes/fb');
var api = require('./routes/api');

var secrets = require('./secrets');

var FACEBOOK_APP_ID = secrets.facebook.appId;
var FACEBOOK_APP_SECRET = secrets.facebook.secret;

var callbackURL = getCallback();

var app = express();

function getCallback(){
  if (process.env.NODE_ENV === 'PROD'){
    return "http://i6.cims.nyu.edu:12266/auth/facebook/callback";
  }
  return "http://localhost:3000/auth/facebook/callback";
}

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
app.use(filter()); /* prevent NoSQL injections */
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
    callbackURL: callbackURL,
    profileFields: ['id', 'displayName', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    User.findOne({facebookId: profile.id}, function(err, user){
      if (!user){
        new User({
          name: profile.displayName,
          facebookId: profile.id,
          email: profile.emails[0].value
        }).save(function(err, user, count){
          if (!err){
            console.log('created new user');
            return done(err, user);
          }
        });
      }
      else {
        console.log('returned existing user');
        return done (err, user);
      }
    });
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
    User.findOne({facebookId: req.user.id}, function(err, user){
      if (!err){
        req.user = user;
        console.log('==== req.user: ', req.user);
        res.redirect('/');
      }
      else{
        console.log(err);
      }
    });

  });
app.get('/logout', function(req, res){
  req.logout();
  res.sendStatus(200);
});

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

