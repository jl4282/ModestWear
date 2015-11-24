var express = require('express');
var router = express.Router();
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var util = require('util');
var FACEBOOK_APP_ID = "1666068127010516";
var FACEBOOK_APP_SECRET = "c92430f3b1228e0d7e8fc548a2b14692";


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


/* GET users listing. */
router.get('/facebook', function(req, res, next) {
  console.log('in /facebook');
  passport.authenticate('facebook', { authType: 'rerequest', scope: ['user_status', 'public_profile', 'email', 'user_about_me'] });
});

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
  });

module.exports = router;
