'use strict';
app.controller('MainCtrl', ['$scope', 'Clothing', function($scope, Clothing){
  Clothing.searchClothing('winter');
}]);
