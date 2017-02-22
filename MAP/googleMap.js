'use strict'

// =================================
// The template for marker instances
// =================================
let markers = [],
    markerLabelNum = 0,
    selectedMarker = -999;

function marker(numberOfItems, valueOfItems, weightOfItems, googleMarker) {
    this.numberOfItems = numberOfItems;
    this.valueOfItems = valueOfItems;
    this.weightOfItems = weightOfItems;
    this.googleMarker = googleMarker;
}


// ========================================
// Template for directionDisplay instances
// ========================================
let directionDisplay = [],
    directionsService,
    map;

function roads(beg, end, dir) {
    this.beg = beg;
    this.end = end;
    this.dir = dir;
}


// ====================================
// Needed for delay/sleep in javascript
// ====================================
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// ========================
// Inicializálja a térképet
// ========================
function initMap() {
    let latlngCenter = { lat: 45.7820031, lng: 25.0681987 }
    directionsService = new google.maps.DirectionsService
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: latlngCenter
    })

    google.maps.event.addListener(map, 'click', function(event) {
        setTimeout(function() { openPopUp() }, 200);
        routeDisplay(map, event);
    })
}


// ===========================================================================
// After a markers values and weights are selected and it is added to the map;
// it is added to the <SELECT> so its information can be accessed later
// ===========================================================================
function addToSelect() {
    let select = document.getElementById("select")
    let option = document.createElement("option")

    // Add onclick to a html element dynamically using javascript
    option.onclick = function() { addToSafe(parseInt($("#select option:selected").text())) }

    option.id = markerLabelNum;
    option.text = markerLabelNum;
    option.value = markers[markers.length - 1].valueOfItems + "%%%" + markers[markers.length - 1].weightOfItems;
    select.add(option);
}


// ======================================================================================
// When a marker is clicked in the <SELECT>, its data is loaded into the safe for viewing
// ======================================================================================
function addToSafe(markerIndex) {
    let markerData = document.getElementById(markerIndex).value.split("%%%");
    let selectedMarkerValue = markerData[0];
    let selectedMarkerWeight = markerData[1];
    document.getElementById("safe").innerHTML = "Values: " + selectedMarkerValue + "<br>Weights: " + selectedMarkerWeight;
    selectedMarker = document.getElementById(markerIndex).index;
}


// =====================================================================================================
// The function that is called to interact with the google API when the map is clicked to place a marker
// =====================================================================================================
let markerKeeper;
let toSend = [];

async function routeDisplay(map, event) {
    let latX = event.latLng.lat();
    let lngX = event.latLng.lng();
    let latlngX = { lat: latX, lng: lngX };


    markerKeeper = new google.maps.Marker({
        label: markerLabelNum.toString(),
        position: latlngX,
        map: map
    })

    if (markers.length > 0) {
        clickBlocked();
        for (let i = 0; i < markers.length; i++) {
            let delay = Math.floor(i % 5)
            if (i != 0 && delay == 0) {
                await sleep(3000); // Change back to 4000 ms
            }

            calculateAndDisplayRoute(markers[i].googleMarker.getPosition(), markerKeeper.getPosition(), i, markers.length);
        }
        await sleep(1000); // Change back to 2000 ms

        if (directionDisplay.length == ((markers.length + 1) * (markers.length)) / 2) {
            $('#blockModal').fadeOut(250);
        }
    }
}

//let directionDisplay = [];

function calculateAndDisplayRoute(x, y, p, q) {
    directionsService.route({
        origin: x,
        destination: y,
        travelMode: 'WALKING'
    }, function(response, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            //console.log("Distance: " + response.routes[0].legs[0].distance.text);

            if (toSend[p] == null) {
                toSend[p] = new Array(50);
            }
            if (toSend[q] == null) {
                toSend[q] = new Array(50);
            }

            toSend[p][q] = parseInt(response.routes[0].legs[0].distance.text);
            toSend[q][p] = parseInt(response.routes[0].legs[0].distance.text);

            /*directionsDisplay[directionsDisplay.length] = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                draggable: false,
                polylineOptions: {
                    strokeColor: 'red',
                    strokeOpacity: 0.3,
                    strokeWeight: 7
                }
            });*/

            // directionDisplay[directionDisplay.length] = new roads(p, q, directionDisplay[directionDisplay.length - 1]);
            directionDisplay[directionDisplay.length] = new roads(p, q, new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                draggable: false,
                polylineOptions: {
                    strokeColor: 'red',
                    strokeOpacity: 0.3,
                    strokeWeight: 7
                }
            }));

            directionDisplay[directionDisplay.length - 1].dir.setMap(map);
            directionDisplay[directionDisplay.length - 1].dir.setDirections(response);


        } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            window.alert(status);
        } else {
            //window.alert(status)
            location.reload();
        }
    })
}


// ================================
// Colors the optimal path to green
// ================================
function reColorRoute() {
    //expt = [0, 3, 5, 1, 4, 2, 0];
    let k = 0,
        l = 1,
        j = 0;
    while (l < expt.length) {
        while ((directionDisplay[j].beg != expt[k] || directionDisplay[j].end != expt[l]) && (directionDisplay[j].end != expt[k] || directionDisplay[j].beg != expt[l])) {
            j++;
            console.log("j = " + j);
        }
        directionDisplay[j].dir.polylineOptions.strokeColor = 'green';
        directionDisplay[j].dir.polylineOptions.strokeOpacity = 1.0;
        directionDisplay[j].dir.polylineOptions.strokeWeight = 3;
        directionDisplay[j].dir.setMap(map);
        console.log("Green!!!");
        k++;
        l++;
        j = 0;
    }
}


// ==============================================================
// For testing stuff
// Right now builds the Obj to be sent and console.log()'s things
// ============================================================== 
let JSONObj;

function testFunction(resp) {
    let s = "";
    let distMatrix = new Array(markers.length);

    for (let i = 0; i < markers.length; i++) {
        distMatrix[i] = new Array(markers.length);
    }

    for (let i = 0; i < markers.length; i++) {
        for (let j = 0; j < markers.length; j++) {
            if (toSend[i][j] != null) {
                s += toSend[i][j] + "   ";
                distMatrix[i][j] = toSend[i][j];
            } else {
                s += "0   ";
                distMatrix[i][j] = 0;
            }
        }
        s += "\n";
    }

    JSONObj = {
        "WeightsOfItems": wghItm,
        "ValuesOfItems": valItm,
        "ItemsbyCities": itemsbyCities,
        "Distances": distMatrix
    };
    console.log(JSONObj);
    //console.log(toSend);
    //console.log(directionDisplay[0]);
    //console.log(distMatrix);
    console.log(s);
}


// =========================================================
// Removes last placed marker when X is pressed on the PopUp
// =========================================================
function removeLastMarker() {
    markerKeeper.setMap(null);

    let remIndex = ((markers.length) * (markers.length - 1)) / 2;

    for (let i = remIndex; i < directionDisplay.length; i++) {
        directionDisplay[i].dir.setMap(null);
        directionDisplay[i] = null;
    }
    directionDisplay.splice(remIndex, directionDisplay.length - remIndex);

}


// ===========================================
// Removing all markers
// Only used once for "tactical nuke incoming"
// ===========================================
function removeMarkers() {
    clearMarkers()
    markers = []
    markerLabelNum = 0
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

    for (let i = 0; i < directionDisplay.length; i++) {
        if (directionDisplay[i].dir != null) {
            directionDisplay[i].dir.setMap(null);
            directionDisplay[i] = null;
        }
    }

    directionDisplay = [];
}