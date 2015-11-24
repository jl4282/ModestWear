require('../db');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Clothing = mongoose.model('Clothing');

//find by slug
router.get('/getClothes/:slug', function(req, res, next) {
  Clothing.findOne({'slug': req.params.slug}, function(err, clothing){
    res.json(clothing);
  });
});

//get all clothes
router.get('/getClothes', function(req, res, next) {
  Clothing.find({}, function(err, clothes, count){
    if (!err){
      res.json(clothes);
    }
  });
});

//get by searching description
router.get('/getClothes/search/:query', function(req, res, next){
  console.log(req.params.query);
  Clothing.find({description: new RegExp(decodeURIComponent(req.params.query), 'i')}, function(err, clothes, count){
    res.json(clothes);
  });
});

module.exports = router;
