'use strict';
app.controller('MainCtrl', ['$scope', 'Clothing', function($scope, Clothing){
  // Clothing.searchClothing('winter').then(function(data){
  //   $scope.clothes = data;
  // });

  $scope.search = function(query){
    Clothing.searchClothing(query).then(function(data){
      $scope.clothes = data;
    });
  };
}]);
