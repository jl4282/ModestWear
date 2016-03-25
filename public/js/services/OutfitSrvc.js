// TODO : DONT KNOW IF THIS IS GOOD
'use strict';
app.factory('OutfitSrvc', ['$http', function($http){
  /*
  var createOutfit = function(name, id, clothingId){
    return $http.post('/api/outfit/create', {name: name, id: id, clothes: clothingId}).then(function(res){
      return res;
    });
  };
  */

  var getOutfits = function(id){
    return $http.get('/api/outfits').then(function(res){
      return res;
    });
  };
  
  /*
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
  var removeFromOutfit = function(outfitId, clothingId){
    return $http.delete('/api/outfit/remove/' + outfitId + '/' + clothingId).then(function(res){
      return res;
    });
  };
  */
  return {
    /*
    createOutfit : createOutfit,
    getOutfits : getOutfits,
    getOutfit : getOutfit,
    addToOutfit : addToOutfit,
    removeFromOutfit : removeOutfit
    */
    getOutfits : getOutfits
  };
}]);