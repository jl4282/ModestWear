app.controller('FBCtrl', ['$scope', '$routeParams', '$location', '$http', function($scope, $routeParams, $location, $http){
  return $http.get('/api/getUser').then(function(resp){
    $scope.user = resp.data;
  });
}]);
