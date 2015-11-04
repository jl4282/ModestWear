var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
require('../db');
var Clothing = mongoose.model('Clothing');


var websiteLinks = [
  {
    type: //type of clothing
    link: // link to category results page ex: http://www.koshercasual.com/category.asp?id=368
  }

  //add as many objects as you need. Each object should have a type and link.

];


//loops through each object in the array and calls getAllLinks on it
websiteLinks.forEach(function(obj){
  var links = [];
  getAllLinks(obj.link, links, obj.type);
});


//get all product links for the result
function getAllLinks(url, links, type){
  request(url, function(error, response, body){ //makes a request for the url
    if(!error){
      var $ = cheerio.load(body); // load cheerio into $
      /*
      get all of the links to products and insert them into "links" array
      you can use .each() to do this, once you find where all of the links are stored:
      $('.price a').each(function(i, elem){
         links.push($(this).attr('href'));
      });
      */

      if( /* there is another page */){
        getAllLinks( /* get the link */, links, type);
      }
      else{
        //final page so call function that will scrape individual pages
        links.forEach(function(link){
          scrapeProductPage(link, type);
          links = [];
        });
      }
    }
    if(error){
      console.log("NOT WORKING!");
    }
  });
}

//scrape the individual product page
function scrapeProductPage(link, type){

  // depending on how you got the links, whether they are absolute or
  // relative you may need to make them relative like so:
  // var fullUrl = "http://www.    .com/" + link;

  request(fullUrl, function(err, res, body){ //request the website and use cheerio
    if(!err){
      var $ = cheerio.load(body);
      var item = {}; //the item that will eventually get added to the database

      // BE SURE TO USE .trim() ON ALL TEXT! IT GETS RID OF WHITE SPACE

      //name
      item.name = //item's name that is found somehow.

      //images
      item.images = [];
      //for each image
        item.images.push( /* link to image */);

      //description
      item.description = /* product description */
      //normalize description afterward! - this will vary for each website

      //sizes
      item.sizes = [];
      /* for each size */
        /* normalize size and then push size */
        item.sizes.push( /* size */ );

      //price
      var price = $(/* find containing div of price */).find( /*find containing div of price*/ );
      if ( /* if has two prices (sale and regular) */ ){ //has two prices
        item.price = /* regular price that is normalized to a number */
      }
      else{ //only one price
        item.price = /* regular price that is normalized to a number */
      }
      //colors
      item.colors = [];
      /* for each color */
        item.colors.push( /* color normalized to a degree */ );
      //length
      item.length = /* length found somehow. only dresses and skirts should have length I think */

      //url
      item.url = fullUrl; //or url

      //brand
      item.brand = // the name of the website eg: KosherCasual

      //itemNumber

      item.itemNumber = /*product number of the item*/

      //type
      item.type = type;
      //approved
      item.approved = true; //set approved to modest sites, false to other sites and then we manually approve it

      // console.log(item);

      //INSERT INTO DB
      new Clothing(item).save(function(err, clothing, count){
        if (!err){
          console.log('no error!');
        }
        else{
          console.log('error: ', err);
        }
      });


    }
    else{
      console.log('ERROR in individual link:' + fullUrl);
    }
  });
}
