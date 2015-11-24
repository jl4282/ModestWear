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
    return $http.get('/api/clothes/search/' + query).then(function(resp){
      return resp.data;
    });
  };
  return {
    getClothes : getClothes,
    getClothingBySlug : getClothingBySlug,
    searchClothing : searchClothing
  };
}]);
