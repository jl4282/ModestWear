var request = require("request");

// convert this string into separate values, and then URL encode it
//
request("https://api.import.io/store/connector/_magic?url=http%3A%2F%2Fwww.koshercasual.com%2Fcategory.asp%3Fid%3D364&format=JSON&js=false&_apikey=", function(error, response, body) {
  console.log(body);
});
