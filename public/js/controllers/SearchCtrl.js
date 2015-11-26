app.controller('SearchCtrl', ['$scope', 'Clothing', '$routeParams', function($scope, Clothing, $routeParams){
  // Clothing.searchClothing('winter').then(function(data){
  //   $scope.clothes = data;
  // });
  //
  console.log('in search ctrl');

  $scope.search = function(query){
    Clothing.searchClothing(query).then(function(data){
      $scope.clothes = data;
    });
  };

  if($routeParams.query){
    $scope.search($routeParams.query);
  }

}]);
