var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
require('../db');
var Clothing = mongoose.model('Clothing');


var modeStyLinks = [
  {
    type: 'skirt',
    link: 'http://www.mode-sty.com/collections/midi-skirts'
  }, {
    type: 'skirt',
    link: 'http://www.mode-sty.com/collections/maxi-skirts'
  }, {
    type: 'dress',
    link: 'http://www.mode-sty.com/collections/maxi-dresses'
  }, {
    type: 'dress',
    link: 'http://www.mode-sty.com/collections/midi-dresses'
  }
];

modeStyLinks.forEach(function(obj){
  var links = [];
  modeStyScrape(obj.link, links, obj.type);
});


function modeStyScrape(url, links, type){
  request(url, function(error, response, body){
    if(!error){
      var $ = cheerio.load(body);
      $('.twelve').find('a').each(function(i, elem){
        /* 
        get 12 columns
        for each of those:
          for each of "three columns":
            get a href
        */
        links.push($(this).attr('href'));
        // console.log(links);
      });
      /* modSty does all in one page
      if($('.currentPage').next().html()){
        console.log("working?");
        modeStyScrape('http://www.mode-sty.com/' + $('.currentPage').next().find('a').attr('href'), links, type);
      }
      */
      
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

  // console.log("trying to scrape a link");
  if (link == undefined) {
    return;
  }
  var fullUrl = "http://www.mode-sty.com/" + link;

  // console.log("fullUrl done : " + link);

  request(fullUrl, function(err, res, body){
    if(!err){
      // console.log("request works");

      var $ = cheerio.load(body);

      // console.log("loading the body");
      var item = {};
      //name
      $('h1').each(function(i, elem){
        // console.log("getting the page");
        if($(this).attr('itemprop') === 'name'){
          // console.log("$(this).attr('itemprop') === 'title')")
          item.name = $(this).text().trim();
          // console.log(item.name);
        }
      });
      //images
      item.images = [];
      $('.slides').each(function(i, elem){
        var array = elem.children;

        for (var a in array) {
          var attribs = array[a].attribs
          for (var b in attribs) {
            if (b == 'data-thumb') {
              // console.log(attribs[b]);
              item.images.push(attribs[b]);
            }
          }   
        }
      });

      // TODO : NEED DESCRIPTION WITHOUT SPACES
      item.description = $('#tab1').text().trim();
      //normalize description
      item.description = item.description.replace(/\*/g, '.'); //removes asterisks
      item.description = item.description.substring(2); //removes first period
      
      // console.log(item.description);

      // TODO : sizes --> take middle size
      item.sizes = [];
      // var bad_size = ['Details', 'Coverage Information', 'Size Chart'];
      $('table strong').each(function(i, elem) {
        //if not waist
        var size_array = elem.children;
        var data = [];
        for (var a in size_array) {
          //console.log(a);
          //console.log(size_array[a]);
          var data = size_array[a]['data'];
          //console.log(data);
          // console.log(data);
          if (data != 'Waist' && data != 'Bust' && data != 'Hips' && data != 'Length') {
            item.sizes.push(data);
          }
          // item.sizes.push(size_array[a]['data']);
        }
      });

      // price
      var price = $('span.current_price');
      item.price = price[0].parent.attribs['content'];

      // TODO : NEED COLOR
      // QUESTION : I'M NOT SURE THAT THEY PUT COLOR HERE BECAUSE THEY'RE MULTICOLOR
      item.colors = [];
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
      item.brand = 'ModeSty';
      //itemNumber
      var text = $('#tab1', 'div').text();
      // console.log(text);
      var textarray = text.split(" ");
      for (var a in textarray) {
        if (textarray[a].indexOf('length,') > -1) {
          a++;
          textarray[a] = textarray[a].replace(/'/g, '');
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

      // console.log(item);
      // console.log('\n\n');

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


