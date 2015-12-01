'use strict';
app.factory('UserSrvc', ['$http', function($http){
  var getUser = function(){
    return $http.get('/api/getUser').then(function(resp){
      console.log(resp.data);
      return resp.data;
    });
  };
  var favorite = function(itemId){
    $http.get('/api/favorite/' + itemId).success(function(data){});
  };
  return {
    favorite : favorite,
    getUser : getUser
  };
}]);
