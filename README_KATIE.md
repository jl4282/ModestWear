# ModestWear - Katie's Additions

## New Features
- Implement an Outfits and Following pages using Angular
- Contact Me Form (using Client-Side Validation)
- Comments for Outfits and Styles using forms
- Automate scraping algorithms 
- Edit the scraping algorithm queries so the db does not store doubles
- Use CSS Preprocessor and Angular MD to make it look nicer

#### Just going through the Requirements
- 5 Route Handlers: Outfits, Favorites, Forms
- 4 Mongoose Schemas: Outfits, Favorites, Comments, edit Styles
- 3 Forms: Contact us, form to comment on outfits and styles
- Grunt: 1 point
- JSHint: 1 point
- CSS Preprocessor: Angular.less: 1 point
- Client Side Validation: Parsley: 2 point
- Angular MD: 1 point
- Client Side JS Library: Angular: 1 point
1 + 1 + 1 + 2 + 1 + 1 = 7 -> so if I don't get everything done, I'm good?

## Modules / Concepts
- [Grunt](http://gruntjs.com/) - Automate running the scraping algorithm
- [JSHint / JSLint](http://jshint.com/) - Make sure that the coding style is up to par
- [Parsley](http://parsleyjs.org/) - Client-side form validation library
- [Angular MD](https://material.angularjs.org/latest/) - Enhance to make it responsive and look better
- [Angular.less](https://www.npmjs.com/package/angular-less)
- [Angular.js](https://angularjs.org/) - Client Side Library, use it for routing

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

####Following
- Summmary: Seeing the outfits, styles, and even users that you like compiled in one place
- Rationale: Certain people have similar styles, so it would be nice to be able to search and favorite users. Similarly, it would be nice to follow outfits and styles, ideally to also have a recommendation algorithm that would see what clothing are usually paired together for similar users and suggested. 
- Users: All users
- Preconditions: User is logged in
- Basic Course of Events
  1. User clicks on a style, outfit, or even user page and can add it to following.
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