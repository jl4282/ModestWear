app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainCtrl'
        })

        //still need to be implemented
        .when('/search/:query', {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        })
        .when('/outfit/:slug', {
            templateUrl: 'views/outfit.html',
            controller: 'OutfitCtrl'
        })
        .when('/style/:slug', {
            templateUrl: 'views/style',
            controller: 'StyleCtrl'
        })
        .when('/profile/:slug', {
            templateUrl: 'views/profile',
            controller: 'ProfileCtrl'
        })
        .when('/favorites', {
            templateUrl: 'views/favorites',
            controller: 'FavoritesCtrl'
        });

}]);
