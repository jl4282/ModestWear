app.controller('FavoritesCtrl', ['$scope', 'UserSrvc', '$location', function($scope, User, $location){
  //get all the favorites
  User.getFavorites().then(function(data){
    $scope.favorites = data;
  });
}]);
