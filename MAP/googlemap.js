var markers = [];
var markerLabelNum = 0;
var responseIndex = 0;
var responses = [];

var sarmasag = {lat: 47.3560031, lng: 22.8251987};
var cluj = {lat: 46.7833643, lng: 23.5464732};
var aghires = {lat: 47.1640112, lng: 23.004459};

	var directionsService;
	var directionsDisplay;
	
	//inicializálja a térképet
	function initMap() {
		directionsService = new google.maps.DirectionsService;
		directionsDisplay = new google.maps.DirectionsRenderer;
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 8,
			center: sarmasag
		}
	);
	directionsDisplay.setMap(map);
	
	function calculateAndDisplayRoute(x,y) {
		directionsService.route({
			origin: x,
			destination: y,
			travelMode: 'DRIVING'
		}, function(response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);
				//responses[responseIndex] = response;
				//console.log(response.routes[0].legs[0].distance.value);
				//directionsDisplay.setDirections(responses[responseIndex]);
				//responseIndex++;
				//console.log(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
        });
    }
	
	calculateAndDisplayRoute(sarmasag, cluj);
	calculateAndDisplayRoute(sarmasag, aghires);
	calculateAndDisplayRoute(aghires, cluj);
	
	
	//for (var i = 0; i < responseIndex; i++){
	//	directionsDisplay.setDirections(responses[0]);
	//}
	
	function addMarker(x){
		markers[markerLabelNum] = new google.maps.Marker({
			label: markerLabelNum.toString(),
			position: x,
			map: map
		});
		markerLabelNum++;
	}
	
	//pontokat tesz a mapra
		//addMarker(aghires);
	//utolsó marker törlése, tömbökkel bármelyik törölhető	
		//markers.setMap(null);
		
		//deleteMarkers();
	
	google.maps.event.addListener(map, "click", function(event) {
		var latX = event.latLng.lat();
		var lngX = event.latLng.lng();
		var x = {lat: latX, lng: lngX};
		addMarker(x);
	});


}