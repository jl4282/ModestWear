var request = require('request');
var cheerio = require('cheerio');

url = 'http://www.koshercasual.com/category.asp?id=364';
// url = 'http://www.koshercasual.com/category.asp?id=364&Page=6';
var links = [];
kosherScrape(url, links);
function kosherScrape(url, links){
    request(url, function(error, response, body){
        if(!error){
            var $ = cheerio.load(body);
            $('.price a').each(function(i, elem){
                links.push($(this).attr('href'));
            });
            console.log(links);
            if($('.currentPage').next().html()){
                kosherScrape('http://www.koshercasual.com/' + $('.currentPage').next().find('a').attr('href'), links);
            }
            else{
                //final page so call function that will scrape individual pages
            }
            console.log("ITS WORKING!");
        }
        if(error){
            console.log("NOT WORKING!");
        }
    });
}
