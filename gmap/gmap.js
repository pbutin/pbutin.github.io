// Latitude du centre de la carte
var mapCenterLat = 39.46867

// Longitude du centre de la carte
var mapCenterLong = -11.59133;

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
        point = {lat: 39.46867, lng: -11.59133};
		marker = new google.maps.Marker({
			position: point,
			map: map,
			icon: 'img/bateau.gif'
		});
	});
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