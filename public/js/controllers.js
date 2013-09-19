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
	$scope.open = function() {
		$scope.shouldBeOpen = true;
	};

	$scope.close = function() {
		$scope.shouldBeOpen = false;
		$location.path('/')
		$('#map').removeClass("cross");
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
	$scope.needABetterBrowser = false;

	var version = navigator.userAgent.match(/(msie) (\d+)/i);
			if (version != null){
				console.log(version)
			  if (version[version.length-1] < 9){
				$scope.needABetterBrowser = true;
			  }
			}


	$scope.goAdd = function() {
		$scope.shouldBeOpen = true;
	}
	$scope.goAbout = function() {
		$location.path('/about')
	}



	$scope.loc = addLatlng

	$scope.open = function() {
		$scope.shouldBeOpen = true;
	};

	$scope.closeOne = function() {
		$scope.shouldBeOpen = false;
		map.addEventListener('click', function(e) {
			addLatlng = [e.latlng.lat, e.latlng.lng]
			$scope.$apply(function() {
				$location.path('/add2');
			});
		})
		$('#map').addClass("cross");


	}
	$scope.close = function() {
		$scope.shouldBeOpen = false;
		$location.path('/')
		map.removeEventListener('click')
		$('#map').removeClass("cross");

	};

	$scope.opts = {
		backdropFade: true,
		dialogFade: true,
		windowClass: 'modal-scrollable'
		
	};

	$scope.open()


	$scope.type = 'Private Citizen'
	$scope.where = 'Private Residence'

	$scope.closeModal = function() {
		$location.path('/');
	}

	$scope.uploadComplete = function(content, completed) {
		console.log(content, completed)
		if (completed) {
			// $scope.response = JSON.parse(content);
			// if ($scope.response.url == 'not an image') {
			// 	return;
			// } else {
			// 	$scope.close()
			// 	$scope.getMarkers()
			// }
			$scope.close();
			$scope.getMarkers();
		}
	};
}

function GardenCtrl($scope, $http, $location, $route, $routeParams) {
	$scope.id = $routeParams.id
	$scope.fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + $location.absUrl()

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

MapCtrl.$inject = ['$scope','$http', '$location'];
AboutCtrl.$inject = ['$scope','$http', '$location'];
AppCtrl.$inject = ['$scope', '$http'];
PlaceCtrl.$inject = ['$scope','$http', '$location'];
GardenCtrl.$inject = ['$scope','$http', '$location', '$route', '$routeParams'];