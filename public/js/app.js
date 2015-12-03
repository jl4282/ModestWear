'use strict';
var app = angular.module('ModestWear', ['ngRoute', 'ngMaterial'])
.config(function($mdThemingProvider, $mdIconProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink');
  $mdIconProvider
    .icon('search', '../../../node_modules/material-design-icons/action/svg/production/ic_search_48px.svg')
    .icon('favorite', '../../../node_modules/material-design-icons/action/svg/production/ic_favorite_48px.svg')
    .icon('favorite-border', '../../../node_modules/material-design-icons/action/svg/production/ic_favorite_border_48px.svg')
    .icon('arrow-back', '../../../node_modules/material-design-icons/navigation/svg/production/ic_arrow_back_48px.svg')
    ;
});
