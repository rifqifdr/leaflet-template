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

	// Instantiate sidebar
    var sidebar = L.control.sidebar('sidebar', {
	    position: 'left'
	}).addTo(map);

	setTimeout(function () {
	    sidebar.show();
	}, 500);

	// Add native looking Leaflet buttons with Font Awesome icons
	L.easyButton(
		'fa-question-circle', 
    	function (){$('#disclaimer-modal').modal();},
    	'Help!',
    	map
    );

    L.easyButton(
		'fa-list', 
    	function (){sidebar.toggle();},
    	'Toggle Sidebar',
    	map
    );

	L.control.scale().addTo(map);
	L.control.layers(basemaps, overlays).addTo(map);
};

var calculateLayout = function (e) {
	var map = $('#map'),
		sidebar = $('#sidebar'),
		sideTitle = $('.sidebar-title'),
		sideContent = $('.sidebar-content'),
		win = $(window),
		header = $('header'),
		footer = $('footer');

		map.height( win.height() - header.height() - footer.height() );
		sidebar.height( win.height() - header.height() - footer.height() -50 );
		//sideContent.height( win.height() - sideContent.offset().top - 100 );
};

var resetLayout = _.debounce( calculateLayout,250 ); // Maximum run of once per 1/4 second for performance

$(document).ready(function () {
	resetLayout();
	createMap();

	$('#disclaimer-modal').modal();


});

// Resize the map based on window and sidebar size
$(window).resize(resetLayout);