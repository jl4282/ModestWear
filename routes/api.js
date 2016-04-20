require('../db');

/*
A router object is an isolated instance of middleware and routes. 
You can think of it as a “mini-application,” capable only of performing 
middleware and routing functions. Every Express application has a built-in app router.
*/

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var secrets = require('../secrets');
var mongoose = require('mongoose');
var Clothing = mongoose.model('Clothing');
var Outfit = mongoose.model('Outfit');
var Comment = mongoose.model('Comment');
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

// Get by searching description
router.get(/\/search.*/, function(req, res, next){
  var limit = 1000; //purely because I don't have time to do pagination
  var query = {};
  // console.log(req.query);
  var searchType = 'clothing';
  if (req.query && req.query.limit){
    limit = req.query.limit;
  }
  if (req.query && req.query.searchType){
    searchType = req.query.searchType;
  }
  if (req.query && req.query.description){
    if (searchType === 'clothing'){
      query.description = new RegExp(decodeURIComponent(req.query.description), 'i');  
    }
    else {
      query.name = new RegExp(decodeURIComponent(req.query.description), 'i');
    }
  }
  if (req.query && req.query.type){
    query.type = req.query.type;
  }
  var model = {
    clothing : Clothing,
    styles : Style,
    outfits : Outfit
  };
  // Find outfits
  // if (searchType === 'clothing'){
  model[searchType].find(query).limit(limit).exec(function(err, result, count){
    if (!err){
      console.log(result);
      res.json(result);
    }
    else {
      res.sendStatus(500);
    }
  });
  
});


// We want to also search outfits and styles...
router.get(/\/searchOutfits.*/, function(req, res, next){
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
  console.log("Finding " + query);
  // Find outfits
  
  Outfits.find(query).limit(limit).exec(function(err, outfits, count) {
    console.log(outfits);
    if (!err) {
      res.json(outfits);
    } else {
      res.sendStatus(500);
    }
  });
});

