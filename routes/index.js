var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('./public/views/index.html');
});

//Routes NEEDS TO BE MOVED TO ANGULAR!
router.get('/search/:query', function(req, res, next) {
  //get query
  //run db query
  //perform personalization
  //populate results
  res.render('searchResults', { results: results });
});

router.get('/outfit/:slug', function(req, res, next) {
  //get query
  //run db query
  //  get all elements in outfit, and the style it belongs to
  //  get all favorites for the user
  //  get personalized recommendations
  //populate results
  res.render('outfit', {  });
});

router.get('/style/:slug', function(req, res, next) {
  //get query
  //run db query
  //  get all elements in style
  //  get all favorites for the user
  //  get personalized recommendations
  //populate results
  res.render('style', {  });
});

router.get('/profile/:slug', function(req, res, next) {
  //get query
  //run db query
  //  get all outfits
  //  get styles
  //  get all favorites for the user
  //  get personalized recommendations
  //populate results
  res.render('profile', {  });
});

router.get('/favorites', function(req, res, next) {
  //run get all favorites for user
  //  get all outfits favorited
  //  get styles favorited
  //  get all articles of clothing favorited
  //populate results
  res.render('favorites', {  });
});

module.exports = router;
