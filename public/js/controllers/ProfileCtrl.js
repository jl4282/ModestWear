app.controller('ProfileCtrl', ['$scope', 'Clothing', 'UserSrvc', '$location', 'OutfitSrvc', 'StyleSrvc',
	function($scope, Clothing, User, $location, Outfits, Styles){
  
  if (!$scope.user){
  	$location.path('/');
  }

  User.getFavorites().then(function(data){
    $scope.favorites = data;
  });

  // User.getOutfitsFull().then(function(data){
  //   $scope.outfitsFull = data;
  // });

  User.getOutfits().then(function(data){
    $scope.outfits = data;
    // console.log('outfits', $scope.outfits);
    for (var i = 0; i < $scope.outfits.length; i ++){
      Outfits.getOutfitCover($scope.outfits[i].slug).then(function(data){ // overwriting of cover image
        // find outfit in array
        for (var j = 0; j < $scope.outfits.length; j ++){
          if ($scope.outfits[j].slug === data.slug){
            $scope.outfits[j].coverImage = data.image;
            // console.log($scope.outfits[j].coverImage);
            if (document.getElementById('outfit-' + j)){
              document.getElementById('outfit-' + j).setAttribute('src', data.image);  
            }
          }
        }
      });
    }
  });

  User.getStyles().then(function(data){
    $scope.styles = data;
    console.log('styles', $scope.styles);
    for (var i = 0; i < $scope.styles.length; i ++){
      Styles.getStyleCover($scope.styles[i].slug).then(function(data){ // overwriting of cover image
        // find outfit in array
        for (var j = 0; j < $scope.styles.length; j ++){
          if ($scope.styles[j].slug === data.slug){
            $scope.styles[j].coverImage = data.image;
            // console.log($scope.outfits[j].coverImage);
            if (document.getElementById('style-' + j)){
              document.getElementById('style-' + j).setAttribute('src', data.image);  
            }
          }
        }
        console.log($scope.styles);
      });
    }
  });

  // User.getStyleCover().then(function(data) {
  //   $scope.outfitsFull = data;
  // });

  $scope.logout = function(){
    User.logout().then(function(status){
      if (status === 200){
        $scope.$parent.user = undefined;
        $location.path('/');
      }
    });
  };
}]);
