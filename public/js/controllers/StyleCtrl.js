app.controller('StyleCtrl', ['$scope', 'StyleSrvc', 'Clothing', '$location', $routeParams, function($scope, Style, Clothing, $location, $routeParams){

  console.log($scope.$parent.user.styles);

  if ($routeParams.slug){
    //retrieve style from db
    Style.getStyle($routeParams.slug).then(function(res){

    });
  }


}]);
