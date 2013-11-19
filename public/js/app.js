'use strict';

//App declaration, add ngUpload and ngRoute modules.  Also declares routes and templates
angular.module('myApp', ['ngUpload', 'ngRoute']).
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