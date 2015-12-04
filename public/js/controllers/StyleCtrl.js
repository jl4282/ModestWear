app.controller('StyleCtrl', ['$scope', 'StyleSrvc', 'Clothing', function($scope, Style, Clothing){
  // Style.createStyle('Test Style', $scope.user._id).then(function(res){
  //   if (res.status === 200){
  //     $scope.$parent.user.styles.push(res.data);
  //   }
  //   console.log(res, $scope.$parent.user);
  // });

  console.log($scope.$parent.user.styles);
  // Style.getStyles($scope.$parent.user._id).then(function(res){
  //   console.log(res.data);
  //   $scope.styles = res.data;
  // });

  $scope.hasImage = function(s){
    if (s.clothing){
      Clothing.getClothingById(s.clothing[0]._id).then(function(res){
        if (res.status === 200){
          if (res.images && res.images[0]){
            s.coverImage = res.images[0];
            return true;
          }
          return false;
        }
        else {
          return false;
        }
      });
    }
    return false;
  };
  $scope.getImage = function(s){
    console.log(s.coverImage);
    return s.coverImage;
  };


}]);
