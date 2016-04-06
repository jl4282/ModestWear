app.controller('SearchCtrl', ['$scope', 'Clothing', 'OutfitSrvc', 'StyleSrvc','$routeParams', '$location', 
	function($scope, Clothing, Outfits, Styles, $routeParams, $location){
  // TODO : Make search also show outfits and styles
  $scope.search = function(query){
    // calls all searches
    // TODO: remove from Clothing service and create own service
    // TODO: touch up code here and move to directive or service
    Clothing.searchClothing(query).then(function(data){
      $scope.searchType = query.searchType;
      $scope.clothes = data;
      if (query.searchType === 'outfits'){
        $scope.outfits = $scope.clothes;
        // get cover image of outfits
        for (var i = 0; i < $scope.outfits.length; i ++){
          // TODO: this should be handled server side
          Outfits.getOutfitCover($scope.outfits[i].slug).then(function(data){ // overwriting of cover image
            // find outfit in array
            for (var j = 0; j < $scope.outfits.length; j ++){
              if ($scope.outfits[j].slug === data.slug){
                $scope.outfits[j].coverImage = data.image;
                if (document.getElementById('outfit-' + j)){
                  document.getElementById('outfit-' + j).setAttribute('src', data.image);  
                }
              }
            }
          });
        }
      } //end of outfits if statement
      else if (query.searchType === 'styles'){
        $scope.styles = $scope.clothes;
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
          });
        }
      }
    });
  };

  // $scope.searchOutfits = function(query) {
  // 	OutfitSrvc.searchClothing(query).then(function(data){
  //     $scope.clothes = data;
  //   });
  // }

  if($location.search()){
    $scope.search($location.search());
  }

}]);
