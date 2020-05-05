// Latitude du centre de la carte
var mapCenterLat = 36;

// Longitude du centre de la carte
var mapCenterLong = -9.406667;

// niveau du zoom sur la carte
var zoom = 5;

var initLat;
	var map;
var initLng;
var point;
var marker;
var flightPlanCoordinates;
var lineSymbol = {
          path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          scale: 3
        };
// initialise et affiche la carte
window.onload = function initMap() {
	var center;
	

	center = {lat: mapCenterLat, lng: mapCenterLong}

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: zoom,
		center: center,
		styles: mapStyle
	});


	initLat = 38.703744;
	initLng = -9.421158;

	var markerImage = new google.maps.MarkerImage('img/bateau.gif',
        new google.maps.Size(100, 100),
        new google.maps.Point(0, 0),
        new google.maps.Point(50, 80));

    point = {lat: initLat, lng: initLng};
	marker = new google.maps.Marker({
		position: point,
		map: map,
		icon: markerImage,
	});



    startAnimation();
}


var j = 1;
var distanceTot = 0
var points;
var routes = [];
flightPlanCoordinates = [
		{lat: 38.703744, lng: -9.421158},
		{lat: 33.056064, lng: -16.333745},
		{lat: 28.471083, lng: -16.250288},
		{lat: 28.122381, lng: -15.414525},
		{lat: 28.078602, lng: -17.327841},
		{lat: 28.086146, lng: -17.108436},
		{lat: 28.675991, lng: -17.765971},
		{lat: 28.288232, lng: -16.862890},
		{lat: 28.471083, lng: -16.250288},
		{lat: 33.056064, lng: -16.333745},
		{lat: 32.644413, lng: -16.899954},
		{lat: 36.553139, lng: -6.234574},
		{lat: 35.976253, lng: -6.131565},
		{lat: 35.931786, lng: -5.653638},
		{lat: 36.304526, lng: -1.654593},
		{lat: 37.751630, lng: 0.696503},
		{lat: 38.679266, lng: 1.518799},
		{lat: 40.652327, lng: 2.458654},
		{lat: 41.972582, lng: 3.584731},
		{lat: 43.274040, lng: 3.507803}
		];
points = flightPlanCoordinates;
routes = [{lat: points[0].lat, lng: points[0].lng}, {lat: points[0].lat, lng: points[0].lng}];

var save;

function startAnimation() {

save = new google.maps.Polyline();
	  	var distance = Math.sqrt(Math.pow((points[j-1].lat - points[j].lat), 2) + Math.pow((points[j-1].lng - points[j].lng), 2));
	  	var nbIncrementation = distance * 100;//100
	  	distanceTot += distance;

	 	var deltalat = (points[j].lat - points[j-1].lat) / nbIncrementation;
	  	var deltalng = (points[j].lng - points[j-1].lng) / nbIncrementation;

	  	if (j == 1) {
  			setTimeout(function(){
  				routes.pop();
  				routes.push(flightPlanCoordinates[1]);
  				routes.push(flightPlanCoordinates[1]);
  			}, ((distanceTot * 100 ) * 3));
	  	}

	  	for (var i = 0; i < nbIncrementation; i++) {
	      	setTimeout(
	        	function() {
	          		var lat = marker.position.lat();
	          		var lng = marker.position.lng();

	          		lat += deltalat;
	          		lng += deltalng;
	          		latlng = new google.maps.LatLng(lat, lng);
	          		marker.setPosition(latlng);

	          		routes.pop();
					routes.push({lat: lat, lng: lng});

					var flightPath = new google.maps.Polyline({
					  path: routes,
					  geodesic: true,
					  strokeColor: '#bf3c1b',
					  strokeOpacity: 0,
					  strokeWeight: 2,
					   icons: [{
					        icon: lineSymbol,
					        offset: '0',
					        repeat: '20px'
					      }],
					});
					save.setMap(null);
					flightPath.setMap(map);
					save = flightPath;

	          		if (i  >= nbIncrementation -1 && j < points.length -1) {
	          			j++;
	          			startAnimation();
	          			setTimeout(function(){
	          				routes.push(flightPlanCoordinates[j]);
	          			}, ((distanceTot * 100 - (nbIncrementation - i )) * 3));
	          		}
	        	}, ((distanceTot * 100 - (nbIncrementation - i )) * 3) //3
	      	);
	  	}
}


function keyPressed(e){

	var key = event.keyCode;
	switch (key) {
  		case 82:
  		save.setMap(null);
		routes = [{lat: points[0].lat, lng: points[0].lng}, {lat: points[0].lat, lng: points[0].lng}];
		distanceTot = 0;
		j = 1;
		latlng = new google.maps.LatLng(initLat, initLng);
		marker.setPosition(latlng);
		startAnimation();
	    break;
	}
}