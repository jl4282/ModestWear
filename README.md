# ModestWear

## Installing

1. Download
2. run `npm install`

## Running Website
`node bin/www`

## Scraping
Scraping requires mongo to be running. 
To accept MongoDB connections: `mongod`.
In another terminal window run the scraping algorithm, `node testingCheerio.js`.

##MongoDB Terminal Commands

To use MongoDB in the terminal, make sure you have an intance running (`mongod`) in another window, and then run `mongo`.
Some useful commands are:

* `use db` - will use the database db
* `db.collection.findOne()` - will return one instance.
* `db.collection.count()` - will count the number of items in the collection
* `db.collection.drop()` - will drop everything in the collection (allows you to start from scratch)
* `show dbs` - shows all of the databases
* `show collections` - shows all of the collections
* `mongo db` - uses that database

The db is called `mwdb` and the collection that we are scraping into is called `clothings` (note the weird spelling).

Thus, an example scraping might look something like this:

1. In a Terminal window type `mongod`.
2. Leave that open while running `node scrapingalgo.js`
3. Then open `mongo mwdb`
4. `db.clothings.count()` to make sure it added items.

##Design

We're using Material Design Lite. It shouldn't require too much custom CSS. Try to implement everything using MDL. The components can all be found [here](http://www.getmdl.io/components/index.html). Do note that the components have extensive examples and step by step guides on the bottom. 

