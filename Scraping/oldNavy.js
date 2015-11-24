var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
require('../db');
var Clothing = mongoose.model('Clothing');


var oldNavyLinks = [
  {
    type: 'skirt',
    link: 'http://oldnavy.gap.com/browse/category.do?cid=79586'
  }
  /*
  ,{
    type: 'shirt',
    link: 'http://www.koshercasual.com/category.asp?id=368'
  },{
    type: 'dress',
    link: 'http://www.koshercasual.com/Womens-Modest-Dresses_cat.html'
  }
  */
];

oldNavyLinks.forEach(function(obj){
  var links = [];
  oldScrape(obj.link, links, obj.type);
});


//get all product links
function oldScrape(url, links, type){
  console.log("*** RUNNING ***");
  request(url, function(error, response, body){
    if(!error){
      var $ = cheerio.load(body);
      $('.info').each(function(i, elem){
        console.log("getting an item : " + elem);
        // console.log(Object.prototype.toString.call(elem));
        console.log(elem.currentPrice);

        // console.log($(this).attr('href'));
        links.push($(this).attr('href'));
        // console.log(links);
      });
      if($('.currentPage').next().html()){
        oldScrape('http://oldnavy.gap.com/' + $('.currentPage').next().find('a').attr('href'), links, type);
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
  var fullUrl = "http://oldnavy.gap.com/" + link;
  request(fullUrl, function(err, res, body){
    if(!err){
      var $ = cheerio.load(body);
      var item = {};
      //name
      $('h1').each(function(i, elem){
        if($(this).attr('itemprop') === 'name'){
          item.name = $(this).text().trim();
        }
      });
      //images
      item.images = [];
      $('.multizoom1 a').each(function(i, elem){
        item.images.push($(this).attr('href'));
      });
      //description
      item.description = $('#productdesc').text().trim();
      //normalize description
      item.description = item.description.replace(/\*/g, '.'); //removes asterisks
      item.description = item.description.substring(2); //removes first period
      //sizes -> take middle size
      item.sizes = [];
      $('#attop39 option').each(function(i, elem){
        var color = $(this).text().trim();
        if (color.search('Select') === -1){ //normalize with just name
          item.sizes.push(color.slice(6 + color.search('Adult')));
        }
      });
      //price
      var price = $('.prod-price').find('p');
      if (price.children('span').length > 0){ //has two prices
        item.price = price.find('.oldprice').text().trim().substring(1);
      }
      else{ //only one price
        item.price = price.text().trim().substring(1);
      }
      //colors
      item.colors = [];
      $('#attop38 option').each(function(i, elem){
        var color = $(this).text().trim();
        if (color !== '-First  Select Color-'){ //normalize with just name
          item.colors.push(color.slice(1 + color.search(':')));
        }
      });
      //length
      if (type === 'skirt'){
        item.length = $('.mceItemTable tbody').find('tr').eq(4).find('td').eq(3).text().trim();
      }
      if (type === 'dress'){
        item.length = $('.mceItemTable tbody').find('tr').eq(4).find('td').eq(4).text().trim();
      }
      //
      //url
      item.url = fullUrl;
      //brand
      item.brand = 'KosherCasual';
      //itemNumber
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
