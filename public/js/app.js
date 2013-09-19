'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngUpload', 'ui.bootstrap']).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/add1', {
		templateUrl: 'page/add1',
		controller: PlaceCtrl
	});
	$routeProvider.when('/add2', {
		templateUrl: 'page/add2',
		controller: PlaceCtrl
	});
	$routeProvider.when('/about', {
		templateUrl: 'page/about',
		controller: AboutCtrl
	});
	$routeProvider.when('/garden/:id', {
		templateUrl: 'page/garden',
		controller: GardenCtrl
	});
	$routeProvider.otherwise({
		redirectTo: '/'
	});
}]);