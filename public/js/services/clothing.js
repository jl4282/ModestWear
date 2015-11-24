'use strict';
app.factory('Clothing', ['$http', function($http){
  var getClothes = function(){
    $http.get('/api/clothes').success(function(data){
      console.log(data);
    });
  };

  var getClothingBySlug = function(slug){
    $http.get('/api/clothes/' + slug).success(function(data){
      console.log(data);
    });
  };
  var searchClothing = function(query){
    $http.get('/api/clothes/search/' + query).success(function(data){
      console.log(data);
    });
  };
  return {
    getClothes : getClothes,
    getClothingBySlug : getClothingBySlug,
    searchClothing : searchClothing
  };
}]);
