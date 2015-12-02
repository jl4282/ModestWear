app.controller('SearchCtrl', ['$scope', 'Clothing', '$routeParams', '$location', function($scope, Clothing, $routeParams, $location){
  $scope.search = function(query){
    Clothing.searchClothing(query).then(function(data){
      $scope.clothes = data;
    });
  };

  if($location.search()){
    $scope.search($location.search());
  }

}]);
