app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainCtrl'
        })
        .when('/search/:query', {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        });

}]);
