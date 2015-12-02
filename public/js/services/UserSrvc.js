'use strict';
app.factory('UserSrvc', ['$http', function($http){
  var getUser = function(){
    return $http.get('/api/getUser').then(function(resp){
      console.log(resp.data);
      return resp.data;
    });
  };
  /* need to figure out how it works with post - not the same... */
  var favorite = function(itemId){
    return $http.post('/api/favorite/' + itemId).then(function(data){
      console.log(data);
    });
  };
  return {
    favorite : favorite,
    getUser : getUser
  };
}]);
