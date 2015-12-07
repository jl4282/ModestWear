app.controller('StyleCtrl', ['$scope', 'UserSrvc', 'StyleSrvc', 'Clothing', '$location', '$routeParams',
  function($scope, User, Style, Clothing, $location, $routeParams){

  console.log($scope.user);
  if ($routeParams.slug && $scope.user){
    //retrieve style from db
    Style.getStyle($routeParams.slug).then(function(res){
      $scope.style = res.data;
      $scope.clothing = res.data.clothes;
    });

    //get favorites for the user
    User.getFavorites().then(function(res){
      $scope.favorites = res;
    });
  }
  else {
    $location.path('/');
  }

  $scope.toggleInStyle = function(clothing){
    //check if in style, if clothing is undefined, empty, or within the style

    if ($scope.clothing && (($scope.clothing.length === 0) || (!$scope.inStyle(clothing._id)))) {
      //not in style - add to it
      Style.addToStyle($scope.style._id, clothing._id).then(function(res){
        $scope.clothing.push(clothing);
      });
    }
    else {
      Style.removeFromStyle($scope.style._id, clothing._id).then(function(res){
        $scope.clothing.splice($scope.clothing.indexOf(clothing), 1);
      });
    }

  };

  $scope.inStyle = function (clothingId){
    for (var i = 0; i < $scope.clothing.length; i++){
      if ($scope.clothing[i]._id === clothingId){
        return true;
      }
    }
    return false;
  };

}]);
