# ModestWear - Katie's Additions

## New Features
- [x] Implement an Outfits feature
  - [x] Create outfits and be able to add to them
  - [x] Update DB with outfits
  - [x] Comments for outfits
  - [x] Delete outfits
- [x] Styles
  - [x] Delete style 
  - [x] Set up comments for styles
- [x] Comments
  - [x] Set up routing for comments
  - [x] Integrate comments with outfits and styles on the respective pages
- [x] Search for outfits, styles and users
  - [x] Edit the form to choose if you want to search for outfits, styles, or clothing
  - [x] Actually search for it
- [x] Edit the profile page - have it show the user's outfits, styles, and favorites
  - [x] Change the layout
  - [x] Add more information / cards showing some styles and outfits and favorites
  - [x] Make the routes load pictures from styles and outfits
- [x] Set up Contact Me Form 
  - [x] Use parsley for Client Side Validation
- [x] Grunt 
  - [x] Use CSS Preprocessor - Less is compiled by Grunt (in terminal command `grunt`)
  - [x] Run scraping algorithms using grunt - run by typing `grunt scrape`
  - [x] Run JSHint to fix mistakes in the code
    - [x] Fix the code from JSHint - by running `grunt`. The screenshot of the fixed stylistic errors is in /documentation/JSHint_Finished_Fixing.png

#### Requirements
##### Core Requirements
- [x] 5 New Route Handlers (there are much more than 5): 
  - [x] Search
    - [x] Search Outfits
    - [x] Search Styles
    - [x] Get individual outfit
  - [x] Outfits
    - [x] Create
    - [x] Add to outfit
    - [x] Delete
    - [x] Get outfits with images
    - [x] Get individual outfit
  - [x] Contact Me Form
  - [x] Comments Forms
- [x] 4 Mongoose Schemas: 
  - [x] Outfits (with Comments).
  - [x] Following (edit User Schema).
  - [x] Comments
  - [x] Styles (add Comments).
- [x] 3 Forms: 
  - [x] Contact Me Form 
  - [x] Forms to comment on outfits and styles

##### Additional Requirements
- [x] Grunt: 1 point - run `grunt`
- [x] JSHint: 1 point - again, run `grunt`
- [x] CSS Preprocessor: less (public/stylesheets/style.less): 1 point - also run by running `grunt`
- [x] Client Side JS Library: Angular: 2 point - although this was already implemented, I still needed to learn how Angular worked and figure out the code structure to implement the Search, Outfits, forms, and edit the Styles feature. I'm including the _ng core_ model, _ngRoute_ and _angular-md_ in this, which I think should give me 2 points.
- [x] Client Side Validation: Angular Validation: 1 point 

Grunt (1) + JSHint (1) + Less (1) + Angular (2) + Angular Validation (1) = 6

##### Things That I Didn't Get To / Next Steps:
- [ ] Following - Allowing the user to keep track of other people's users, outfits, and styles.
- [ ] Automate the running of the scraping algorithms - Every so often, continuously check if there is new clothing on the sites of the scraping algorithms, to keep the clothing current.
 
## Modules / Concepts
- [Grunt](http://gruntjs.com/) - Automate running the scraping algorithm
- [JSHint](http://jshint.com/) - Make sure that the coding style is up to par
- [Less](http://lesscss.org/)
- [Angular.js](https://angularjs.org/) - Client Side Library, use it for routing
- [Angular Validation](https://docs.angularjs.org/guide/forms) - Client-side form validation library
- [Angular MD](https://material.angularjs.org/latest/) - Enhance to make it responsive and look better

## Site Map
![sitemap page image](/documentation/SiteMap.jpg?raw=true "SiteMap")

## Wireframes
##### Outfits
![outfits page image](/documentation/OutfitsPage.jpg?raw=true "OutfitsPage")
##### Individual Outfit
![outfit page image](/documentation/IndivOutfitPage.jpg?raw=true "IndivOutfit")
##### Following
![following page image](/documentation/FollowingPage.jpg?raw=true "FollowingPage")
##### Contact Me Form
![contact page image](/documentation/ContactMe.jpg?raw=true "Contact")


## Use Cases
####Outfits
- Summmary: An aggregation of clothing that one would physically pair together
- Rationale: Sometimes it's nice to see what clothing one would wear together. People have a lot of clothing, but it's nice to break it all down into outfits, figuring out what you would wear with what, making sure you have the right essentials to wear that skirt you bought. Otherwise, the clothing will never be worn.
- Users: All users
- Preconditions: User is logged in
- Basic Course of Events
  1. User clicks on an article of clothing he or she likes and indicates the user wants to add it to an outfit
  2. The user names the outfit
- Alternate Paths
  - A user can first create an outfit and then add clothing to it
  - A user can copy a style from another user
- Postconditions: The style will appear on the user's profile

####Following - INCOMPLETE
- Summmary: Seeing the outfits, styles, and even users that you like compiled in one place
- Rationale: Certain people have similar styles, so it would be nice to be able to search and favorite users. Similarly, it would be nice to follow outfits and styles, ideally to also have a recommendation algorithm that would see what clothing are usually paired together for similar users and suggested. 
- Users: All users
- Preconditions: User is logged in
- Basic Course of Events
  1. User clicks on a style, outfit, or even user page and can add it to following.
- Alternate Paths
	- A user can search on a style, outfit, or user and then follow it
- Postconditions: The things that a user follows will appear on the user's profile

####Contact Us
- Summmary: A form where people can enter their comments and questions
- Rationale: It would be nice to receive user feedback
- Users: All users
- Preconditions: No preconditions
- Basic Course of Events
  1. User goes to the contact us page
  2. Fills out the form and submits

####Submit Comments
- Summmary: A form where users can comment on their own styles and outfits
- Rationale: For users to be able to remember what their styles and outfits are missing, or just remind themselves for what occasion they meant the outfit or style was originally for
- Users: All users
- Preconditions: User is logged in
- Basic Course of Events
  1. User goes to either the style or outfits page
  2. Submits the filled out form with comments about the style/outfit
- Postconditions: The comment would then appear as part of the style/outfit

##Example Code

#### Comment
```
var Comment = new mongoose.Schema({
   name: String,
   // Comment can either be an outfit or a style.
   commentOn: {type: Schema.Types.Mixed},
   owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   created: { type: Date, default: Date.now }
});
```

#### Outfit
```
var Outfit = new mongoose.Schema({
  name: String,
  clothes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clothing'}],
  style: {type: mongoose.Schema.Types.ObjectId, ref: 'Style'},
  comments: [{type: mongoose.Schema.Types.ObjectID, ref: 'Comment'}],
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  created: { type: Date, default: Date.now }
});
```

#### Style - with comments
```
var Style = new mongoose.Schema({
  name: String, //name of the Style
  clothes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clothing'}],
  outfits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Outfit'}],
  comments: [{type: mongoose.Schema.Types.ObjectID, ref: 'Comment'}],
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  created: { type: Date, default: Date.now }
});
```

#### Following
**Should probably be in user because following is not an object, but a user can either follow a user, style, our outfit.**
```
var User = new mongoose.Schema({
  name: String, //name of user
  styles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Style'}], //should be name of style with array of clothes
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clothing'}], //items the user has favorited
  outfits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Outfit'}],
  following:
  {
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    styles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Style'}],
    outfits: {type: mongoose.Schema.Types.ObjectId, ref: 'Outfit'}]
  }, //which users the person is following
  searches: [String],
  facebookId: [String], //probably want to store more FB data as well
  email: String,
  created: { type: Date, default: Date.now }
});
```
