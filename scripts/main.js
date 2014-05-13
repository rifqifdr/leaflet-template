var createMap = function () {
	var map = L.map('map').setView([35.302, -85.381], 6);

	// For a list of basemaps see http://leaflet-extras.github.io/leaflet-providers/preview/
	var terrain = L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
	}).addTo(map);

	var aerial = L.tileLayer('http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
		attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
		subdomains: '1234'
	});

	var labels = L.tileLayer('http://a{s}.acetate.geoiq.com/tiles/acetate-labels/{z}/{x}/{y}.png', {
		attribution: '&copy;2012 Esri & Stamen, Data from OSM and Natural Earth',
		subdomains: '0123',
		minZoom: 2,
		maxZoom: 18
	});

	var basemaps = {
		'Terrain': terrain,
		'Imagery': aerial
	};

	var overlays = {
		'Labels': labels
	};

	L.control.scale({'position': 'bottomright'}).addTo(map);
	L.control.layers(basemaps, overlays).addTo(map);
};

var calculateLayout = function (e) {
	var map = $('#map'),
		sidebar = $('#sidebar'),
		win = $(window),
		header = $('header'),
		footer = $('footer');

		map.width( win.width() - sidebar.width() );
		map.height( win.height() - header.height() - footer.height() );
		sidebar.height( win.height() - header.height() - footer.height() );
};

var resetLayout = _.debounce( calculateLayout,500); // Maximum run of once per 1/2 second for performance

$(document).ready(function () {
	resetLayout();
	createMap();

	$('#disclaimer-modal').modal();

	$('#sidebar').resizable({
		animate: false,
		resize: resetLayout 
	});
});

// Resize the map based on window and sidebar size
$(window).resize(resetLayout);