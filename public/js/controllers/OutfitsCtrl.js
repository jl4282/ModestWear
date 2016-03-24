// OutfitsCtrl.js
/* 
	TODO : Dont even know if this is right... 
*/
app.controller('OutfitsCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams){

  console.log('outfits controller');

  if (!$scope.user){
    $location.path('/');
  }

  $scope.styleClick = function(slug){
    console.log('in clickStyle');
    $location.path('outfit/'+ slug);
  };


}]);
