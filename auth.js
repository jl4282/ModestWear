var mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');
var FacebookStrategy  = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// NOTE: specify how we save and retrieve the user object
// from the session; rely on passport-local-mongoose's
// functions that are added to the user model
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
