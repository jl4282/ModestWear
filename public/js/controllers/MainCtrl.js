'use strict';
app.controller('MainCtrl', ['$scope', 'Clothing', 'UserSrvc', '$location', '$http', function($scope, Clothing, User, $location, $http){
  // Clothing.searchClothing('winter').then(function(data){
  //   $scope.clothes = data;
  // });
  //
  //
  if (!$scope.user){
    User.getUser().then(function(data){
      $scope.user = data;
    });
  }
  Clothing.searchClothing({limit: 10}).then(function(data){
    $scope.homeDisplay = data;
  });

  //checks if item is favorited
  $scope.favorited = function(c){
    if ($scope.user){
      return -1 < $scope.user.favorites.indexOf(c._id);
    }
  };

  $scope.search = function(query){
    $scope.showSearch = false;
    if (query && typeof query === 'String'){
      query = query.trim();
    }
    if (query){
      var params = {};
      if (query.type){
        params.type = query.type;
      }
      else {
        params.description = query;
      }
      $location.path('/search/').search(params);
    }
  };

  $scope.favorite = function(id){
    User.favorite(id).then(function(data){
      if (data.status === 200){
        $scope.user.favorites.push(id);
      }
      else {
        console.log('grave error');
      }
    });
  };

  $scope.deleteFav = function(id){
    User.deleteFav(id).then(function(data){
      if (data.status === 200){
        $scope.user.favorites.splice($scope.user.favorites.indexOf(id), 1);
      }
      else {
        console.log('grave error');
      }
    });
  };

  $scope.home = function(){
    $location.path('/');
  };
  $scope.buttons = [
    {
      name: 'Skirts',
      search: {
        type: 'skirt'
      }
    },
    {
      name: 'Shirts',
      search: {
        type: 'shirt'
      }
    },
    {
      name: 'Dresses',
      search: {
        type: 'dress'
      }
    },
    {
      name: 'Sweaters',
      search: {
        type: 'sweater'
      }
    }
  ];

}]);
