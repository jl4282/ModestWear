app.factory('Clothing', ['$http', function($http){
  var getClothes = function(){
    $http.get('/api/getClothes').success(function(data){
      console.log(data);
    });
  };

  var getClothingBySlug = function(slug){
    $http.get('/api/getClothes/' + slug).success(function(data){
      console.log(data);
    });
  };
  var searchClothing = function(query){
    $http.get('/api/getClothes/search/' + query).success(function(data){
      console.log(data);
    });
  };
  return {
    getClothes : getClothes,
    getClothingBySlug : getClothingBySlug,
    searchClothing : searchClothing
  };
}]);
