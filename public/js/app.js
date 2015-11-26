'use strict';
var app = angular.module('ModestWear', ['ngRoute', 'ngMaterial'])
.config(function($mdThemingProvider, $mdIconProvider) {
  $mdThemingProvider.theme('default');
  $mdIconProvider.defaultFontSet('material-icons');
});
