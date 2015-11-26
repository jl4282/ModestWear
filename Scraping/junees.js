var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
require('../db');
var Clothing = mongoose.model('Clothing');


var juneesLinks = [
{
  type: 'skirt',
  link: 'http://www.junees.com/collections/junee-skirts'
}, {
  type: 'shirt',
  link: 'http://www.junees.com/collections/junee-tops'
}, {
  // TODO : ARE WE PUTTING SHELLS ON THE WEBSITE? IF YES, DELETE DUPLICATES!!!
  type: 'shirt',
  link: 'http://www.junees.com/collections/junee-shells'
}, {
  type: 'dress',
  link: 'http://www.junees.com/collections/junee-dresses-1'
}
];


//loops through each object in the array and calls getAllLinks on it
juneesLinks.forEach(function(obj){
  var links = [];
  juneesScrape(obj.link, links, obj.type);
});

function juneesScrape(url, links, type){
  console.log('working!');
  request(url, function(error, response, body){
    if(!error){
      var $ = cheerio.load(body);
      console.log('getting product-list');
      $('.product-item-info').find('a').each(function(i, elem){
        links.push($(this).attr('href'));  
      });
      console.log(links);
      
      //final page so call function that will scrape individual pages
      links.forEach(function(link){
        // console.log(links);
        scrapeProductPage(link, type);
        links = [];

      });
      
    }
    if(error){
      console.log("NOT WORKING!");
    }
  });
}

//scrape the individual product page
function scrapeProductPage(link, type){
  if (link == undefined) {
    return;
  }
  var fullUrl = "http://www.junees.com" + link;

  request(fullUrl, function(err, res, body){
    if(!err){
      // console.log("request works");

      var $ = cheerio.load(body);

      // console.log("loading the body");
      var item = {};
      //name
      $('.product-title').each(function(i, elem){
        // TODO : bounce out if the name already exists!!!
        item.name = elem.children[0]['data'];
        // console.log(item.name);
      });

      //images
      item.images = [];
      $('.thumbnail-list li').each(function(i, elem){
        // console.log(elem);
        var array = elem.children;
        for (var a in array) {
          var attribs = array[a].attribs
          for (var b in attribs) {
            // console.log(attribs[b]);
            if (attribs[b].indexOf('//') > -1) {
              if (item.images.indexOf(attribs[b]) === -1) {
                item.images.push(attribs[b]);
              }              
            }
          }
        }
      });

      // TODO : NEED DESCRIPTION WITHOUT SPACES
      item.description = $('.product-description').text().trim();
      //normalize description
      item.description = item.description.replace(/\*/g, '.'); //removes asterisks
      item.description = item.description.substring(2); //removes first period
      
      item.sizes = [];
      $('option').each(function(i, elem){
        var size = $(this).text().trim();
        if (size !== 'USD' && size !== 'CAD' && size != 'EUR' && size !== 'GBP'){ //normalize with just name
          size = size.split('/')[1];
          size = size.split('-')[0];
          size = size.trim();
          if (item.sizes.indexOf(size) === -1 ) {
            item.sizes.push(size);
          }
          
        }
      });


      // price
      $('.product-prices').each(function(i, elem){
        var pr = elem.children[1]['children'][0]['data'];
        // console.log(elem.children[1]['children'][0]['data']);
        pr = pr.split('$')[1].trim();
        item.price = pr.split('.')[0];
        // console.log(item.price);
      });
      // var price = $('.product-prices');
      // if (price.)
      // console.log(price[0]);
      // item.price = price[0].parent.attribs['content'];

      // TODO : NEED COLOR
      // QUESTION : I'M NOT SURE THAT THEY PUT COLOR HERE BECAUSE THEY'RE MULTICOLOR
      item.colors = [];
      $('option').each(function(i, elem){
        var color = $(this).text().trim();
        if (color !== 'USD' && color !== 'CAD' && color != 'EUR' && color !== 'GBP'){ //normalize with just name
          color = color.split('/')[0];
          color = color.trim();
          if (item.colors.indexOf(color) === -1) {
            item.colors.push(color);
          }
          
        }
      });
      // console.log(item.colors);
      /*
      $('#attop38 option').each(function(i, elem){
        var color = $(this).text().trim();
        if (color !== '-First  Select Color-'){ //normalize with just name
          item.colors.push(color.slice(1 + color.search(':')));
        }
      });
      */

      //url
      item.url = fullUrl;
      //brand
      item.brand = 'Junees';
      //itemNumber
      var text = $('.product-description').find('li').text();
      // console.log(text);
      var textarray = text.split(" ");
      // console.log(textarray);
      // TODO : Right now, if it's a shirt, it's undefined.
      // length
      if (type != 'shirt') {
        for (var a in textarray) {
          if (textarray[a].indexOf('"') > -1) {
            var len = textarray[a].split('"')[0];

            // console.log(length);
            len = len.match(/\d+/)[0] // "3"
            item.length = len;
            /*
            if (len.match(/^[0-9]+$/) != null) {
              console.log(len.trim());
            }
            if (isNumeric(len)) {
              item.length = len;
              console.log(len);
            }
            */
            /*
            a++;
            textarray[a] = textarray[a].replace(/'/g, '');
            console.log(textarray[a]);
            if (textarray[a].indexOf('-') > -1) {
              try {
                var length = textarray[a];
                length = length.split('-')[0];
                item.length = length;
              }
              catch (e) {
                return;
              }
            }
            else {
              item.length = textarray[a];
            }
            break;
          }
          */
          }
        }
      }
      
      $('div .productleft span').each(function(){
        if ($(this).attr('itemprop') === 'identifier'){
          item.itemNumber = $(this).text().trim();
        }
      });
      //type
      item.type = type;
      //approved
      item.approved = true;

      console.log(item);
      console.log('\n\n');

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

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}