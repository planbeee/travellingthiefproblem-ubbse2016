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
            //setTimeout(function() { openPopUp() }, 200)
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

    markers[markers.length] = new marker(numberOfItems, valueOfItems, weightOfItems, new google.maps.Marker({
        label: markerLabelNum.toString(),
        position: latlngX,
        map: map
    }))

    //addToSelect(markerLabelNum, markers[markerLabelNum])
    addToSelect();
    markerLabelNum++;
}

//function addToSelect(index, marker) {
function addToSelect() {
    let select = document.getElementById("select")
    let option = document.createElement("option")

    // Add onclick to a html element dynamically using javascript
    //option.onclick = function() { alert('blah') }
    //option.addEventListener("click", myFunction, false)
    option.onclick = function() { checkAreaSafe(markers.length - 1) }

    option.id = markers.length - 1
    option.text = markers.length - 1
    option.value = markers[markers.length - 1].valueOfItems + "%%%" + markers[markers.length - 1].weightOfItems
    select.add(option)
}

function checkAreaSafe(markerIndex) {
    let markerData = document.getElementById(markerIndex).value.split("%%%")
    let selectedMarkerValue = markerData[0]
    let selectedMarkerWeight = markerData[1]
    document.getElementById("safe").innerHTML = "Values: " + selectedMarkerValue + "<br>Weights: " + selectedMarkerWeight
    selectedMarker = document.getElementById(markerIndex).index
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function routeDisplay(map, geocoder, event) {
    let latX = event.latLng.lat()
    let lngX = event.latLng.lng()
    let latlngX = { lat: latX, lng: lngX }
    addMarker(latlngX)

    if (markers.length > 1) {
        clickBlocked();
        for (let i = 0; i < markers.length - 1; i++) {
            let delay = Math.floor(i % 5)
                //setTimeout(function() { calculateAndDisplayRoute(markers[i].googleMarker.getPosition(), markers[markers.length - 1].googleMarker.getPosition()) }, 2000 * delay)
            if (i != 0 && delay == 0) {
                await sleep(3000)
            }
            calculateAndDisplayRoute(markers[i].googleMarker.getPosition(), markers[markers.length - 1].googleMarker.getPosition())
        }
        await sleep(1000);
        //console.log("directionNum = " + directionNum);
        //console.log("markerLabelNum = " + markerLabelNum);
        if (directionNum == (markerLabelNum * (markerLabelNum - 1)) / 2) {
            modal.style.display = "none";
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
        if (status == google.maps.GeocoderStatus.OK) {
            if (colorIndex == wow.length) {
                colorIndex = 0
            }

            directionsDisplay[directionNum] = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                draggable: false,
                polylineOptions: {
                    strokeColor: wow[colorIndex /*Math.floor(Math.random() * wow.length)*/ ]
                }
            })
            colorIndex++;
            directionsDisplay[directionNum].setMap(map);
            directionsDisplay[directionNum].setDirections(response);
            directionNum++;
            //testFunction(response);

            //console.log(directionNum + ' ' + directionsDisplay[directionNum - 1]);

        } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            //window.alert('Developer Note: Directions request failed due to ' + status + '\n1 marker has 2 geocodes: lat ang lng\nAt 5 markers we are using 10 geocodes\nThe google maps api can do 10 per second')
            window.alert(status);
        } else {
            window.alert('Developer Note: Directions request failed due to ' + status)
        }
    })
}

function testFunction(resp) {
    console.log(resp);
}

//utolsó marker törlése, tömbökkel bármelyik törölhető
function removeMarker(toRem) {
    let element;
    //markers[markerLabelNum - 1].googleMarker.setMap(null);
    markers[toRem].googleMarker.setMap(null);
    element = document.getElementById(toRem);
    element.outerHTML = "";
    delete element.text;

    /*for (let i = 0; i < markers.length; i++) {
        console.log(markers[i] + " ");
    }*/
    let toRemIndex = markers.indexOf(toRem);
    markers.splice(toRemIndex, 1);

    toRemIndex = (toRem * (toRem - 1)) / 2;

    //console.log("directionDisplay.length() = " + directionsDisplay.length);
    let wher = (toRemIndex + toRem - 1);
    for (let i = toRemIndex; i <= wher; i++) {
        if (directionsDisplay[i] != null) {
            //console.log("directionsDisplay[i]: " + directionsDisplay[i]);
            //console.log("i = " + i);
            directionsDisplay[i].setMap(null);
            directionsDisplay[i] = null;
        }
    }
    directionsDisplay.splice(toRemIndex, toRem);
    //console.log("directionDisplay.length() = " + directionsDisplay.length);

    let i = toRemIndex + toRem,
        shift = 0;
    if (directionsDisplay[i] != null) {
        //console.log("directionsDisplay[i]: " + directionsDisplay[i]);
        console.log("i = " + i);
        directionsDisplay[i].setMap(null);
        directionsDisplay[i] = null;
        directionsDisplay.splice(i, 1);
    }

    i = i + toRem;

    while (i < directionsDisplay.length) {
        if (directionsDisplay[i] != null) {
            //console.log("directionsDisplay[i]: " + directionsDisplay[i]);
            console.log("i = " + i);
            directionsDisplay[i].setMap(null);
            directionsDisplay[i] = null;
            directionsDisplay.splice(i, 1);
        }
        shift++;
        i = i + toRem + shift;
    }

    //directionsDisplay.splice(toRemIndex, toRem);

    /*for (let i = 0; i < markers.length; i++) {
        console.log(markers[i] + " ");
    }*/
    /*for (let i = markers.indexOf(toRem); i < markers.length - 2; i++) {
        markers[i] = markers[i + 1];
    }*/



    /*for (let i = directionsDisplay.length - 1; i > directionsDisplay.length - markers.length; i--) {
        if (directionsDisplay[i] != null) {
            directionsDisplay[i].setMap(null);
            directionsDisplay[i] = null;
        }
    }*/

    /*colorIndex -= directionsDisplay.length - markers.length + 2
    if (colorIndex < 0) {
        colorIndex = wow.length - (wow.length - colorIndex)
    }*/
    //directionsDisplay.length -= markers.length
    //markers.length -= 1
    //markerLabelNum--
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
    directionNum = 0
}

/*function geocodeLatLng(geocoder, map) {

}*/