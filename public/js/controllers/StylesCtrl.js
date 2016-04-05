app.controller('StylesCtrl', ['$scope', '$location', '$routeParams',
	function($scope, $location, $routeParams){

  console.log('styles controller');
  console.log("In StylesCtrl -> plural!");
  if (!$scope.user){
    $location.path('/');
  }

  $scope.styleClick = function(slug){
    console.log('in clickStyle');
    $location.path('style/'+ slug);
  };

  // $scope.search = function(query) {
  // 	$scope.showSearch = false;
  //   if (query && typeof query === 'String'){
  //     query = query.trim();
  //   }
  //   if (query){
  //     var params = {};
  //     if (query.type){
  //       params.type = query.type;
  //     }
  //     else {
  //       params.description = query;
  //     }
  //     console.log(params);
  //     $location.path('/searchOutfits/').search(params);
  // };

  // $scope.doSearch = function(query) {
  // 	console.log('searching in styles controller');
  // 	$scope.search(
  // 	{
  //     name: 'Outfits',
  //     search: {
  //       type: 'outfit'
  //     }
  //   }
  //     }
  // 	})
  // };



}]);
