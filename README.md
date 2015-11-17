#ModestWear

##Overview
ModestWear is a website that aggregates modest clothing so that users don't need to search countless sites to find something modest. ModestWear allows the user to login through Facebook, and create their own "style" and "outfits". Styles are groups of clothing that go together, whereas outfits are different outfits that you can create using the clothes in your styles. Users will then be allowed to follow each other and see each other's styles and outfits. Anothre pillar of our website is custom recommendations. When creating an outfit or style, or perusing through search results, we want to give you personal recommendations.

##Logistics

###Modules, Concepts, Technologies

- [Cheerio](https://github.com/cheeriojs/cheerio): Cheerio is a web scraping framework that uses familiar jQuery syntax. It will allow us to scrape websites more quickly and efficiently.
- [Node.js](https://nodejs.org/en/)
- [Polymer](https://www.polymer-project.org/1.0/): Polymer is Google's Material Design framework. We want the site to have an MD layout and we want to utilize Polymer's data binding. This will make passing information between the controllers and web page easier. Polymer also adheres to Google's MD specifications, and takes care of much of the required CSS. It also adds motions that we can use to transition between elements. Another possible framework we might use for the front end is Material Angular. It's Angular that adheres to MD specifications, although it's not as fleshed out as Polymer.
- [MongoDB](https://www.mongodb.org/)
- [Mongoose](http://mongoosejs.com/)
- [Express](http://expressjs.com/)
- [passport-facebook](https://github.com/jaredhanson/passport-facebook): We want to login through Facebook, so we chose passport-facebook because it is the module recommended by Passport. We need to still research how to actually get data from a user's Facebook page, and how to add it to the database. Right now Passport-Facebook is only working in a separate test app `fb.js`, although we need to add it to the main application.

###Point Values
- MVC (1) 
  - I want to lay out the project in a Model - View - Controller format
  - Need to research Polymer and MVC
- Using pre-built Express project templates (1) - created `app using npm install express-generator`
- Phantom.js (3) 
  - We want to use Phantom.js to test our routes
  - Need to research it more [here](http://phantomjs.org/)
- Less (1?) - If we need to add any aditional CSS we want to use LESS
- Minification (1) - We want to minify everything on our production server
- grunt to automatically (1): 
  - precompile Less (if used) 
  - run scraping algorithms
  - minify the files
- JSHint (1) - we want to install JSHint for SublimeText2
- User Authentication (3)- hopefully use Facebook
- CSS Framework (1) - Either Material Design Lite or the framework that Polymer comes with.
- client side library (1) - Polymer - Is it possible to count as 3 or 4 points though because of the complexity of Polymer? It's relatively new so it's hard to learn. 
- visual effects (1) - we want to use Polymer's visual effects or create our own to create a living, breathing site.

Total: 13? (I'm bad with numbers)

###Some Wireframes

####Home Page
![home page image](/documentation/homepage.JPG?raw=true "Homepage")

####Styles/Outfits Pages
![styles and outfits](/documentation/outfits_and_styles.JPG?raw=true "Styles and Outfits")

####Search Page
![search page](/documentation/search_page.JPG?raw=true "Search Page")

### Use Cases

####Outfits
- Summmary: Aggregation of clothing that is an outfit belongs to a style and contains articles of clothing from that style
- Rationale: User might have items in a style, but wants to determine what items go together
- Users: All users
- Preconditions: User is logged in, and has a style already created
- Basic Course of Events
  1. User indicates which outfit the user wants the style to be within
  2. The software populates the "Styles" tab in the Outfits page with other articles of clothing from that style, as well as populates the fravorites, and recommended tab.
  3. The user adds as many articles of clothing to the style
  4. The user names the style (optional)
  5. Upon creating the outfit, the user sees a list of all outfits in that style
- Alternate Paths
  - A user can also create an outfit from a search result or copy another user's outfit
    1. User indicates that the user wants to create an outfit from another outfit or clothing article
    2. The user indicates which Style it will be added to, or creates a new one
    3. The user creates outfit
  - A user can add new articles of clothing to the style by adding it to an outfit
    1. A user can search from within the outfit creation screen to add new items to the outfit.
    2. New items will also be added to the style
- Postconditions: The outfit will appear within the style

####Styles
- Summmary: An aggregation of articles and clothing and outfits which are made from those articles of clothing
- Rationale: User might want to see the articles (similar to a shopping cart), but at the same time want to see different outfits that can be made using those articles of clothing.
- Users: All users
- Preconditions: User is logged in
- Basic Course of Events
  1. User clicks on an article of clothing he or she likes and indicates the user wants to add it to a style
  2. The user names the style
- Alternate Paths
  - A user can first create an outfit and then add it to a style
  - A user can copy a style from another user
- Postconditions: The style will appear on the user's profile
 
####Personalized Search
- Summmary: A user might want to search for clothing
- Rationale: User might want to search for clothing and have personalized results based on his or her preferences.
- Users: All users
- Preconditions: None
- Basic Course of Events
  1. User indicates the items he or she wants to search for
  2. The results are populated based on our recommendation algorithm
- Alternate Paths
  1. User searches from within Outfit
  2. User searches from within Style creation
  3. User searches from home page using query
  4. User searches from homepage using navbar categories
- Postconditions: User will see personalized results

####Favorite an Item
- Summmary: User can favorite something and come back to it at a later point.
- Rationale: User might want to favorite an item but not add it to a style or outfit at that point in time.
- Users: All users
- Preconditions: Logged in
- Basic Course of Events
  1. User indicates the items he or she wants to favorite something
  2. Item is placed in favorites array depending on the type of item favorited
- Alternate Paths
- Postconditions: User will see this item in his or her favorites category on pages and in results

####Follow Other Users
- Summmary: User can follow Styles, or other users
- Rationale: User might like the styles or particular style that someone created, and want to see when the user changes it
- Users: All users
- Preconditions: Logged in
- Basic Course of Events
  1. User indicates the items he or she wants to follow a user
  2. User clicks a follow button
  3. User or Style is stored in the DB somewhere
- Alternate Paths
  1. User is on a user page and follows the other user
  2. The user finds the other user in a search result
  3. User finds style in search result and follows it
- Postconditions: User will see more search results from the followed user or followed style. It might also show up in a feed page if we get that far.

###Example Documents

####User
```javascript
//Model
var User = new mongoose.Schema({
  name: String, //name of user
  styles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Style'}], //should be name of style with array of clothes
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clothing'}], //items the user has favorited
  following:
  {
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    styles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Style'}]
  }, //which users the person is following
  searches: [String],
  facebookId: [String] //probably want to store more FB data as well
});

  //example:
{
  name: 'Jesse Lifshitz',
  styles: ['ref to style 1', 'ref to style 2'],
  favorites: ['ref to clothing 1', 'ref to clothing 2', 'ref to clothing 3'],
  following: 
  {
    users: ['ref to user 1', 'ref to user 2', 'ref to user 3' ...],
    styles: ['ref to style 1', 'ref to style 2']
  },
  searches: ['black skirts', 'summer shirts', '30 inch skirt'],
  facebookId: ['sad;flkjasdf123;asdf12'] //provided by Facebook
}  
```
####Clothing
```javascript
//model
var Clothing = new mongoose.Schema({
  name: String,
  images: [String], //(array of links to the image so that we don’t need to host the image)
  description: String,
  sizes: [String], //array of sizes
  price: Number,
  colors: [String],
  length: Number, //take middle size
  url: String, //back to original site scraped from
  brand: String,
  itemNumber: String,
  type: {type: String, enum: ['skirt', 'shirt', 'dress', 'sweater']}, // skirt, shirt, dress, sweater
  approved: Boolean, //whether it’s approved to show
  favorites: Number, //keeps track of how many times it was favorited
  styles: Number //keeps track of how many styles it's in
});

//example: pulled from a findOne query...
{
  "_id" : ObjectId("563b8a0e6420742115954a92"),
  "name" : "Little Black Dress- Knee Length Scuba Fabric",
  "description" : "Little black dress in scuba fabric is the perfect addition to every wardrobe. Fitted cut made from 90% polyester/10% spandex. Classic LBD with silver lurex highlights to make you shine. Wear as is or add a scarf, belt, or cardigan to give it your personal touch. Also available in purple without lurex",
  "price" : 36,
  "length" : 39,
  "url" : "http://www.koshercasual.com/Little-Black-DressKnee-Length-Scuba-Fabric_1508_p.html",
  "brand" : "KosherCasual",
  "itemNumber" : "1508",
  "type" : "dress",
  "approved" : true,
  "slug" : "little-black-dress-knee-length-scuba-fabric",
  "colors" : [
    "Purple",
    "Black Lurex"
  ],
  "sizes" : [
    "XS",
    "S",
    "M"
  ],
  "images" : [
    "https://www.koshercasual.com/cthumbh.asp?path=C:\\hshome\\koshercasual\\koshercasual.com\\uploads\\3129.26938.jpg&height=300",
    "https://www.koshercasual.com/cthumbh.asp?path=C:\\hshome\\koshercasual\\koshercasual.com\\uploads\\3176.49741.jpg&height=300"
  ],
  "__v" : 0
}
```
####Outfit
```javascript
//model:
var Outfit = new mongoose.Schema({
  name: String,
  clothes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clothing'}],
  style: {type: mongoose.Schema.Types.ObjectId, ref: 'Style'},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

//example: 
{
  name: 'Good for School',
  clothes: ['ref to clothing 1', 'ref to clothing 2', 'ref to clothing 3'],
  style: 'ref to Style',
  owner: 'ref to User'
}
```
####Style
```javascript
//model
var Style = new mongoose.Schema({
  name: String, //name of the Style
  clothes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clothing'}],
  outfits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Outfit'}],
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

//example: 
{
  name: 'Hipster',
  clothes: ['ref to clothing 1', 'ref to clothing 2', 'ref to clothing 3'],
  outfits: ['ref to outfit 1', 'ref to another outfit'],
  owner: 'ref to user'
}
```

###Site Map
![Site Map](/documentation/site_map.JPG?raw=true "Site Map")

###Sites to Scrape (Hopefully)

####Religious-Oriented Stores: 
- [x] Kosher Casual
- [ ] Modest Apparel USA
- [ ] Junees
- [ ] Mode-sty

####Department Stores
- [ ] Century 21
- [ ] Forever 21
- [ ] Nordstrom 
- [ ] Nordstrom Rack
- [ ] Urban Outfitters
- [ ] Gap 
- [ ] Old Navy
- [ ] Lord and Taylor

####Designers
- [ ] Anthropology 
- [ ] JCrew
- [ ] Banana Republic
- [ ] Anne Klein
- [ ] Calvin Klein
- [ ] Neiman Marcus

##Design

We're using Material Design themes. We hope to abide the MD standards and create meaningful transitions.


##Instructions - Quick Guide to MEAN

1. Download
2. run `npm install`

## Running Website
`node bin/www`

##Scraping

###Running a Scraping Algorithm

Scraping requires mongo to be running. 
To accept MongoDB connections: `mongod`.
In another terminal window run the scraping algorithm, `node testingCheerio.js`.

###Creating a Scraping Algorithm

We are using [cheerio.js](http://cheeriojs.github.io/cheerio/) to scrape information. It uses jQuery like syntax and is very easy to use. They have great documentation for it.

The template is based off of kosherCasual.js. The file has two function. The first, `kosherScrape` takes in a url, array, and clothing type. This function aggregates all the links to a product page. It continues onto the next page in the website, until it is on the last page. At this point it has compiled a list to all of the links for products in that category, and then it calls the scrapeProductPage function.

`scrapeProductPage` scrapes an individual page and stores it in the database. We add fields to an object until the object contains everything, and then that object is passed into mongoose to add it to the database. 

:exclamation:**Note:** Property names **must match** the names in the schema exactly, or else it won't save.

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


