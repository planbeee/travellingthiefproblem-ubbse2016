'use strict'

function marker(numberOfItems, valueOfItems, weightOfItems, googleMarker) {
    this.numberOfItems = numberOfItems;
    this.valueOfItems = valueOfItems;
    this.weightOfItems = weightOfItems;
    this.googleMarker = googleMarker;
}

/*function markerG(googleM) {
    this.googleM = googleM;
}*/

function markerF(m, mG) {
    this.m = m;
    this.mG = mG;
}

let toSend = new Array(100);
let s = "";
let latlngX;

let valItm = [];
let wghItm = [];
for (let i = 0; i < 10; i++) {
    valItm[i] = Math.floor(Math.random() * 99) + 1;
    wghItm[i] = Math.floor(Math.random() * 40) + 10;
}


let markers = [],
    markerLabelNum = 0,
    selectedMarker = -999,
    wow = ["green", "purple", "red", "yellow", "blue", "orange", "black", "brown"];

let directionsDisplay = [];
//directionNum = 0
let directionsService;
let map;

//inicializálja a térképet
function initMap() {
    let latlngCenter = { lat: 45.7820031, lng: 25.0681987 }
    directionsService = new google.maps.DirectionsService
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: latlngCenter
    })

    // purpose: decode latitude and longitude to address
    let geocoder = new google.maps.Geocoder;

    google.maps.event.addListener(map, 'click', function(event) {
        routeDisplay(map, geocoder, event);
        setTimeout(function() { openPopUp() }, 200);
        //tomb[i] = obj(map, geocoder, event);
    })
}

let markerGkeeper;

function addMarker() {
    /*let numberOfItems = Math.floor(Math.random() * 2) + 1,
        valueOfItems = [],
        weightOfItems = [];

    for (let i = 0; i < numberOfItems; i++) {
        valueOfItems[i] = Math.floor(Math.random() * 100)
        weightOfItems[i] = Math.floor(Math.random() * 10)
    }*/


    markerGkeeper = new google.maps.Marker({
        label: markerLabelNum.toString(),
        position: latlngX,
        map: map
    })


    toSend[markers.length - 1] = new Array(100);

    //addToSelect();
    //markerLabelNum++;
}

//function addToSelect(index, marker) {
function addToSelect() {
    let select = document.getElementById("select")
    let option = document.createElement("option")

    // Add onclick to a html element dynamically using javascript
    //option.onclick = function() { alert('blah') }
    //option.addEventListener("click", myFunction, false)
    option.onclick = function() { checkAreaSafe(parseInt($("#select option:selected").text())) }

    option.id = markers.length - 1;
    option.text = markers.length - 1;
    //console.log(markers[markers.length - 1].valueOfItems);
    option.value = markers[markers.length - 1].valueOfItems + "%%%" + markers[markers.length - 1].weightOfItems;
    select.add(option);
}

function checkAreaSafe(markerIndex) {
    let markerData = document.getElementById(markerIndex).value.split("%%%");
    let selectedMarkerValue = markerData[0];
    let selectedMarkerWeight = markerData[1];
    document.getElementById("safe").innerHTML = "Values: " + selectedMarkerValue + "<br>Weights: " + selectedMarkerWeight;
    selectedMarker = document.getElementById(markerIndex).index;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function routeDisplay(map, geocoder, event) {
    let latX = event.latLng.lat();
    let lngX = event.latLng.lng();
    latlngX = { lat: latX, lng: lngX };
    addMarker()
        //Gather();

    if (markers.length > 0) {
        clickBlocked();
        for (let i = 0; i < markers.length; i++) {
            let delay = Math.floor(i % 5)
                //setTimeout(function() { calculateAndDisplayRoute(markers[i].googleMarker.getPosition(), markers[markers.length - 1].googleMarker.getPosition()) }, 2000 * delay)
            if (i != 0 && delay == 0) {
                await sleep(4000)
            }
            //calculateAndDisplayRoute(markers[i].googleMarker.getPosition(), markers[markers.length - 1].googleMarker.getPosition(), i, markers.length - 1)
            //console.log("i = " + i);
            calculateAndDisplayRoute(markers[i].googleMarker.getPosition(), markerGkeeper.getPosition(), i, markers.length - 1)
        }
        await sleep(2000);

        if (directionsDisplay.length == ((markers.length + 1) * (markers.length)) / 2) {
            modalClk.style.display = "none";
        }
        //let yesNum = parseInt(s);
        //console.log(s);
    }
}

let colorIndex = 0;

function calculateAndDisplayRoute(x, y, p, q) {
    directionsService.route({
        origin: x,
        destination: y,
        travelMode: 'WALKING'
    }, function(response, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (colorIndex == wow.length) {
                colorIndex = 0
            }

            //console.log("Distance: " + response.routes[0].legs[0].distance.text);

            toSend[p][q] = parseInt(response.routes[0].legs[0].distance.text);
            toSend[q][p] = parseInt(response.routes[0].legs[0].distance.text);

            directionsDisplay[directionsDisplay.length] = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                draggable: false,
                polylineOptions: {
                    strokeColor: wow[colorIndex /*Math.floor(Math.random() * wow.length)*/ ]
                }
            })
            colorIndex++;
            directionsDisplay[directionsDisplay.length - 1].setMap(map);
            directionsDisplay[directionsDisplay.length - 1].setDirections(response);
            //directionNum++;

            s = "";

            for (let i = 0; i < markers.length; i++) {
                for (let j = 0; j < markers.length; j++) {
                    if (toSend[i][j] != null) {
                        s += toSend[i][j] + " ";
                        //Number(toSend[i][j]);
                        //s += (toSend[i][j]).substring(0, toSend[i][j].length - 3) + " ";
                    } else {
                        s += "0 ";
                    }
                }
                s += "\n";
            }
        } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            //window.alert('Developer Note: Directions request failed due to ' + status + '\n1 marker has 2 geocodes: lat ang lng\nAt 5 markers we are using 10 geocodes\nThe google maps api can do 10 per second')
            window.alert(status);
        } else {
            //window.alert('Developer Note: Directions request failed due to ' + status)
            location.reload();
        }
    })
}

