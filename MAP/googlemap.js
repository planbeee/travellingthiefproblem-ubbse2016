$(function(){
	//var directionsService = new google.maps.DirectionsService();
	var sarmasag = {lat: 47.3560031, lng: 22.8251987};
	var cluj = {lat: 46.7833643, lng: 23.5464732};
	var aghires = {lat: 47.1640112, lng: 23.004459};
	
	function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
	//var directionsService = new google.maps.DirectionsService();
    zoom: 8,
    center: sarmasag
        });
		
		function initialize() {
		  directionsDisplay = new google.maps.DirectionsRenderer();
		  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
		  var mapOptions = {
			zoom:7,
			center: sarmasag
		  }
		  map = new google.maps.Map(document.getElementById('map'), mapOptions);
		  directionsDisplay.setMap(map);
		}
		
		function addpoint(x){
			var marker = new google.maps.Marker({
			  position: x,
			  map: map
			});
		}
		
		addpoint(sarmasag);
		addpoint(cluj);
		addpoint(aghires);
		
		google.maps.event.addListener(map, "rightclick", function(event) {
		var latX = event.latLng.lat();
		var lngY= event.latLng.lng();
		// populate yor box/field with lat, lng
		//alert("Lat=" + latX + "; Lng=" + lngY);
		
		var x = {lat: latX, lng: lngY};
		addpoint(x);
		});
		
		function calcRoute() {
			//var start = document.getElementById('start').value;
			//var end = document.getElementById('end').value;
			var start = sarmasag;
			var end = cluj;
			var request = {
				origin: start,
				destination: end,
				travelMode: 'DRIVING'
			};
			directionsService.route(request, function(result, status) {
				if (status == 'OK') {
					directionsDisplay.setDirections(result);
				}
			});
		}
		
		calcRoute();

      }
});