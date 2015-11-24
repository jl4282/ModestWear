app.factory('Clothing', ['$http', function($http){
  var getClothes = function(){
    $http.get('http://localhost:3000/api/getClothes').success(function(data){
      console.log(data);
    });
  };

  var getClothingBySlug = function(slug){
    $http.get('http://localhost:3000/api/getClothes/' + slug).success(function(data){
      console.log(data);
    });
  };
  var searchClothing = function(query){
    $http.get('http://localhost:3000/api/getClothes/search/' + query).success(function(data){
      console.log(data);
    });
  };
  return {
    getClothes : getClothes,
    getClothingBySlug : getClothingBySlug,
    searchClothing : searchClothing
  };
}]);
