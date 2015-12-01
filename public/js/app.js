'use strict';
var app = angular.module('ModestWear', ['ngRoute', 'ngMaterial'])
.config(function($mdThemingProvider, $mdIconProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink');
  $mdIconProvider.defaultFontSet('material-icons');
});
