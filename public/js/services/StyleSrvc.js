'use strict';
app.factory('StyleSrvc', ['$http', 
  function($http){
  
  var createStyle = function(name, id, clothingId){
    return $http.post('/api/style/create', {name: name, id: id, clothes: clothingId}).then(function(res){
      return res;
    });
  };

  var getStyles = function(id){
    return $http.get('/api/style').then(function(res){
      return res;
    });
  };

  var getStyle = function(slug){
    return $http.get('/api/style/' + slug).then(function(res){
      return res;
    });
  };

  var addToStyle = function(styleId, clothingId){
    console.log(styleId, clothingId);
    return $http.post('/api/style/add', {styleId: styleId, clothingId: clothingId}).then(function(res){
      return res;
    });
  };
  
  var removeFromStyle = function(styleId, clothingId){
    return $http.delete('/api/style/remove/' + styleId + '/' + clothingId).then(function(res){
      return res;
    });
  };

  var getStyleCover = function(slug){
    console.log('slug: ', slug);
    
    return $http.get('/api/style/cover/' + slug).then(function(res){
      console.log(res);
      return res.data;
    });
  }

  var commentOnStyle = function(styleId, comment) {
    console.log(styleId, comment);
    return $http.post('/api/style/comment', {styleId: styleId, comment:comment}).then(function(res) {
      return res;
    });
  };

  return {
    createStyle : createStyle,
    getStyles : getStyles,
    getStyle : getStyle,
    getStyleCover : getStyleCover,
    commentOnStyle : commentOnStyle,
    // searchStyles : searchStyles
    addToStyle : addToStyle,
    removeFromStyle : removeFromStyle
  };
}]);
