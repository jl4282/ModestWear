app.controller('ProductCtrl', ['$scope', 'Clothing', '$routeParams', function($scope, Clothing, $routeParams){
  // $scope.search($routeParams.slug);
  // console.log($routeParams.slug);
  Clothing.getClothingBySlug($routeParams.slug).then(function(data){
    $scope.product = data;
    $scope.featuredImage = data.images[0];
  });
}]);
