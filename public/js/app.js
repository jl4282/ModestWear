'use strict';
var app = angular.module('ModestWear', ['ngRoute', 'ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default');
});
