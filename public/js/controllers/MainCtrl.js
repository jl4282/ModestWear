'use strict';
// TODO : Add OutfitSrvc
app.controller('MainCtrl', ['$scope', 'Clothing', 'UserSrvc', 'StyleSrvc', 'OutfitSrvc', '$location', '$http', '$mdDialog', 
  function($scope, Clothing, User, Style, Outfit, $location, $http, $mdDialog){
  // Clothing.searchClothing('winter').then(function(data){
  //   $scope.clothes = data;
  // });
  //
  //
  console.log("In MainCtrl");

  this.openMenu = function($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  if (!$scope.user){
    User.getUser().then(function(data){
      $scope.user = data;
    });
  }
  Clothing.searchClothing({limit: 10}).then(function(data){
    $scope.homeDisplay = data;
  });

  //checks if item is favorited
  $scope.favorited = function(id){
    if ($scope.user && $scope.user.favorites){
      return -1 < $scope.user.favorites.indexOf(id);
    }
  };

  $scope.search = function(query){
    $scope.showSearch = false;
    if (query && typeof query === 'String'){
      query = query.trim();
    }
    if (query){
      var params = {};
      if (query.type){
        params.type = query.type;
      }
      else {
        params.description = query;
      }
      params.searchType = $scope.searchRadio[$scope.searchType].value;
      console.log(params);
      $location.path('/search/').search(params);
    }
  };

  // $scope.searchOutfits = function(query){
  //   console.log("searching outfits");
  //   $scope.showSearch = false;
  //   if (query && typeof query === 'String'){
  //     query = query.trim();
  //   }
  //   if (query){
  //     var params = {};
  //     if (query.type){
  //       params.type = query.type;
  //     }
  //     else {
  //       params.description = query;
  //     }
  //     console.log(params);
  //     $location.path('/searchOutfits/').search(params);
  //   }
  // };

  $scope.favorite = function(id){
    if (!$scope.user){

    }
    else {
      User.favorite(id).then(function(data){
        if (data.status === 200){
          $scope.user.favorites.push(id);
        }
        else {
          console.log('grave error');
        }
      });
    }
  };

  $scope.toggleInStyle = function(clothing, style){
    //check if in style, if clothing is undefined, empty, or within the style

    if (style.clothes && ((style.clothes.indexOf(clothing._id) < 0) || (style.clothes.length === 0))) {
      //not in style - add to it
      Style.addToStyle(style._id, clothing._id).then(function(res){
        style.clothes.push(clothing._id);
      });
    }
    else {
      Style.removeFromStyle(style._id, clothing._id).then(function(res){
        style.clothes.splice(style.clothes.indexOf(clothing._id), 1);
      });
    }
  };

  $scope.toggleInOutfit = function(clothing, outfit){
    //check if in style, if clothing is undefined, empty, or within the style

    if (outfit.clothes && ((outfit.clothes.indexOf(clothing._id) < 0) || (outfit.clothes.length === 0))) {
      //not in style - add to it
      Outfit.addToOutfit(outfit._id, clothing._id).then(function(res){
        outfit.clothes.push(clothing._id);
      });
    }
    else {
      Outfit.removeFromOutfit(outfit._id, clothing._id).then(function(res){
        outfit.clothes.splice(outfit.clothes.indexOf(clothing._id), 1);
      });
    }
  };

  $scope.inStyle = function(cid, clothes){
    return (clothes && clothes.length > 0)? clothes.indexOf(cid) > -1 : false;
  };

  $scope.inOutfit = function(cid, clothes){
    return (clothes && clothes.length > 0)? clothes.indexOf(cid) > -1 : false;
  };


  $scope.deleteFav = function(id){
    User.deleteFav(id).then(function(data){
      if (data.status === 200){
        $scope.user.favorites.splice($scope.user.favorites.indexOf(id), 1);
      }
      else {
        console.log('grave error');
      }
    });
  };

  $scope.openCreateStyle = function(clothingId){
    $scope.temp = clothingId; //ik ik bad practice but i can't figure out how else to do it -.-
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,
      preserveScope: true,
      controller: DialogController,
      templateUrl: 'views/createStyleModal.html'
    });
    function DialogController($scope, $http, StyleSrvc, $mdDialog){
      $scope.closeDialog = function() {
        $mdDialog.hide();
      };
      $scope.createStyle = function(name) {
        StyleSrvc.createStyle(name, $scope.user._id, [$scope.temp]).then(function(res){
          if (res.status === 200){
            console.log(res.data);
            $scope.user.styles.push(res.data);
          }
          else {
            console.log('grave error. could not create style');
          }
          $mdDialog.hide();
        });
      };
    }
  };

  $scope.openCreateOutfit = function(clothingId){
    console.log("creating new outfit -> in main ctrl");
    console.log(clothingId);
    $scope.temp = clothingId; 
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,
      preserveScope: true,
      controller: DialogController,
      // todo -> createOutfitModal
      templateUrl: 'views/createOutfitModal.html'
    });
    function DialogController($scope, $http, OutfitSrvc, $mdDialog){
      $scope.closeDialog = function() {
        $mdDialog.hide();
      };
      $scope.createOutfit = function(name) {
        // TODO : How do we debug that?
        console.log("trying to create an outfit");
        OutfitSrvc.createOutfit(name, $scope.user._id, [$scope.temp]).then(function(res){
          console.log("did I create?");
          if (res.status === 200){
            console.log(res.data);
            // TODO : OUTFIT or OUTFITS?
            $scope.user.outfits.push(res.data);
          }
          else {
            console.log('grave error. could not create outfit');
          }
          $mdDialog.hide();
        });
      };
    }
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
    }
  ];

  $scope.searchType = 0;

  /*
  add in different search options:
    * regular
    * outfits
    * styles
  */
  $scope.searchRadio = [
    {
      name : 'Clothes',
      value : 'clothing'
    },
    {
      name : 'Outfits',
      value : 'outfits'
    },
    {
      name : 'Styles',
      value : 'styles'
    }
  ];

}]);
