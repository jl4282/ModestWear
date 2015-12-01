var request = require("request");
var secrets = require("../secrets");

exports.getReqString = function(url){

  var obj = {
    url: url,
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
  fullUrl = "https://api.import.io/store/connector/_magic?" + str;

  request(fullUrl, function(error, response, body) {
    console.log(body);
  });
  return fullUrl;
};

// exports.getReqString("http://www.koshercasual.com/category.asp?id=364");
