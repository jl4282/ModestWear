'use strict';
app.factory('User', ['$http', function($http){
  var favorite = function(item){
    $http.get('/api/favorite/' + item).success(function(data){});
  };
  return {
    favorite : favorite
  };
}]);
