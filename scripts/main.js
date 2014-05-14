var createMap = function () {
	var map = L.map('map').setView([35.302, -85.381], 6);

	// For a list of basemaps see http://leaflet-extras.github.io/leaflet-providers/preview/
	var terrain = L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
		subdomains: 'abcd',
		minZoom: 4,
		maxZoom: 18
	});

	//ESRI Leaflet integration (allows for use of ESRI WMS layers according to TOS)
	var esriImagery = L.esri.basemapLayer('Imagery').addTo(map);
	var esriLabels = L.esri.basemapLayer('ImageryLabels');

	var basemaps = {
		'Terrain': terrain,
		'Satellite': esriImagery
	};

	var overlays = {
		'Labels': esriLabels
	};

	L.easyButton(
		'fa-question-circle', 
    	function (){$('#disclaimer-modal').modal();},
    	'Help!',
    	map
    );
	L.control.scale().addTo(map);
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

var resetLayout = _.debounce( calculateLayout,250 ); // Maximum run of once per 1/4 second for performance

$(document).ready(function () {
	resetLayout();
	createMap();

	$('#disclaimer-modal').modal();

	$('#sidebar').resizable({
		animate: false,
		resize: resetLayout,
		handles: "e, w"
	});
});

// Resize the map based on window and sidebar size
$(window).resize(resetLayout);