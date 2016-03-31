// OutfitsCtrl.js
/* 
	TODO : Dont even know if this is right... 
*/
app.controller('OutfitsCtrl', ['$scope', '$location', '$routeParams', 'OutfitSrvc', function($scope, $location, $routeParams, Outfit){

  // console.log('outfits controller'); 
  // console.log($scope.user);
  if (!$scope.user){
    $location.path('/');
  }

  $scope.outfitClick = function(slug){
    console.log('in clickOutfit');
    $location.path('/outfit/'+ slug);
  };

  // Outfit.getOutfits().then(function(res){
  //   $scope.outfits = res.data;
  //   console.log(res.data);
  // });


}]);
