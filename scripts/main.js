var createMap = function () {
	var map = L.map('map').setView([35.302, -85.381], 6);

	// For a list of basemaps see http://leaflet-extras.github.io/leaflet-providers/preview/
	var terrain = L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
		subdomains: 'abcd',
		minZoom: 4,
		maxZoom: 18
	}).addTo(map);

	var aerial = L.tileLayer('http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
		attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
		subdomains: '1234'
	});

	var esriImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	});

	var labels = L.tileLayer('http://{s}.tile.stamen.com/toner-labels/{z}/{x}/{y}.png', {
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
		subdomains: 'abcd',
		minZoom: 0,
		maxZoom: 20
	});

	var basemaps = {
		'Terrain': terrain,
		'Imagery': aerial,
		'ESRI Imagery': esriImagery
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

var resetLayout = _.debounce( calculateLayout,250 ); // Maximum run of once per 1/4 second for performance

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