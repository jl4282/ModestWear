'use strict';
app.controller('MainCtrl', ['$scope', 'Clothing', '$location', function($scope, Clothing, $location){
  // Clothing.searchClothing('winter').then(function(data){
  //   $scope.clothes = data;
  // });
  //
  $scope.search = function(query){
    var params = {};
    if (query.type){
      params.type = query.type;
    }
    else {
      params.description = query;
    }
    $location.path('/search/').search(params);
    Clothing.searchClothing(params).then(function(data){
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
    },
    {
      name: 'Shirts',
      search: {
        type: 'shirt'
      }
    },
    {
      name: 'Dresses',
      search: {
        type: 'dress'
      }
    },
    {
      name: 'Sweaters',
      search: {
        type: 'sweater'
      }
    }
  ];

}]);
