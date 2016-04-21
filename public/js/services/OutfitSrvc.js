// TODO : DONT KNOW IF THIS IS GOOD
// be sure to check what params everything takes
'use strict';
app.factory('OutfitSrvc', ['$http', function($http){
  
  var createOutfit = function(name, id, clothingId){
    console.log("--- in outfit service")
    return $http.post('/api/outfit/create', {name: name, id: id, clothes: clothingId}).then(function(res){
      return res;
    });
  };
  
  var getOutfits = function(id){
    return $http.get('/api/outfits').then(function(res){
      return res;
    });
  };

  var getOutfit = function(slug){
    return $http.get('/api/outfit/' + slug).then(function(res){
      return res;
    });
  };

  var addToOutfit = function(outfitId, clothingId){
    console.log(outfitId, clothingId);
    return $http.post('/api/outfit/add', {outfitId: outfitId, clothingId: clothingId}).then(function(res){
      return res;
    });
  };

  var getOutfitCover = function(slug){    
    return $http.get('api/outfit/cover/' + slug).then(function(res){
      console.log(res);
      return res.data;
    });
  }

  var commentOnOutfit = function(outfitId, comment) {
    console.log(outfitId, comment);
    return $http.post('/api/outfit/comment', {outfitId: outfitId, comment:comment}).then(function(res) {
      console.log(res);
      return res;
    });
  };

  // var searchOutfits = function(query){
  //   console.log("Searching outfits");
  //   var params = {};
  //   console.log(query);
  //   if (query.type){
  //     params.type = query.type;
  //   }
  //   else if (query.description){
  //     params.description = query.description;
  //   }
  //   else if (query.limit){
  //     params.limit = query.limit;
  //   }
  //   else {
  //     params.description = query;
  //   }
  //   return $http.get('/api/searchOutfits', {
  //     params: params
  //   }).then(function(resp){
  //     return resp.data;
  //   });
  // };

  /*
  var removeFromOutfit = function(outfitId, clothingId){
    return $http.delete('/api/outfit/remove/' + outfitId + '/' + clothingId).then(function(res){
      return res;
    });
  };
  */
  
  return {
    createOutfit : createOutfit,
    getOutfits : getOutfits,
    getOutfit : getOutfit,
    addToOutfit : addToOutfit,
    commentOnOutfit : commentOnOutfit,
    // searchOutfits : searchOutfits,
    getOutfitCover : getOutfitCover
    // removeFromOutfit : removeOutfit    
  };
}]);