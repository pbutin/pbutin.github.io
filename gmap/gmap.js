// Latitude du centre de la carte
var mapCenterLat = 38.688;

// Longitude du centre de la carte
var mapCenterLong = -9.406667;

// niveau du zoom sur la carte
var zoom = 5;

// adresse de l'API + point d'entre
var addrAPI = "https://api-adresse.data.gouv.fr/search/"

// objet JSON elements de la requete
var data;

// limite nombre d'elements de la requete
var limitData = 1;



window.onload = function init() { 
   getData("paris");
} 

// fait une requete sur addrAPI si str n'est pas vide
// avec pour champ de recherche str
// execute storeDataInBrowsersStorage() et initMap() apres la reponse du serveur
function getData(str) {
	if (str != "") {
		var req = new XMLHttpRequest();
		var param = "";

		req.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) { //reponse recu et valide
				data = JSON.parse(this.responseText);
				storeDataInBrowsersStorage();
				initMap();
			}
		};

		param = param.concat('?', "q=", str);
		param = param.concat('&', "limit=", limitData);

		req.open("GET", addrAPI + param, async = true);

		req.send(null);
	}
}


// initialise et affiche la carte
// avec les adresses present dans la variable data
function initMap() {
	var center;
	var point;
	var marker;
	var map;

	center = {lat: mapCenterLat, lng: mapCenterLong}
	// creer la carte avec comme point central center
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: zoom,
		center: center,
		styles: mapStyle
	});


	// pour chaque adresses, creer un marqueur sur la carte
	data.features.forEach(function(elt) {
		//point = {lat:   elt.geometry.coordinates[1]  , lng:   elt.geometry.coordinates[0]  };
        point = {lat: 38.688, lng: -9.406667};
		marker = new google.maps.Marker({
			position: point,
			map: map,
			icon: 'img/bateau.gif'
		});
	});

	var flightPlanCoordinates = [
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
		{lat: 38.679266, lng: 1.518799},
		{lat: 43.274040, lng: 3.507803}
    ];
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(map);
}


// convertie data en String et l'enregistre dans le navigateur
function storeDataInBrowsersStorage() {
	if (typeof(localStorage) !== "undefined") { // si pas de stockage possible
		localStorage.setItem("data", JSON.stringify(data));
	}
}

// affiche la variable data du stockage navigateur dans la console
function readDataFromBrowsersStorage() {
	if (typeof(localStorage) !== "undefined") {
		console.log(localStorage.data);
	}
}