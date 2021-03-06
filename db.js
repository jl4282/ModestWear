(function() {
  'use strict';
  var mongoose = require('mongoose'),
    URLSlugs = require('mongoose-url-slugs');

  var Clothing = new mongoose.Schema({
    name: String,
    images: [String], //(array of links to the image so that we don’t need to host the image)
    description: String,
    sizes: [String], //array of sizes
    price: Number,
    colors: [String],
    length: Number, //take middle size
    url: String, //back to original site scraped from
    brand: String,
    itemNumber: String,
    type: {type: String, enum: ['skirt', 'shirt', 'dress', 'sweater']}, // skirt, shirt, dress, sweater
    approved: Boolean, //whether it’s approved to show
    favorites: Number, //keeps track of how many times it was favorited
    styles: Number, //keeps track of how many styles it's in
    created: { type: Date, default: Date.now }
  });
  Clothing.plugin(URLSlugs('name'));

  // Make comment Schema
  var Comment = new mongoose.Schema({
    name: String,
    commentOn: {type: mongoose.Schema.Types.Mixed},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created: { type: Date, default: Date.now }
  });
  Comment.plugin(URLSlugs('name'));

  // Mongoose Schema 1
  var Outfit = new mongoose.Schema({
    name: String,
    clothes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clothing'}],
    style: {type: mongoose.Schema.Types.ObjectId, ref: 'Style'},
    comment: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created: { type: Date, default: Date.now }
  });
  Outfit.plugin(URLSlugs('name'));

  var Style = new mongoose.Schema({
    name: String, //name of the Style
    clothes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clothing'}],
    outfits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Outfit'}],
    comment: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created: { type: Date, default: Date.now }
  });
  Style.plugin(URLSlugs('name'));

  var User = new mongoose.Schema({
    name: String, //name of user
    styles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Style'}], //should be name of style with array of clothes
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clothing'}], //items the user has favorited
    outfits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Outfit'}],
    following:
    {
      users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
      styles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Style'}],
      outfits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Outfit'}]
    }, //which users the person is following
    searches: [String],
    facebookId: [String], //probably want to store more FB data as well
    email: String,
    created: { type: Date, default: Date.now }
  });
  User.plugin(URLSlugs('name'));

  mongoose.model('Clothing', Clothing);
  mongoose.model('Outfit', Outfit);
  mongoose.model('Style', Style);
  mongoose.model('Comment', Comment);
  mongoose.model('User', User);
  // TODO : CHANGE TO http://i6.cims.nyu.edu:12266/
  if (process.env.NODE_ENV === 'PROD'){
    mongoose.connect('mongodb://localhost:12266/userdb'); // TODO: CHANGE TO MY PORT NUMBER WHEN ASSIGNED
  }
  else {
    mongoose.connect('mongodb://localhost/mwdb');
  }
})();


