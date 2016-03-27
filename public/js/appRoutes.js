'use strict';
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        //still need to be implemented
        .when('/search/', {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        })
        .when('/outfits/', {
            templateUrl: 'views/outfits.html',
            controller: 'OutfitsCtrl'
        })
        // .when('/outfit/:slug', {
        //     templateUrl: 'views/indivOutfit.html',
        //     controller: 'OutfitCtrl'
        // })
        .when('/styles', {
            templateUrl: 'views/styles.html',
            controller: 'StylesCtrl'
        })
        .when('/style/:slug', {
            templateUrl: 'views/indivStyle.html',
            controller: 'StyleCtrl'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
        })
        .when('/favorites', {
            templateUrl: 'views/favorites.html',
            controller: 'FavoritesCtrl'
        })
        //when viewing an article of clothing
        .when('/clothes/:slug', {
            templateUrl: 'views/product.html',
            controller: 'ProductCtrl'
        })
        // home page
        .when('/', {
            templateUrl: 'views/home.html'
        })
        .otherwise({
            templateUrl: 'views/home.html'
        });
    $locationProvider.html5Mode(true);

}]);
