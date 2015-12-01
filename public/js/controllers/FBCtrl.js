app.controller('FBCtrl', ['$scope', '$routeParams', '$location', '$http', function($scope, $routeParams, $location, $http){
  console.log('in FBCtrl');
  return $http.get('/api/getUser').then(function(resp){
    $scope.user = resp.data;
    console.log($scope.user);
  });
}]);
