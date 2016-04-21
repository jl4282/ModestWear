// OutfitCtrl.js
// This is really just copied from Style... but changed to Outfit
/*
  TODO:
    - add OutfitSrvc
*/
app.controller('OutfitCtrl', ['$scope', 'UserSrvc', 'OutfitSrvc', 'Clothing', '$location', '$routeParams',
  function($scope, User, Outfit, Clothing, $location, $routeParams){

  console.log($scope.user);
  console.log("OutfitCtrl --> singular!!");
  console.log("Slug " + $routeParams.slug);

  if ($routeParams.slug && $scope.user){
    //retrieve Outfit from db
    console.log("supposed to be getting outfit");
    Outfit.getOutfit($routeParams.slug).then(function(res){
      $scope.Outfit = res.data;
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

  $scope.toggleInOutfit = function(clothing){
    //check if in Outfit, if clothing is undefined, empty, or within the Outfit

    if ($scope.clothing && (($scope.clothing.length === 0) || (!$scope.inOutfit(clothing._id)))) {
      //not in Outfit - add to it
      Outfit.addToOutfit($scope.Outfit._id, clothing._id).then(function(res){
        $scope.clothing.push(clothing);
      });
    }
    else {
      Outfit.removeFromOutfit($scope.Outfit._id, clothing._id).then(function(res){
        $scope.clothing.splice($scope.clothing.indexOf(clothing), 1);
      });
    }
  };

  $scope.inOutfit = function (clothingId){
    for (var i = 0; i < $scope.clothing.length; i++){
      if ($scope.clothing[i]._id === clothingId){
        return true;
      }
    }
    return false;
  };

  // TODO : WHY DOESNT THIS LOG SCOPE.COMMENT ?
  $scope.comment = function(clothingId, comment) {
    console.log("commenting");
    Outfit.commentOnOutfit(clothingId, comment).then(function(res) {
      console.log("SCOPE.COMMENT", res.comment);
      $scope.Outfit.comment = res.comment;
    });
  }

}]);
