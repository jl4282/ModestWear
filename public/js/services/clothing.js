'use strict';
app.factory('Clothing', ['$http', function($http){
  var getClothes = function(){
    return $http.get('/api/clothes').then(function(resp){
      return resp.data;
    });
  };

  var getClothingBySlug = function(slug){
    return $http.get('/api/clothes/' + slug).then(function(resp){
      return resp.data;
    });
  };
  var searchClothing = function(query){
    var params = {};
    if (query.type){
      params.type = query.type;
    }
    else {
      params.description = query;
    }
    console.log(params);
    return $http.get('/api/search', {
      params: params
    }).then(function(resp){
      console.log(resp.data.length);
      return resp.data;
    });
  };
  return {
    getClothes : getClothes,
    getClothingBySlug : getClothingBySlug,
    searchClothing : searchClothing
  };
}]);
