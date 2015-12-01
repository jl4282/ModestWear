app.controller('SearchCtrl', ['$scope', 'Clothing', '$routeParams', '$location', function($scope, Clothing, $routeParams, $location){
  // Clothing.searchClothing('winter').then(function(data){
  //   $scope.clothes = data;
  // });
  //
  $scope.search = function(query){
    Clothing.searchClothing(query).then(function(data){
      $scope.clothes = data;
    });
  };
  if($location.search()){
    $scope.search($location.search());
  }

}]);
