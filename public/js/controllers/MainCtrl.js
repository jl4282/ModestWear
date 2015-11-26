'use strict';
app.controller('MainCtrl', ['$scope', 'Clothing', '$location', function($scope, Clothing, $location){
  // Clothing.searchClothing('winter').then(function(data){
  //   $scope.clothes = data;
  // });
  //
  $scope.search = function(query){
    if ($location.path().search('search') < 0){
      $location.path('/search');
    }
    Clothing.searchClothing(query).then(function(data){
      $scope.clothes = data;
    });
  };

  $scope.home = function(){
    $location.path('/');
  };
  $scope.buttons = [
    {
      name: 'Skirts',
      search: {
        type: 'skirt'
      }
    }
  ];

}]);
