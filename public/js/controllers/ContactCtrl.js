// TODO : Make a contact me form

app.controller('ContactCtrl', ['$scope', '$http',
	function($scope, $http){
			$scope.form = {
			name : '',
			email : '',
			comment: ''
		}	
	$scope.submit = function(){
		/* Flow

		TODO: 
		1. deactivate submit button
		2. validate inputs
			a. (if not valid activate button)
			b. show error messages
		3. send message
		4. display message to user saying something...

		*/
		$http.post('/api/contact', $scope.form).then(function(res){
			console.log('sent');

		});	
	};

}]);
