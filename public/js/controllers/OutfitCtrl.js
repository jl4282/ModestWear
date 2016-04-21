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
      $scope.outfit = res.data;
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
    console.log("TOGGLING IN OUTFIT");
    console.log($scope.clothing);
    if ($scope.clothing && (($scope.clothing.length === 0) || (!$scope.inOutfit(clothing._id)))) {
      //not in Outfit - add to it
      Outfit.addToOutfit($scope.outfit._id, clothing._id).then(function(res){
        $scope.clothing.push(clothing);
      });
    }
    else {
      Outfit.removeFromOutfit($scope.outfit._id, clothing._id).then(function(res){
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
      // console.log("SCOPE.COMMENT", res.comment);
      if (res.status === 200){
        $scope.outfit.comment = res.data;
      }
    });
  }

  $scope.owner = function(){
    if ($scope.user.outfits.indexOf($scope.outfit)){
      return true;
    }
    return false;
  };

  $scope.deleteOutfit = function(){
    Outfit.deleteOutfit($scope.outfit._id).then(function(res){
      if (res.status === 200){
        // remove style from user
        if ($scope.user.outfits.length >= 1){
          $scope.user.outfits.splice($scope.user.outfits.indexOf($scope.outfit), 1);  
        }
        else {
          $scope.user.outfits = [];
        }
        //redirect to styles page
        $location.path('/outfits');
      }
    });
  };

}]);
