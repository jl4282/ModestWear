app.config('appRoutes', ['$routeProvider', function($routeProvider) {
    $routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/search/:query', {
            templateUrl: 'views/search.html',
            controller: 'SearchController'
        });

}]);
