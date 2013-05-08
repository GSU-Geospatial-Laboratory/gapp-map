'use strict';


/* Controllers */

function MapCtrl($scope, $http, $location) {
	$scope.goAdd = function() {

		$location.path('/add1')
	}
	$scope.goAbout = function() {
		$location.path('/about')
	}

	map.on('contextmenu', function(e) {
		//console.log(e)
	})

	$scope.allGardens

	$scope.sendToGarden = function(e, garden) {
		console.log(e, garden)
		map.panTo(e.target._latlng)
		map.setView(e.target._latlng, 15)
		$scope.$apply(function() {
			$location.path('/garden' + garden);
		});
	}
	var value = ''

	$scope.getMarkers = function() {

		$.getJSON('/api/place', function(data) {
			$scope.allGardens = data.data
			$.each(data.data, function(i, val) {
				if (val.loc[0] == undefined) {
					return;
				} else {
					var latlngs = val.loc[0].split(',')
					var latLng = new L.LatLng(parseFloat(latlngs[0]), parseFloat(latlngs[1]))
					allMarkers.push(L.marker(latLng).on('click', function(e) {
						$scope.sendToGarden(e, val._id)
					}).addTo(map))
				}
			})
		})
	}

	$scope.getMarkers()



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
	$scope.goAdd = function() {
		$scope.shouldBeOpen = true;
	}
	$scope.goAbout = function() {
		$location.path('/about')
	}



	$scope.loc = addLatlng
	//console.log($scope.loc)
	//var latLng = map.getCenter()
	//$scope.loc = [latLng.lat, latLng.lng]
	//console.log($scope.loc)

	$scope.open = function() {
		$scope.shouldBeOpen = true;
	};

	$scope.closeOne = function() {
		$scope.shouldBeOpen = false;
		map.on('click', function(e) {
			addLatlng = [e.latlng.lat, e.latlng.lng]
			$scope.$apply(function() {
				$location.path('/add2');
			});
		})

	}
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
		//console.log(content, completed)
		//console.log('yup')
		if (completed && content.length > 0) {
			$scope.response = JSON.parse(content);
			if ($scope.response.url == 'not an image') {
				return;
			} else {
				//	console.log('content: ' + content)
				// Presumed content is a json string!
				//	console.log($scope.response.url)
				$scope.close()
				$scope.getMarkers()
			}
		}
	};
}

function GardenCtrl($scope, $http, $location, $route, $routeParams) {
	$scope.id = $routeParams.id
	$scope.fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + $location.absUrl()
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