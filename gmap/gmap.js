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
var points;
var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 3
};
// initialise et affiche la carte
window.onload = function initMap() {
    var center;


    center = {
        lat: mapCenterLat,
        lng: mapCenterLong
    }

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

    point = {
        lat: initLat,
        lng: initLng
    };
    marker = new google.maps.Marker({
        position: point,
        map: map,
        icon: markerImage,
    });

    var onlyCoords = [];
    for (const point of points) {
    	onlyCoords.push(point.coords);
    }

     var flightPath = new google.maps.Polyline({
                    path: onlyCoords,
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
    flightPath.setMap(map);

    // route dynamique
    // save = new google.maps.Polyline();
    startAnimation();
}


var j = 1;
var distanceTot = 0
var points;
var routes = [];
var firstPoint = true;
points = [
	{coords: {lat: 38.703744, lng: -9.421158}, stop:true},
{coords: {lat: 33.056064, lng: -16.333745}, stop:true},
{coords: {lat: 28.471083, lng: -16.250288}, stop:true},
{coords: {lat: 28.122381, lng: -15.414525}, stop:false},
{coords: {lat: 28.078602, lng: -17.327841}, stop:false},
{coords: {lat: 28.086146, lng: -17.108436}, stop:false},
{coords: {lat: 28.675991, lng: -17.765971}, stop:false},
{coords: {lat: 28.288232, lng: -16.862890}, stop:false},
{coords: {lat: 28.471083, lng: -16.250288}, stop:false},
{coords: {lat: 33.056064, lng: -16.333745}, stop:false},
{coords: {lat: 32.644413, lng: -16.899954}, stop:true},
{coords: {lat: 36.553139, lng: -6.234574}, stop:true},
{coords: {lat: 35.976253, lng: -6.131565}, stop:false},
{coords: {lat: 35.931786, lng: -5.653638}, stop:false},
{coords: {lat: 36.304526, lng: -1.654593}, stop:false},
{coords: {lat: 37.751630, lng: 0.696503}, stop:false},
{coords: {lat: 38.679266, lng: 1.518799}, stop:true},
{coords: {lat: 40.652327, lng: 2.458654}, stop:false},
{coords: {lat: 41.972582, lng: 3.584731}, stop:false},
{coords: {lat: 43.274040, lng: 3.507803}, stop:false},
];
routes = [{
    lat: points[0].coords.lat,
    lng: points[0].coords.lng
}, {
    lat: points[0].coords.lat,
    lng: points[0].coords.lng
}];
// route dynamique
// var save;

function startAnimation() {


    var distance = Math.sqrt(Math.pow((points[j - 1].coords.lat - points[j].coords.lat), 2) + Math.pow((points[j - 1].coords.lng - points[j].coords.lng), 2));
    var nbIncrementation = distance * 100; //100
    distanceTot += distance;

    var deltalat = (points[j].coords.lat - points[j - 1].coords.lat) / nbIncrementation;
    var deltalng = (points[j].coords.lng - points[j - 1].coords.lng) / nbIncrementation;

	// route dynamique
    /*if (firstPoint == true) {
        firstPoint = false;
        var memo = j;
        setTimeout(function() {
            routes.pop();
            routes.push(points[memo].coords);
            routes.push(points[memo].coords);
        }, ((distanceTot * 100) * 3));
    }*/

    for (var i = 0; i < nbIncrementation; i++) {
        setTimeout(
            function() {
                var lat = marker.position.lat();
                var lng = marker.position.lng();

                lat += deltalat;
                lng += deltalng;
                latlng = new google.maps.LatLng(lat, lng);
                marker.setPosition(latlng);

				// route dynamique
                /*routes.pop();
                routes.push({
                    lat: lat,
                    lng: lng
                });

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
                save = flightPath;*/

                if (i >= nbIncrementation - 1 && j < points.length - 1 && points[j].stop == false) {
                    j++;
                    startAnimation();
                    // route dynamique
                    //setTimeout(function() {
                    //    routes.push(points[j].coords);
                    //}, ((distanceTot * 100 - (nbIncrementation - i)) * 3));
                }
            }, ((distanceTot * 100 - (nbIncrementation - i)) * 3) //3
        );
    }
}


function keyPressed(e) {

    var key = event.keyCode;
    switch (key) {
        case 82:
            restart();
            break;

        case 78:
            nextStep();
            break;
    }
}

function nextStep() {
    distanceTot = 0;
    j++;
    firstPoint = true;
    // route dynamique
     // routes.push(points[j].coords);
    startAnimation();
}

function restart() {
	// route dynamique
     //save.setMap(null);
    routes = [{
        lat: points[0].coords.lat,
        lng: points[0].coords.lng
    }, {
        lat: points[0].coords.lat,
        lng: points[0].coords.lng
    }];
    distanceTot = 0;
    j = 1;
    latlng = new google.maps.LatLng(initLat, initLng);
    marker.setPosition(latlng);
    startAnimation();
}