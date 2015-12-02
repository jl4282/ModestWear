app.controller('ProfileCtrl', ['$scope', 'Clothing', 'UserSrvc', '$location', function($scope, Clothing, User, $location){

  console.log($scope.user);
  $scope.logout = function(){
    User.logout().then(function(status){
      if (status === 200){
        $scope.$parent.user = undefined;
        $location.path('/');
      }
    });
  };
}]);
