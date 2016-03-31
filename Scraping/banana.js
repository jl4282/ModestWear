// Doesn't work
console.log("Calling banana");

importio.init({
        "auth": {
            "userGuid": "6b815f71-dad0-4444-9f13-7722cb955e7c",
            "apiKey": "6b815f71dad044449f137722cb955e7c67564c3554077ea21475c3edc1be85444a760dbe9d1f9cef1b7f9902588ebc0bd676066351c509809cc0b8d8b6b62f34f173f88d2153321a82f6e0e8c6dca02e"
    	},
	"host": "import.io"
});

console.log("Connecting to the auth");


var doQuery = function() {
	console.log("doing the query");
    importio.query({
        "connectorVersionGuid": [
            "1f5bb571-b62e-4fbd-8714-c65651865bf7",
             "5bdf3038-6e3d-4969-9290-7ddf173b7b84",
              "20fca937-15a6-4ce2-ac4b-71f9a1d8d0b3",
              "35d2d147-dd49-43c1-b779-41f7204c8a46",
              "ee7a0038-1094-4549-a46a-8549c5ab272c",
              "72a49146-527b-49dc-b044-45eb19ec8614"
        ]
    });
    
}; 

doQuery();