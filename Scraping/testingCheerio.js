var request = require('request');
var cheerio = require('cheerio');

var koshCasLinks = [
  {
    type: 'skirt',
    link: 'http://www.koshercasual.com/category.asp?id=364'
  },{
    type: 'shirt',
    link: 'http://www.koshercasual.com/category.asp?id=368'
  },{
    type: 'dress',
    link: 'http://www.koshercasual.com/Womens-Modest-Dresses_cat.html'
  }
];

var links = [];
// kosherScrape(url, links, 'skirt');
function kosherScrape(url, links, type){
  request(url, function(error, response, body){
    if(!error){
      var $ = cheerio.load(body);
      $('.price a').each(function(i, elem){
        links.push($(this).attr('href'));
      });
      if($('.currentPage').next().html()){
        kosherScrape('http://www.koshercasual.com/' + $('.currentPage').next().find('a').attr('href'), links, type);
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

// scrapeProductPage('http://www.koshercasual.com/Printed-Knee-Length-Pencil-Skirt_1909_p.html');
// scrapeProductPage('http://www.koshercasual.com/Womens-Tiered-Cotton-Skirt-Knee-Length-Skirt-with-Foldover-Waist-_1419_p.html', 'skirt');
// scrapeProductPage('http://www.koshercasual.com/Little-Black-DressKnee-Length-Scuba-Fabric_1508_p.html', 'dress');
function scrapeProductPage(link, type){
  var fullUrl = "http://www.koshercasual.com/" + link;
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
        console.log(item.length);
      }
      if (type === 'dress'){
        item.length = $('.mceItemTable tbody').find('tr').eq(4).find('td').eq(4).text().trim();
        console.log(item.length);
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

      // console.log(item.type);
    }
    else{
      console.log('ERROR in individual link:' + fullUrl);
    }
  });
}
