'use strict';

/* Controllers */

function MapCtrl($scope, $http, $location) {
	$scope.goAdd = function() {
		$location.path('/add1');
	};

	$scope.goAbout = function() {
		$location.path('/about')
	};

	$scope.downloadData = function() {
		location.href = 'download/data.csv';
		$location.path('/');
		$('#map').removeClass("cross");
	};

	map.on('contextmenu', function(e) {
		//console.log(e)
	})

	$scope.allGardens

	$scope.sendToGarden = function(e, garden) {
		map.panTo(e.target._latlng)
		map.setView(e.target._latlng, 15)
		$scope.$apply(function() {
			$location.path('/garden/' + garden);
		});
	}
	var value = ''

	$scope.getMarkers = function() {

		$.getJSON('/api/place', function(data) {
			// console.log(data)
			$scope.allGardens = data.data
			$.each(data.data, function(i, val) {
				if (val.loc[0] == undefined) {
					return;
				} else {
					var greenLevel = 0;
					var currentIcon;
					greenLevel += val.habitat ? 1 : 0;
					greenLevel += val.foodSource ? 1 : 0;
					greenLevel += val.noPesticides ? 1 : 0;
					switch (greenLevel) {
						case 0:
							currentIcon = g0Icon;
							break;
						case 1:
							currentIcon = g1Icon;
							break;
						case 2:
							currentIcon = g2Icon;
							break;
						case 3:
							currentIcon = g3Icon;
							break;
					}
					var latlngs = val.loc
					var latLng = new L.LatLng(parseFloat(latlngs[0]), parseFloat(latlngs[1]))
					allMarkers.push(L.marker(latLng, {
						icon: currentIcon
					}).on('click', function(e) {
						$scope.sendToGarden(e, val._id)
					}).addTo(map))

				}
			})
		})
	}
	$scope.getMarkers()



}

function AboutCtrl($scope, $http, $location) {
	$('#aboutModal').modal('show')
	$('#aboutModal').on('hide.bs.modal', function() {
		$location.path('/');
		$scope.$apply();
	})
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

function PlaceCtrl($scope, $http, $location, $timeout) {
	$scope.needABetterBrowser = false;

	var version = navigator.userAgent.match(/(msie) (\d+)/i);
	if (version !== null) {
		console.log(version);
		if (version[version.length - 1] < 9) {
			$scope.needABetterBrowser = true;
		}
	}

	$scope.loc = addLatlng;

	var path = $location.path();

	if (path === '/add1') {
		$('.collapse').collapse('hide')
		$('#add1Modal').modal('show');
		$('#add1Modal').on('hide.bs.modal', function() {
			map.addEventListener('click', function(e) {
				addLatlng = [e.latlng.lat, e.latlng.lng];
				$location.path('/add2');
				$scope.$apply();
			});
			$('#map').addClass("cross");
		});
	}

	if (path === '/add2') {
		map.removeEventListener('click')
		$('#map').removeClass("cross");
		$('#add2Modal').modal('show');
		$('#add2Modal').on('hidden.bs.modal', function() {
			$location.path('/');
			$scope.$apply();
		});

	}

	$scope.type = 'Private Citizen';
	$scope.where = 'Private Residence';

	$scope.uploadComplete = function(content, completed) {
		console.log(content, completed);
		if (completed) {
			$('#add2Modal').modal('hide');
			$timeout(($scope.getMarkers), 500)
		}
	}
}

function GardenCtrl($scope, $http, $location, $route, $routeParams) {
	$('#gardenModal').modal('show')
	$('#gardenModal').on('hide.bs.modal', function() {
		$location.path('/');
		$scope.$apply();
	})

	$scope.id = $routeParams.id
	$scope.fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + $location.absUrl()

	$scope.getClass = function(value) {
		if (value) {
			return 'glyphicon glyphicon-check'
		} else {
			return 'glyphicon glyphicon-unchecked'
		}
	}

	$scope.thisGarden = _.findWhere($scope.allGardens, {
		_id: $scope.id
	})
	$scope.imageUrl = ''
	if ($scope.thisGarden.image != null) {
		$scope.imageUrl = 'https://s3.amazonaws.com/gapp-map/' + $scope.thisGarden.image
	}
}

MapCtrl.$inject = ['$scope', '$http', '$location'];
AboutCtrl.$inject = ['$scope', '$http', '$location'];
AppCtrl.$inject = ['$scope', '$http'];
PlaceCtrl.$inject = ['$scope', '$http', '$location', '$timeout'];
GardenCtrl.$inject = ['$scope', '$http', '$location', '$route', '$routeParams'];