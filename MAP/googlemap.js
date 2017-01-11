'use strict'

function marker(numberOfItems, valueOfItems, weightOfItems, googleMarker) {
    this.numberOfItems = numberOfItems
    this.valueOfItems = valueOfItems
    this.weightOfItems = weightOfItems
    this.googleMarker = googleMarker
}

let markers = [],
    markerLabelNum = 0,
    selectedMarker = -999,
    wow = ["green", "purple", "red", "yellow", "blue", "orange", "black", "brown"]

let directionsDisplay = [],
    directionNum = 0
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
        setTimeout(function() { openPopUp() }, 200)
    })
}


function addMarker(latlngX) {
    let numberOfItems = Math.floor(Math.random() * 2) + 1,
        valueOfItems = [],
        weightOfItems = []

    for (let i = 0; i < numberOfItems; i++) {
        valueOfItems[i] = Math.floor(Math.random() * 100)
        weightOfItems[i] = Math.floor(Math.random() * 10)
    }

    markers[markerLabelNum] = new marker(numberOfItems, valueOfItems, weightOfItems, new google.maps.Marker({
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
    option.value = marker.valueOfItems + "%%%" + marker.weightOfItems
    select.add(option)
}

function checkAreaSafe(markerIndex) {
    let markerData = document.getElementById(markerIndex).value.split("%%%")
    let selectedMarkerValue = markerData[0]
    let selectedMarkerWeight = markerData[1]
    document.getElementById("safe").innerHTML = "Values: " + selectedMarkerValue + "<br>Weights: " + selectedMarkerWeight
    selectedMarker = document.getElementById(markerIndex).index
}

function routeDisplay(map, geocoder, event) {
    let latX = event.latLng.lat()
    let lngX = event.latLng.lng()
    let latlngX = { lat: latX, lng: lngX }
    addMarker(latlngX)

    if (markerLabelNum > 1) {

        for (let i = 0; i < markerLabelNum - 1; i++) {
            let delay = Math.floor(i / 7)
            setTimeout(function() { calculateAndDisplayRoute(markers[i].googleMarker.getPosition(), markers[markerLabelNum - 1].googleMarker.getPosition()) }, 1000 * delay)
        }
    }
}

let colorIndex = 0;

function calculateAndDisplayRoute(x, y) {
    directionsService.route({
        origin: x,
        destination: y,
        travelMode: 'WALKING'
    }, function(response, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (colorIndex === wow.length) {
                colorIndex = 0
            }
            // (markerLabelNum * (markerLabelNum - 1)) / 2
            directionsDisplay[directionNum] = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: wow[colorIndex /*Math.floor(Math.random() * wow.length)*/ ]
                }
            })
            colorIndex++
            directionsDisplay[directionNum].setMap(map)
                //console.info(response)
            directionsDisplay[directionNum].setDirections(response)
            directionNum++
        } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            //window.alert('Developer Note: Directions request failed due to ' + status + '\n1 marker has 2 geocodes: lat ang lng\nAt 5 markers we are using 10 geocodes\nThe google maps api can do 10 per second')
            window.alert(status);
        } else {
            window.alert('Developer Note: Directions request failed due to ' + status)
        }
    })
}

//utolsó marker törlése, tömbökkel bármelyik törölhető
function removeMarker() {
    let element
    markers[markerLabelNum - 1].googleMarker.setMap(null)
    element = document.getElementById(markerLabelNum - 1)
    element.outerHTML = ""
    delete element.text

    for (let i = directionsDisplay.length - 1; i > directionsDisplay.length - markers.length; i--) {
        if (directionsDisplay[i] != null) {
            directionsDisplay[i].setMap(null);
            directionsDisplay[i] = null;
        }
    }
    /*colorIndex -= directionsDisplay.length - markers.length + 2
    if (colorIndex < 0) {
        colorIndex = wow.length - (wow.length - colorIndex)
    }*/
    //directionsDisplay.length -= markers.length
    //markers.length -= 1
    markerLabelNum--
}


function removeMarkers() {
    clearMarkers()
    markers = []
    markerLabelNum = 0
    colorIndex = 0
}

function clearMarkers() {
    setMapOnAll(null);
}

function setMapOnAll(train) {
    let element
    for (let i = 0; i < markers.length; i++) {
        markers[i].googleMarker.setMap(train)
        element = document.getElementById(i)
        element.outerHTML = ""
        delete element.text
    }

    for (let i = 0; i < directionsDisplay.length; i++) {
        if (directionsDisplay[i] != null) {
            directionsDisplay[i].setMap(null);
            directionsDisplay[i] = null;
        }
    }

    directionsDisplay = []
}

/*function geocodeLatLng(geocoder, map) {

}*/