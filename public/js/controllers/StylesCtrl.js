app.controller('StylesCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams){

  console.log('styles controller');

  $scope.styleClick = function(slug){
    console.log('in clickStyle');
    $location.path('style/'+ slug);
  };


}]);
