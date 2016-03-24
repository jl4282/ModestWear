app.controller('StylesCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams){

  console.log('styles controller');
  console.log("In StylesCtrl -> plural!");
  if (!$scope.user){
    $location.path('/');
  }

  $scope.styleClick = function(slug){
    console.log('in clickStyle');
    $location.path('style/'+ slug);
  };


}]);
