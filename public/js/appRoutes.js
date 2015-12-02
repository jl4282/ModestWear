'use strict';
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        //still need to be implemented
        .when('/search/', {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        })
        .when('/outfit/:slug', {
            templateUrl: 'views/outfit.html',
            controller: 'OutfitCtrl'
        })
        .when('/style/:slug', {
            templateUrl: 'views/style.html',
            controller: 'StyleCtrl'
        })
        // .when('/profile/:slug', {
        //     templateUrl: 'views/profile',
        //     controller: 'ProfileCtrl'
        // })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
        })
        .when('/favorites', {
            templateUrl: 'views/favorites',
            controller: 'FavoritesCtrl'
        })
        .when('/', {
            templateUrl: 'views/home.html'
        })
        //when viewing an article of clothing
        .when('/clothes/:slug', {
            templateUrl: 'views/product.html',
            controller: 'ProductCtrl'
        });
        // home page
    $locationProvider.html5Mode(true);

}]);
