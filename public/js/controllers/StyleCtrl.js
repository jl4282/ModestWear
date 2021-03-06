app.controller('StyleCtrl', ['$scope', 'UserSrvc', 'StyleSrvc', 'Clothing', '$location', '$routeParams',
  function($scope, User, Style, Clothing, $location, $routeParams){

  console.log($scope.user);
  console.log("StyleCtrl --> singular!!");
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

  $scope.owner = function(){
    if ($scope.user.styles.indexOf($scope.style)){
      return true;
    }
    return false;
  };

  $scope.deleteStyle = function(){
    Style.deleteStyle($scope.style._id).then(function(res){
      if (res.status === 200){
        // remove style from user
        if ($scope.user.styles.length >= 1){
          $scope.user.styles.splice($scope.user.styles.indexOf($scope.style), 1);  
        }
        else {
          $scope.user.styles = [];
        }
        //redirect to styles page
        $location.path('/styles');
      }
    });
  };

  $scope.comment = function(clothingId, comment) {
    Style.commentOnStyle(clothingId, comment).then(function(res){
      if (res.status === 200){
        $scope.style.comment = res.data;
      }
    });

  }

}]);
