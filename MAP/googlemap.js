'use strict'

function marker(numberOfItems, valueOfItems, googleMarker) {
    this.numberOfItems = numberOfItems
    this.valueOfItems = valueOfItems
    this.googleMarker = googleMarker
}

let markers = [],
    markerLabelNum = 0,
    selectedMarker = -999

let directionsService
let map

//inicializálja a térképet
function initMap() {
    let latlngCenter = { lat: 45.7820031, lng: 25.0681987 }
    directionsService = new google.maps.DirectionsService
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: latlngCenter
    })

    // purpose: decode latitude and longitude to address
    let geocoder = new google.maps.Geocoder

    google.maps.event.addListener(map, "click", function(event) {
        routeDisplay(map, geocoder, event)
    })
}

function addMarker(latlngX) {
    let numberOfItems = Math.floor(Math.random() * 2) + 1,
        valueOfItems = []

    for (let i = 0; i < numberOfItems; i++) {
        valueOfItems[i] = Math.floor(Math.random() * 100);
    }

    markers[markerLabelNum] = new marker(numberOfItems, valueOfItems, new google.maps.Marker({
        label: markerLabelNum.toString(),
        position: latlngX,
        map: map
    }))

    addToSelect(markerLabelNum, markers[markerLabelNum])
    markerLabelNum++
}

function addToSelect(index, marker) {
    let select = document.getElementById("select")
    let option = document.createElement("option")

    // Add onclick to a html element dynamically using javascript
    //option.onclick = function() { alert('blah') }
    //option.addEventListener("click", myFunction, false)
    option.onclick = function() { checkAreaSafe(index) }

    option.id = index
    option.text = index
    option.value = marker.valueOfItems
    select.add(option)
}

function checkAreaSafe(markerIndex) {
    let selectedMarkerValue = document.getElementById(markerIndex).value
    document.getElementById("safe").innerHTML = selectedMarkerValue
    selectedMarker = document.getElementById(markerIndex).index
}

function routeDisplay(map, geocoder, event) {
    let latX = event.latLng.lat()
    let lngX = event.latLng.lng()
    let latlngX = { lat: latX, lng: lngX }
    addMarker(latlngX)
        /*setTimeout(function() {
            calculateAndDisplayRoute(markers[i].googleMarker.getPosition(), markers[markerLabelNum - 1].googleMarker.getPosition());
        }, 200);*/

    if (markerLabelNum > 1) {
        for (let i = 0; i < markerLabelNum - 1; i++) {
            setTimeout(function() { calculateAndDisplayRoute(markers[i].googleMarker.getPosition(), markers[markerLabelNum - 1].googleMarker.getPosition()) }, 0)
        }
    }
}

let colorIndex = 0;

function calculateAndDisplayRoute(x, y) {
    let wow = ["green", "purple", "red", "yellow", "blue", "orange", "black", "brown"]
    let directionsDisplay
    directionsService.route({
        origin: x,
        destination: y,
        travelMode: 'WALKING'
    }, function(response, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (colorIndex === wow.length) {
                colorIndex = 0
            }
            directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: wow[colorIndex /*Math.floor(Math.random() * wow.length)*/ ]
                }
            })
            colorIndex++
            directionsDisplay.setMap(map)
            directionsDisplay.setDirections(response)
        } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            window.alert('Developer Note: Directions request failed due to ' + status + '\n1 marker has 2 geocodes: lat ang lng\nAt 5 markers we are using 10 geocodes\nThe google maps api can do 10 per second')
        } else {
            window.alert('Developer Note: Directions request failed due to ' + status)
        }
    })
}

//utolsó marker törlése, tömbökkel bármelyik törölhető
function removeMarker() {
    markers[selectedMarker].googleMarker.setMap(null)
}
/*function geocodeLatLng(geocoder, map) {

}*/