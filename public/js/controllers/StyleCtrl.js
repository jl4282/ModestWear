app.controller('StyleCtrl', 'UserSrvc', ['$scope', 'StyleSrvc', 'Clothing', '$location', $routeParams, function($scope, User, Style, Clothing, $location, $routeParams){

  console.log($scope.$parent.user.styles);

  if ($routeParams.slug){
    //retrieve style from db
    Style.getStyle($routeParams.slug).then(function(res){
      console.log('response', res);
    });

    //get favorites for the user
    User.getFavorites().then(function(res){
      $scope.favorites = res;
    });
  }


}]);
