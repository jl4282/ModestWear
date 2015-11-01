var mongoose = require('mongoose'),
    URLSlugs = require('mongoose-url-slugs');

var Clothing = new mongoose.Schema({
  name: String,
  images: [String], //(array of links to the image so that we don’t need to host the image)
  description: String,
  sizes: [String], //array of sizes
  price: Number,
  length: Number,
  url: String,
  brand: String,
  itemNumber: String,
  type: String, //enum type of clothing that it is (skirt, hat...)
  approved: Boolean //whether it’s approved to show
});
Clothing.plugin(URLSlugs('name'));

var Styles = new mongoose.Schema({
  name: String,
  clothes: [Clothing],
  owner: String
});
Styles.plugin(URLSlugs('name owner'));


var User = new mongoose.Schema({
  id: String,
  name: String,
  styles: [Styles], //should be name of style with array of clothes
  favorites: [Clothing]
});


mongoose.model('Clothing', Clothing);
mongoose.model('Styles', Styles);
mongoose.model('User', User);
mongoose.connect('mongodb://localhost/clothesdb');
