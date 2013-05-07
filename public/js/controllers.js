'use strict';


/* Controllers */

function MapCtrl($scope, $http, $location) {
	$scope.goAdd = function() {
		$location.path('/add')
	}
	$scope.goAbout = function() {
		$location.path('/about')
	}

	$scope.allGardens

	$scope.sendToGarden = function(e,garden) {
		map.setView(e.target._latlng, 15)
		$scope.$apply(function() {
			$location.path('/garden' + garden);
		});
	}
	var value = ''

	$.getJSON('/api/place', function(data) {
//		console.log(data.data)
		$scope.allGardens = data.data
		$.each(data.data, function(i, val) {
//			console.log(val.loc[0])
			if (val.loc[0] == undefined) {
				return;
			} else {
				var latlngs = val.loc[0].split(',')
				var latLng = new L.LatLng(parseFloat(latlngs[0]), parseFloat(latlngs[1]))
		//		console.log(latLng)
				L.marker(latLng).on('click', function(e) {
					$scope.sendToGarden(e, val._id)
				}).addTo(map)
			}
		})
	})



}

function AboutCtrl($scope, $http, $location) {
	$scope.open = function() {
		$scope.shouldBeOpen = true;
	};

	$scope.close = function() {
		$scope.shouldBeOpen = false;
		$location.path('/')
	};

	$scope.items = ['item1', 'item2'];

	$scope.opts = {
		backdropFade: true,
		dialogFade: true
	};

	$scope.open()
}

function AppCtrl($scope, $http) {
	$http({
		method: 'GET',
		url: '/api/name'
	}).
	success(function(data, status, headers, config) {
		$scope.name = data.name;
	}).
	error(function(data, status, headers, config) {
		$scope.name = 'Error!'
	});
}

function PlaceCtrl($scope, $http, $location) {

	var latLng = map.getCenter()
	$scope.loc = [latLng.lat, latLng.lng]
	console.log($scope.loc)

	$scope.open = function() {
		$scope.shouldBeOpen = true;
	};

	$scope.close = function() {
		$scope.shouldBeOpen = false;
		$location.path('/')
	};

	$scope.opts = {
		backdropFade: true,
		dialogFade: true
	};

	$scope.open()


	$scope.type = 'Private Citizen'

	$scope.results = function(content, completed) {
		if (completed && content.length > 0) console.log(content); // process content
		else {
			// 1. ignore content and adjust your model to show/hide UI snippets; or
			// 2. show content as an _operation progress_ information
		}
	}

	$scope.closeModal = function() {
		$location.path('/');
	}

	$scope.uploadComplete = function(content, completed) {
		console.log(content, completed)
		//console.log('yup')
		if (completed && content.length > 0) {
			console.log('content: ' + content)
			$scope.response = JSON.parse(content); // Presumed content is a json string!
			console.log($scope.response.url)
			$scope.close()
		}
	};
}

function GardenCtrl($scope, $http, $location, $route, $routeParams) {
	$scope.id = $routeParams.id
	//console.log($scope.allGardens)

	$scope.open = function() {
		$scope.shouldBeOpen = true;
	};

	$scope.close = function() {
		$scope.shouldBeOpen = false;
		$location.path('/')
	};

	$scope.getClass = function(value) {
		if (value) {
			return 'icon-check icon-large'
		} else {
			return 'icon-check-empty icon-large'
		}
	}

	$scope.thisGarden = _.findWhere($scope.allGardens, {
		_id: $scope.id
	})
	$scope.imageUrl = ''
	if ($scope.thisGarden.image != null) {
		$scope.imageUrl = 'https://s3.amazonaws.com/gapp-map/' + $scope.thisGarden.image
	}

	$scope.opts = {
		backdropFade: true,
		dialogFade: true
	};

	$scope.open()
}


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {}
MyCtrl2.$inject = [];