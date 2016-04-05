app.controller('ProfileCtrl', ['$scope', 'Clothing', 'UserSrvc', '$location', 
	function($scope, Clothing, User, $location){
  
  User.getFavorites().then(function(data){
    $scope.favorites = data;
  });

  // User.getOutfitsFull().then(function(data){
  //   $scope.outfits = data;
  // });

    User.getOutfits().then(function(data){
    $scope.outfits = data;
  });

  User.getStyles().then(function(data){
    $scope.styles = data;
  });

  $scope.logout = function(){
    User.logout().then(function(status){
      if (status === 200){
        $scope.$parent.user = undefined;
        $location.path('/');
      }
    });
  };
}]);
