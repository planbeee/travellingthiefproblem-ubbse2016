var markers = [];
var markerLabelNum = 0;
var responseIndex = 0;
var responses = [];
var myData = [];
var wow = ["green", "purple", "red", "pink", "yellow", "blue", "orange", "white", "black", "brown"];

var latlngCenter = { lat: 45.7820031, lng: 25.0681987 };
var cluj = { lat: 46.7833643, lng: 23.5464732 };
var aghires = { lat: 47.1640112, lng: 23.004459 };

var directionsService;
var directionsDisplay;

//inicializálja a térképet
function initMap() {
    directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: latlngCenter
    });
}

// purpose: decode latitude and longitude to address
var geocoder = new google.maps.Geocoder;

function calculateAndDisplayRoute(x, y) {
    directionsService.route({
        origin: x,
        destination: y,
        travelMode: 'WALKING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay = new google.maps.DirectionsRenderer({
                polylineOptions: {
                    strokeColor: wow[Math.floor(Math.random() * wow.length)]
                }
            });
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

console.log(markers);

function addMarker(x) {
    markers[markerLabelNum] = new google.maps.Marker({
        label: markerLabelNum.toString(),
        position: x,
        map: map
    });
    markerLabelNum++;
}
//utolsó marker törlése, tömbökkel bármelyik törölhető	
//markers.setMap(null);

//deleteMarkers();

function geocodeLatLng(geocoder, map) {

}


google.maps.event.addListener(map, "click", function(event) {
    var latX = event.latLng.lat();
    var lngX = event.latLng.lng();
    var x = { lat: latX, lng: lngX };
    addMarker(x);

    if (markerLabelNum > 1) {
        for (var i = 0; i < markerLabelNum - 1; i++) {
            calculateAndDisplayRoute(markers[i].getPosition(), markers[markerLabelNum - 1].getPosition());
        }
    }

    geocodeLatLng(geocoder, map);

    var x = document.getElementById("sel");
    var option = document.createElement("option");
    option.text = markers[markers.length - 1].getPosition();
    x.add(option);

    /*if (markers[markers.length - 1].getPosition().toString == "46.556618, 23.907623") {
        alert("Sat de sapari...");
    }*/
});