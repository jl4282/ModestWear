app.controller('FavoritesCtrl', ['$scope', 'UserSrvc', '$location', function($scope, User, $location){
  //get all the favorites

  if (!$scope.user){
    $location.path('/');
  }

  User.getFavorites().then(function(data){
    $scope.favorites = data;
  });
}]);
