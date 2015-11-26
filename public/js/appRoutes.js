'use strict';
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        //still need to be implemented
        .when('/search/:query?', {
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
        })
        .when('/', {
            templateUrl: 'views/home.html'
        });
        // home page
    $locationProvider.html5Mode(true);

}]);
