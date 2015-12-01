var express = require('express');
var router = express.Router();
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var util = require('util');
var FACEBOOK_APP_ID = "1666068127010516";
var FACEBOOK_APP_SECRET = "c92430f3b1228e0d7e8fc548a2b14692";


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
