var map, 
	allMarkers = [],
	addLatlng = [];
var gsuLocation = [33.75317514689363, -84.38607215881348]
map = L.map('map').setView(gsuLocation, 11);
L.control.locate().addTo(map);

L.esri.basemapLayer("Topographic").addTo(map);

var g0Icon = L.icon({
	iconUrl: 'images/g0.png',
	iconSize: [24, 24], // size of the icon
	iconAnchor: [0,0], // point of the icon which will correspond to marker's location
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var g1Icon = L.icon({
	iconUrl: 'images/g1.png',
	iconSize: [24, 24], // size of the icon
	iconAnchor: [0,0], // point of the icon which will correspond to marker's location
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var g2Icon = L.icon({
	iconUrl: 'images/g2.png',
	iconSize: [24, 24], // size of the icon
	iconAnchor: [0,0], // point of the icon which will correspond to marker's location
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var g3Icon = L.icon({
	iconUrl: 'images/g3.png',
	iconSize: [24, 24], // size of the icon
	iconAnchor: [0,0], // point of the icon which will correspond to marker's location
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});