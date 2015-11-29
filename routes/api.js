require('../db');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Clothing = mongoose.model('Clothing');
var Outfit = mongoose.model('Outfit');
var Style = mongoose.model('Style');
var User = mongoose.model('User');

//find by slug
router.get('/clothes/:slug', function(req, res, next) {
  Clothing.findOne({'slug': req.params.slug}, function(err, clothes, count){
    console.log(count, clothes);
    res.json(clothes);
  });
});

//get all clothes
router.get('/clothes', function(req, res, next) {
  Clothing.find({}, function(err, clothes, count){
    if (!err){
      res.json(clothes);
    }
  });
});

//get by searching description
router.get(/\/search.*/, function(req, res, next){
  console.log('in search');
  console.log(req.query);
  var query = {};
  if (req.query && req.query.description){
    query.description = new RegExp(decodeURIComponent(req.query.description), 'i');
  }
  if (req.query && req.query.type){
    query.type = req.query.type;
  }
  Clothing.find(query, function(err, clothes, count){
    res.json(clothes);
    console.log(count);
  });
});

router.get('/outfit/:id', function(req, res, next){
  //return outfit with all the clothing
});

router.post('/outfit/:id', function(req, res, next){
  //update the outfit
});

router.get('/style/:id', function(req, res, next){
  //return style with all the clothing and outfits
});

router.post('/style/:id', function(req, res, next){
  //update the style
});

router.post('/style/follow/:user', function(req, res, next){
  //save the front end user object with the new Style in the followed category
});

router.get('/user/:slug', function(req, res, next){
  //get user
});

router.post('/user/follow/:user', function(req, res, next){
  //save the front end user object with the new User in the followed category
});



module.exports = router;
