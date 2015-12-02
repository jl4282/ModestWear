'use strict';
app.factory('UserSrvc', ['$http', function($http){
  var getUser = function(){
    return $http.get('/api/getUser').then(function(resp){
      return resp.data;
    });
  };
  /* need to figure out how it works with post - not the same... */
  var favorite = function(itemId){
    return $http.post('/api/favorite/' + itemId).then(function(data){
      return data;
    });
  };
  var deleteFav = function(itemId){
    return $http.delete('/api/favorite/' + itemId).then(function(data){
      return data;
    });
  };
  var getFavorites = function(){
    return $http.get('/api/favorites').then(function(res){
      return res.data;
    });
  };
  var logout = function(){
    return $http.get('/logout').then(function(res){
      console.log(res);
      return res.status;
    });
  };
  return {
    favorite : favorite,
    getUser : getUser,
    getFavorites : getFavorites,
    logout: logout,
    deleteFav: deleteFav
  };
}]);
