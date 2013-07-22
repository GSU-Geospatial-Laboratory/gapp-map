var map;
var allMarkers = [];
var addLatlng = [];
var gsuLocation = [33.75317514689363, -84.38607215881348]
map = L.map('map').setView(gsuLocation, 11);
L.control.locate().addTo(map);

L.esri.basemapLayer("Topographic").addTo(map);

var g0Icon = L.icon({
	iconUrl: 'images/g0.png',
	// shadowUrl: 'leaf-shadow.png',
	iconSize: [24, 24], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var g0Icon = L.icon({
	iconUrl: 'images/g0.png',
	iconSize: [24, 24], // size of the icon
});
var g1Icon = L.icon({
	iconUrl: 'images/g1.png',
	// shadowUrl: 'leaf-shadow.png',
	iconSize: [24, 24], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var g2Icon = L.icon({
	iconUrl: 'images/g2.png',
	// shadowUrl: 'leaf-shadow.png',
	iconSize: [24, 24], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var g3Icon = L.icon({
	iconUrl: 'images/g3.png',
	// shadowUrl: 'leaf-shadow.png',
	iconSize: [24, 24], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});