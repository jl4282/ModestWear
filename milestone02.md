# Milestone 2

### Setup Instructions:
- Download
- run `npm install`
- run `bower install`
- run mongod
- compile less and run scraping algorithms by typing `grunt scrape` in the terminal

### Run By:
- mongod
- node bin/www

- [x] 1 form that can add data to your database
	- [x] skirts, shirts, or dresses -> + on the bottom of the card -> add outfits
	- [x] outfits or styles -> add comment
- [x] 1 page that reads data from your database
	- [x] http://localhost:3000/outfits/
	- [x] added search for outfits and styles -> search button on top
- [x] partially implement one of research topics
	- [x] Grunt
	- [x] JSHint -> (run grunt)
	- [x] Less -> (run grunt)

#### Just a note 
The secrets.js file has to be included for this, to allow you to run the proeject. On our actual, global directory, I have it included in our .gitignore, but in this, since it's private, I've included it. 