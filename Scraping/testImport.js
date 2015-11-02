var request = require("request");
var secrets = require("../secrets");

// convert this string into separate values, and then URL encode it
//
// request("https://api.import.io/store/connector/_magic?url=http%3A%2F%2Fwww.koshercasual.com%2Fcategory.asp%3Fid%3D364&format=JSON&js=false&_apikey=a9488480e62849b6b5c947c9fbc9d2c9073047faf1fffc82395c39775afe5d9459e590aadf98d262939f0d8718faf662f363ae0ace58a6d60855f54a5e17d74984fe0ef0ae4473448fab50c6c7c95bf1", function(error, response, body) {
//   console.log(body);
// });


var obj = {
  url: "http://www.koshercasual.com/category.asp?id=364",
  format: "JSON",
  js: false,
  _apikey: secrets.importIo
};

// console.log(obj);

var str = '';
for (var key in obj) {
    if (str != "") {
        str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
}

var fullURL = "https://api.import.io/store/connector/_magic?" + str;
request(fullURL, function(error, response, body) {
  console.log(body);
});
