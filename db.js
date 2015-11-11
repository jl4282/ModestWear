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
  styles: Number //keeps track of how many styles it's in
});
Clothing.plugin(URLSlugs('name'));

var Outfit = new mongoose.Schema({
  name: String,
  clothes: [Clothing],
  style: {type: mongoose.Schema.Types.ObjectId, ref: 'Style'},
  owner: String
});
Outfit.plugin(URLSlugs('name'));

var Style = new mongoose.Schema({
  name: String, //name of the Style
  clothes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clothing'}],
  outfits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Outfit'}],
  owner: String
});
Style.plugin(URLSlugs('name'));

var User = new mongoose.Schema({
  name: String, //name of user
  styles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Style'}], //should be name of style with array of clothes
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clothing'}], //items the user has favorited
  following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], //which users the person is following
  searches: [String]
});
User.plugin(URLSlugs('name'));

mongoose.model('Clothing', Clothing);
mongoose.model('Style', Style);
mongoose.model('Outfit', Outfit);
mongoose.model('User', User);
mongoose.connect('mongodb://localhost/mwdb');
