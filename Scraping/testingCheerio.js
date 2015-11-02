var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ModestWear' });
  url = 'http://www.bananarepublic.com/';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, body){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(body);

            $(".entry-title > a").each(function() {
            	var link = $(this);
            	var text = link.text();
            	var href = link.attr("href");

            	console.log(text + "-> " + href);
            });
            var a = $(this).prev();
            var title = a.text();
            var url = a.attr('href');

            var prev = a.prevObject;
            var children = prev.children;

            console.log("CHILDREN:")
            console.log(children)

            console.log(a);
            console.log(title);
            console.log(url);

            // Finally, we'll define the variables we're going to capture

            var title, release, rating;
            var json = { title : "", release : "", rating : ""};
            console.log("ITS WORKING!")
        }
        if(error){
        	console.log("NOT WORKING!")
        }
    })
});

module.exports = router;



