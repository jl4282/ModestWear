app.controller('StylesCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams){

  console.log('styles controller');

  if (!$scope.user){
    $location.path('/');
  }

  $scope.styleClick = function(slug){
    console.log('in clickStyle');
    $location.path('style/'+ slug);
    // TODO : NEED AN API CALL TO POPULATE THE IMAGES 
    // OR WE CAN CHANGE THE STYLES MODEL IN THE DB -> GET THAT WHEN U RETREIVE THE USER OBJ
  };


}]);
