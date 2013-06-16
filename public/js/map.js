var map;
var allMarkers = [];
var addLatlng = [];
var gsuLocation = [33.75317514689363, -84.38607215881348]
map = L.map('map').setView(gsuLocation, 11);
L.control.locate().addTo(map);
var cmk = "315bfb243f9f4e8fb6adc193a7367eeb"
L.tileLayer('http://c.tiles.mapbox.com/v3/examples.map-vyofok3q/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; 2011 OpenStreetMap contributors',
	key: cmk
}).addTo(map);
var g0Icon = L.icon({
	iconUrl: 'images/g0.png',
	// shadowUrl: 'leaf-shadow.png',
	iconSize: [25, 40], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var g1Icon = L.icon({
	iconUrl: 'images/g1.png',
	// shadowUrl: 'leaf-shadow.png',
	iconSize: [25, 40], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var g2Icon = L.icon({
	iconUrl: 'images/g2.png',
	// shadowUrl: 'leaf-shadow.png',
	iconSize: [25, 40], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var g3Icon = L.icon({
	iconUrl: 'images/g3.png',
	// shadowUrl: 'leaf-shadow.png',
	iconSize: [25, 40], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});