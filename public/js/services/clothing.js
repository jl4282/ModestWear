'use strict';
app.factory('Clothing', ['$http', function($http){
  var getClothes = function(){
    return $http.get('/api/clothes').then(function(resp){
      return resp.data;
    });
  };

  var getClothingBySlug = function(slug){
    console.log('slug',slug);
    return $http.get('/api/clothes/' + slug).then(function(resp){
      return resp.data;
    });
  };
  var searchClothing = function(query){
    var params = {};
    if (query.type){
      params.type = query.type;
    }
    else if (query.description){
      params.description = query.description;
    }
    else if (query.limit){
      params.limit = query.limit;
    }
    else {
      params.description = query;
    }
    console.log('params',params);
    return $http.get('/api/search', {
      params: params
    }).then(function(resp){
      return resp.data;
    });
  };
  return {
    getClothes : getClothes,
    getClothingBySlug : getClothingBySlug,
    searchClothing : searchClothing
  };
}]);