router.get(/\/searchStyles.*/, function(req, res, next){
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
  console.log("Finding " + query);
  // Find outfits
  
  Styles.find(query).limit(limit).exec(function(err, outfits, count) {
    console.log(outfits);
    if (!err) {
      res.json(outfits);
    } else {
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

// Router -> delete favorite
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

// GET method router for favorites
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
  if (req.user){
    var query = {_id: req.user._id};
    if (req.user.provider){
      query = {facebookId: req.user.id};
    }
    User.findOne(query).populate('styles outfits').exec(function(err, user, count){
      if (!err){
        console.log('user in getUser: ', user);
        req.user = user;
        res.json(user);
      }
      else {
        res.sendStatus(404);
      }
    });
  }
  else {
    res.sendStatus(404);
  }
});

// Katie : Route Handler 1
// Outfit GET method
router.get('/outfit/:slug', function(req, res, next){
  //return outfit with all the clothing
  console.log('in getOutfit');
  Outfit.findOne({slug: req.params.slug}).populate('clothes').populate('outfits').populate('comment').exec(function(err, style){
    console.log(err, style);
    if (!err){
      if (style){
        console.log(style);
        res.json(style);
      }
      else {
        res.status(404);
      }
    }
    else {
      console.log('grave error:', err);
      res.sendStatus(500);
    }
  });
});

// Katie : Route Handler 2
router.get('/outfits', function(req, res, next){
  //return outfit with all the clothing and outfits
  console.log("IN OUTFITS IN THE API!!!");
  if (req.user){
    var query = {_id: req.user._id};
    if (req.user && req.user.provider){
      query = {facebookId: req.user.id};
    }
    User.findOne(query).populate('outfits').exec(function(err, user){
      console.log(err, user);
      if (!err){
        if (user.outfits){
          console.log(user.outfits);
          res.json(user.outfits);
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

router.get('/outfit/cover/:slug', function(req, res, next){
  Outfit.findOne({slug: req.params.slug}).populate('clothes').exec(function(err, outfit){
    console.log('OUTFIT IS: ', outfit);
    if (!err){
      //this can probably be trimmed, but not checking for edge cases at the moment
      if (outfit.clothes &&  outfit.clothes[0] && outfit.clothes[0].images && outfit.clothes[0].images[0]){
        console.log(outfit.clothes[0].images[0], outfit.slug);
        res.json({image: outfit.clothes[0].images[0], slug : outfit.slug});
      }
    }
    else res.status(500);
  });
});


// Katie : Route Handler 3
router.post('/outfit/create', function(req, res, next){
  console.log("in the api call!");
  if (req.user){
    if (((req.body.name.search('>') < 0) && (req.body.name.search('<') < 0)) && (req.body.name.trim()) ){ //check for HTML injection
      console.log(req.body.name);
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
          // TODO : THE OUTFIT CREATES
          var newOutfit= new Outfit(item);
          console.log(newOutfit);
          // BUT DOES NOT SAVE -> OUTFIT BECOMES NULL HERE...
          newOutfit.save(function(err, outfit, count){
            // TODO: outfit -> null
            console.log(count);
            console.log('saved outfit', outfit);
            if (!err){
              //update user with style id
              User.update({_id: item.owner}, {$push: {outfits: outfit._id}}, function(err, user, count){
                console.log(user);
                console.log('saved user', err, user);
                if (!err){
                  res.status(200).json(outfit);
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
    } else {
      res.sendStatus(500).json('Improper character');
    }
  }
  else{
    console.log('didnt work -> no req.user');
    res.sendStatus(404);
  }
});

// Katie : Route Handler 4
router.post('/outfit/add', function(req, res, next){
  console.log('IN ADD',req.user, req.body.outfitId);
  if (req.user){
    var query = {_id: req.user._id};
    if (req.user.provider){
      query = {facebookId: req.user.id};
    }
    User.findOne(query, function(err, user){
      if (user.outfits.indexOf(req.body.outfitId) > -1){
        Outfit.findOneAndUpdate(
          {_id: req.body.outfitId},
          {$push: {clothes: req.body.clothingId}},
          {safe: true, upsert: true},
          function(err, outfit, count){
            console.log('saving.... ',err, outfit);
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

router.post('/outfit/comment', function(req, res, next){
  if (req.user){
    var query = {_id: req.user._id};
    if (req.user.provider){
      query = {facebookId: req.user.id};
    }

    console.log(req.body.comment, req.body.outfitId, req.user);
    var comment = {
      name: req.body.comment,
      commentOn: req.body.outfitId,
      owner: req.user
    };

    var newComment = new Comment(comment);

    console.log(newComment);

    newComment.save(function(err, comment, count) {
      console.log(err, comment, count);
      if (!err) {
        User.findOne(query, function(err, user){
          if (user.outfits.indexOf(req.body.outfitId) > -1){
            Outfit.findOneAndUpdate(
              {_id: req.body.outfitId},
              {comment: newComment},
              {safe: true, upsert: true},
              function(err, outfit, count){
                console.log('saving.... ',err, outfit);
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
    });
  }
  else{
    res.sendStatus(403);
  }
});

// Katie : Route Handler 5
// TODO : THIS DOESNT WORK FOR SOME REASON
router.delete('/outfit/remove/:outfitId/:clothingId', function(req, res, next){
  if (req.user && (req.user.outfits.indexOf(req.params.outfitId) > -1)){
    Outfit.update({_id: req.params.outfitId}, {$pull: {clothes: req.params.clothingId}}, function(err, user){
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

router.get('/style/:slug', function(req, res, next){
  console.log('in getStyle');
  Style.findOne({slug: req.params.slug}).populate('clothes').populate('outfits').populate('comment').exec(function(err, style){
    console.log(err, style);
    if (!err){
      if (style){
        console.log(style);
        res.json(style);
      }
      else {
        res.status(404);
      }
    }
    else {
      console.log('grave error:', err);
      res.sendStatus(500);
    }
  });
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

router.get('/style/cover/:slug', function(req, res, next){
  Style.findOne({slug: req.params.slug}).populate('clothes').exec(function(err, style){
    console.log('STYLE IS: ', style);
    if (!err){
      //this can probably be trimmed, but not checking for edge cases at the moment
      if (style.clothes &&  style.clothes[0] && style.clothes[0].images && style.clothes[0].images[0]){
        console.log(style.clothes[0].images[0], style.slug);
        res.json({image: style.clothes[0].images[0], slug : style.slug});
      }
    }
    else res.status(500);
  });
});

router.post('/style/create', function(req, res, next){
  if (req.user){
    // && req.user._id === req.body.id
    if (((req.body.name.search('>') < 0) && (req.body.name.search('<') < 0)) && (req.body.name.trim()) ){ //check for HTML injection
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
          // console.log(Style);
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
    } else {
      res.sendStatus(500).json('Improper character');
    }
  }
  else{
    console.log('didnt work');
    res.sendStatus(404);
  }
});

router.post('/style/add', function(req, res, next){
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

router.post('/style/comment', function(req, res, next){
  if (req.user){
    var query = {_id: req.user._id};
    if (req.user.provider){
      query = {facebookId: req.user.id};
    }

    console.log(req.body.comment, req.body.styleId, req.user);
    var comment = {
      name: req.body.comment,
      commentOn: req.body.styleId,
      owner: req.user
    };

    var newComment = new Comment(comment);

    console.log(newComment);

    newComment.save(function(err, comment, count) {
      console.log(err, comment, count);
      // console.log(comment);
      if (!err) {
        User.findOne(query, function(err, user){
          if (user.styles.indexOf(req.body.styleId) > -1){
            Style.findOneAndUpdate(
              {_id: req.body.styleId},
              {comment: newComment},
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

router.post('/contact', function(req, res, next){
  var transporter = nodemailer.createTransport('smtps://' + secrets.email.email + '%40gmail.com:' + secrets.email.pass + '@smtp.gmail.com');

  var mailOptions = {
    from: '"' + req.body.name + '" <' + req.body.email + '>', // sender address 
    to: 'jesselifshitz@gmail.com, 7katie@gmail.com', // list of receivers 
    subject: 'Hello', // Subject line 
    replyTo: req.body.email,
    text: req.body.comment, // plaintext body 
    // html: '<b>Hello world 🐴</b>' // html body 
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
});


module.exports = router;
