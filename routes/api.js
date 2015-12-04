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

router.get('/clothesById/:id', function(req, res, next) {
  Clothing.findOne({_id: req.params.id}, function(err, clothes, count){
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
  var limit = 1000; //purely because I don't have time to do pagination
  var query = {};
  console.log('in search');
  console.log(req.query);
  if (req.query && req.query.limit){
    limit = req.query.limit;
  }
  if (req.query && req.query.description){
    query.description = new RegExp(decodeURIComponent(req.query.description), 'i');
  }
  if (req.query && req.query.type){
    query.type = req.query.type;
  }
  Clothing.find(query).limit(limit).exec(function(err, clothes, count){
    if (!err){
      res.json(clothes);
    }
    else {
      res.sendStatus(500);
    }
  });
});

router.post('/favorite/:id', function(req, res, next){

  //make sure not already in it...?
  var query = {_id: req.user._id};
  if (req.user && req.user.provider){
    query = {facebookId: req.user.id};
  }
  if (req.user){
    User.findOneAndUpdate(
      query,
      {$push: {favorites: req.params.id}},
      {safe: true, upsert: true},
      function(err, user, count){
        res.sendStatus(200);
    });
    //find one and update with the added favorite
    //findOneAndUpdate([query], [doc], [options], [callback])
  }
});

router.delete('/favorite/:id', function(req, res, next){
  //get user and add
  var query = {_id: req.user._id};
  if (req.user && req.user.provider){
    query = {facebookId: req.user.id};
  }
  if (req.user){
    User.update(query, {$pull: {favorites: req.params.id}}, function(err, user){
      console.log(err, user);
      if (!err){
        res.sendStatus(200);
      }
      else {
        res.sendStatus(500);
      }
    });
  }
});


router.get('/favorites', function(req, res, next){
  console.log('favorites', req.user);
  var query = {_id: req.user._id};
  if (req.user && req.user.provider){
    query = {facebookId: req.user.id};
  }
  if (req.user){
    User.findOne(query).populate('favorites').exec(function(err, user){
      if (!err){
        if (user.favorites){
          res.json(user.favorites);
        }
        else {
          res.json({});
        }
      }
      else {
        res.sendStatus(400);
      }
    });
  }
});

router.get('/getUser', function(req, res, next){
  console.log('get user: ', req.user);
  var query = {_id: req.user._id};
  if (req.user && req.user.provider){
    query = {facebookId: req.user.id};
  }
  if (req.user){
    User.findOne(query).populate('styles').exec(function(err, user, count){
      if (!err){
        req.user = user;
        res.json(user);
      }
    });
  }
  else {
    res.json();
  }
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

router.get('/styles', function(req, res, next){
  //return style with all the clothing and outfits
  if (req.user){
    console.log('in styles');
    var query = {_id: req.user._id};
    if (req.user && req.user.provider){
      query = {facebookId: req.user.id};
    }
    User.findOne(query).populate('styles').exec(function(err, user){
      console.log(err, user);
      if (!err){
        if (user.styles){
          console.log(user.styles);
          res.json(user.styles);
        }
        else {
          res.status(404);
        }
      }
      else {
        res.sendStatus(500);
      }
    });
  }
  else {
    res.status(403);
  }

});

router.post('/style/create', function(req, res, next){

  if (req.user){
    // && req.user._id === req.body.id

    var query = {_id: req.user._id};
    if (req.user.provider){
      query = {facebookId: req.user.id};
    }
    User.findOne(query, function(err, user){
      console.log(err,req.body.id, user._id, req.body.id === user._id);
      if (!err && user._id == (req.body.id + '')){
        var item = {
          name: req.body.name,
          owner: req.body.id,
          clothes: req.body.clothes || []
        };
        new Style(item).save(function(err, style, count){
          console.log('saved style', style);
          if (!err){
            //update user with style id
            User.update({_id: item.owner}, {$push: {styles: style._id}}, function(err, user, count){
              console.log('saved user', err, user);
              if (!err){
                res.status(200).json(style);
              }
              else {
                res.sendStatus(500);
              }
            });
          }
          else{
            console.log('error: ', err);
            res.sendStatus(500);
          }
        });
      }
      else{
        res.sendStatus(403);
      }
    });
  }
  else{
    console.log('didnt work');
    res.sendStatus(404);
  }
});

router.post('/style/add', function(req, res, next){
  //add clothing to style
  // console.log('that matchup... ', req.user, req.body.styleId);
  //

  console.log('IN ADD',req.user, req.body.styleId);
  if (req.user){
    var query = {_id: req.user._id};
    if (req.user.provider){
      query = {facebookId: req.user.id};
    }
    User.findOne(query, function(err, user){
      if (user.styles.indexOf(req.body.styleId) > -1){
        Style.findOneAndUpdate(
          {_id: req.body.styleId},
          {$push: {clothes: req.body.clothingId}},
          {safe: true, upsert: true},
          function(err, style, count){
            console.log('saving.... ',err, style);
            if (!err){
              res.sendStatus(200);
            }
            else {
              res.sendStatus(500);
            }
        });
      }
      else {
        res.sendStatus(403);
      }
    });
  }
  else{
    res.sendStatus(403);
  }
});

router.delete('/style/delete/:sid/:cid', function(req, res, next){
  // delete entire style

});

router.delete('/style/remove/:styleId/:clothingId', function(req, res, next){
  // remove clothing from style

  if (req.user && (req.user.styles.indexOf(req.params.styleId) > -1)){
    Style.update({_id: req.params.styleId}, {$pull: {clothes: req.params.clothingId}}, function(err, user){
      console.log(err, user);
      if (!err){
        res.sendStatus(200);
      }
      else {
        res.sendStatus(500);
      }
    });
  }
  else {
    res.sendStatus(403);
  }
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
