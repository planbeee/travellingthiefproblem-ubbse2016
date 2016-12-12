var markers = [];
var markerLabelNum = 0;
var responseIndex = 0;
var responses = [];
var myData = [];
var wow = ["green", "purple", "red", "yellow", "blue", "orange", "black", "brown"];
var colorIndex = 0;

var latlngCenter = { lat: 45.7820031, lng: 25.0681987 };

var directionsService;
var directionsDisplay;
var map;

//inicializálja a térképet
function initMap() {
    directionsService = new google.maps.DirectionsService;
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: latlngCenter
    });


    // purpose: decode latitude and longitude to address
    var geocoder = new google.maps.Geocoder;

    google.maps.event.addListener(map, "click", function(event) {
        routeDisplay(map, geocoder, event);
    })
}

function routeDisplay(map, geocoder, event) {
    var latX = event.latLng.lat();
    var lngX = event.latLng.lng();
    var latlngX = { lat: latX, lng: lngX };
    addMarker(latlngX);

    if (markerLabelNum > 1) {
        for (var i = 0; i < markerLabelNum - 1; i++) {
            calculateAndDisplayRoute(markers[i].getPosition(), markers[markerLabelNum - 1].getPosition());
        }
    }

    //addToSelect(markers[markers.length - 1].getPosition());
}

function addToSelect(toAdd) {
    var latlngX = document.getElementById("sel");
    var option = document.createElement("option");
    option.text = toAdd;
    latlngX.add(option);
}

function calculateAndDisplayRoute(x, y) {
    directionsService.route({
        origin: x,
        destination: y,
        travelMode: 'WALKING'
    }, function(response, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (colorIndex === wow.length) {
                colorIndex = 0;
            }
            directionsDisplay = new google.maps.DirectionsRenderer({
                polylineOptions: {
                    strokeColor: wow[colorIndex /*Math.floor(Math.random() * wow.length)*/ ]
                }
            });
            colorIndex++;
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
        } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            window.alert('Developer Note: Directions request failed due to ' + status + '\n1 marker has 2 geocodes: lat ang lng\nAt 5 markers we are using 10 geocodes\nThe google maps api can do 10 per second');
        } else {
            window.alert('Developer Note: Directions request failed due to ' + status);
        }
    });
}

console.log(markers);

function addMarker(latlngX) {
    markers[markerLabelNum] = new google.maps.Marker({
        label: markerLabelNum.toString(),
        position: latlngX,
        map: map
    });
    addToSelect(markerLabelNum);
    markerLabelNum++;
}
//utolsó marker törlése, tömbökkel bármelyik törölhető	
//markers.setMap(null);

//deleteMarkers();

/*function geocodeLatLng(geocoder, map) {

}*/