function testFunction(resp) {
    console.log(markers[0]);
}

//utolsó marker törlése, tömbökkel bármelyik törölhető
function removeMarker(toRem) {
    let element;

    let toRemIndex = 0;
    while (toRem != Number(markers[toRemIndex].googleMarker.label)) {
        toRemIndex++;
    }

    element = document.getElementById(toRem);
    element.outerHTML = "";
    delete element.text;
    markers[toRem].googleMarker.setMap(null);
    markers.splice(toRemIndex, 1);

    toRemIndex = (toRem * (toRem - 1)) / 2;
    /*if (toRem == 0) {
        toRemIndex = 0;
    }*/
    console.log("toRemIndex = " + toRemIndex);

    let toRemID = directionsDisplay[toRemIndex].directions.geocoded_waypoints[1].place_id;
    if (toRem == 0) {
        toRemID = directionsDisplay[toRemIndex].directions.geocoded_waypoints[0].place_id;
    }

    console.log("Osszes: ");
    for (let i = 0; i < directionsDisplay.length; i++) {
        console.log("i:" + i + " ID0 = " + directionsDisplay[i].directions.geocoded_waypoints[0].place_id + " ID1 = " + directionsDisplay[i].directions.geocoded_waypoints[1].place_id)
    }
    console.log("Torolni:");
    let i = toRemIndex;
    while (i < directionsDisplay.length) {
        //if (directionsDisplay[i] != null) {
        if (directionsDisplay[i].directions.geocoded_waypoints[1].place_id == toRemID || directionsDisplay[i].directions.geocoded_waypoints[0].place_id == toRemID) {
            console.log("i:" + i + " ID0 = " + directionsDisplay[i].directions.geocoded_waypoints[0].place_id + " ID1 = " + directionsDisplay[i].directions.geocoded_waypoints[1].place_id)
                //console.log(directionsDisplay[i]);
                //console.log("i = " + i);
            directionsDisplay[i].setMap(null);
            directionsDisplay[i] = null;
            directionsDisplay.splice(i, 1);
            //directionNum--;
        } else {
            i++;
        }
        //}
    }

    //console.log("directionDisplay.length() = " + directionsDisplay.length);
    /*let wher = (toRemIndex + toRem - 1);
    for (let i = toRemIndex; i <= wher; i++) {
        if (directionsDisplay[i] != null) {
            console.log(directionsDisplay[i]);
            //console.log("i = " + i);
            directionsDisplay[i].setMap(null);
            directionsDisplay[i] = null;
            //directionNum--;
        }
    }
    for (let i = 0; i < directionsDisplay.length; i++) {
        console.log("directionDisplay[" + i + "] = " + directionsDisplay[i]);
    }
    console.log("\n");
    directionsDisplay.splice(toRemIndex, toRem);
    for (let i = 0; i < directionsDisplay.length; i++) {
        console.log("directionDisplay[" + i + "] = " + directionsDisplay[i]);
    }
    //console.log("directionDisplay = " + directionsDisplay);
    //console.log("directionDisplay.length() = " + directionsDisplay.length);

    let i = toRemIndex + toRem,
        shift = 0;
    if (directionsDisplay[i] != null) {
        //console.log("directionsDisplay[i]: " + directionsDisplay[i]);
        console.log("i = " + i);
        directionsDisplay[i].setMap(null);
        directionsDisplay[i] = null;
        directionsDisplay.splice(i, 1);
        // directionNum--;
    }

    console.log("\n");
    for (let i = 0; i < directionsDisplay.length; i++) {
        console.log("directionDisplay[" + i + "] = " + directionsDisplay[i]);
    }

    i = i + toRem;

    while (i < directionsDisplay.length) {
        if (directionsDisplay[i] != null) {
            //console.log("directionsDisplay[i]: " + directionsDisplay[i]);
            console.log("i = " + i);
            directionsDisplay[i].setMap(null);
            directionsDisplay[i] = null;
            directionsDisplay.splice(i, 1);
            //directionNum--;
        }
        shift++;
        i = i + toRem + shift;
    }
    console.log("\n");
    for (let i = 0; i < directionsDisplay.length; i++) {
        console.log("directionDisplay[" + i + "] = " + directionsDisplay[i]);
    }*/
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
    let element;
    for (let i = 0; i < markers.length; i++) {
        console.log("markers[" + i + "].googleMarker.label = " + Number(markers[i].googleMarker.label));
        element = document.getElementById(Number(markers[i].googleMarker.label));
        markers[i].googleMarker.setMap(train);
        if (element != null) {
            element.outerHTML = "";
            delete element.text;
        }
    }

    for (let i = 0; i < directionsDisplay.length; i++) {
        if (directionsDisplay[i] != null) {
            directionsDisplay[i].setMap(null);
            directionsDisplay[i] = null;
        }
    }

    directionsDisplay = [];
    // directionNum = 0;
}

/*function geocodeLatLng(geocoder, map) {

}*/