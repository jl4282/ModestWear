'use strict';
app.factory('User', ['$http', function($http){
  var getUser = function(){
    //get the logged in user
  };
  var favorite = function(itemId){
    $http.get('/api/favorite/' + itemId).success(function(data){});
  };
  return {
    favorite : favorite,
    getUser : getUser
  };
}]);
