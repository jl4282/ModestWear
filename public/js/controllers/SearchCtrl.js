app.controller('SearchCtrl', ['$scope', 'Clothing', 'OutfitSrvc', 'StyleSrvc','$routeParams', '$location', 
	function($scope, Clothing, Outfit, Style, $routeParams, $location){
  // TODO : Make search also show outfits and styles
  $scope.search = function(query){
    Clothing.searchClothing(query).then(function(data){
      $scope.clothes = data;
    });
  };

  $scope.searchOutfits = function(query) {
  	OutfitSrvc.searchClothing(query).then(function(data){
      $scope.clothes = data;
    });
  }

  if($location.search()){
    $scope.search($location.search());
  }

}]);
