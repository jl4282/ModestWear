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
        .when('/styles', {
            templateUrl: 'views/styles.html',
            controller: 'StyleCtrl'
        })
        // .when('/styles', {
        //     templateUrl: 'views/styles.html',
        //     controller: 'StylesCtrl'
        // })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
        })
        .when('/favorites', {
            templateUrl: 'views/favorites.html',
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
