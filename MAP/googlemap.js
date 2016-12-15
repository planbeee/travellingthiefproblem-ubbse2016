'use strict'

let markers = [],
    markerLabelNum = 0,
    responseIndex = 0,
    responses = [],
    myData = [],
    wow = ["green", "purple", "red", "yellow", "blue", "orange", "black", "brown"],
    colorIndex = 0,
    selectedMarkerValue = -999

let latlngCenter = { lat: 45.7820031, lng: 25.0681987 };

let directionsService;
let directionsDisplay;
let map;

//inicializálja a térképet
function initMap() {
    directionsService = new google.maps.DirectionsService;
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: latlngCenter
    });


    // purpose: decode latitude and longitude to address
    let geocoder = new google.maps.Geocoder;

    google.maps.event.addListener(map, "click", function(event) {
        routeDisplay(map, geocoder, event);
    })
}

function routeDisplay(map, geocoder, event) {
    let latX = event.latLng.lat();
    let lngX = event.latLng.lng()
    let latlngX = { lat: latX, lng: lngX };
    addMarker(latlngX);

    if (markerLabelNum > 1) {
        for (let i = 0; i < markerLabelNum - 1; i++) {
            calculateAndDisplayRoute(markers[i].getPosition(), markers[markerLabelNum - 1].getPosition());
        }
    }

    //addToSelect(markers[markers.length - 1].getPosition());
}

function addToSelect(toAdd) {
    let select = document.getElementById("select");
    let option = document.createElement("option");

    // Add onclick to a html element dynamically using javascript
    //option.onclick = function() { alert('blah'); };
    //option.addEventListener("click", myFunction, false);
    option.onclick = function() { getValue(toAdd) }

    option.id = toAdd;
    option.text = toAdd;
    option.value = Math.floor(Math.random() * 100);
    select.add(option);
}

function getValue(toAdd) {
    selectedMarkerValue = document.getElementById(toAdd).value;
    document.getElementById("sack").innerHTML = selectedMarkerValue;
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
                suppressMarkers: true,
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

console.info(markers);

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