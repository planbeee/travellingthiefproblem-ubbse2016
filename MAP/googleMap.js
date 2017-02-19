'use strict'

function marker(numberOfItems, valueOfItems, weightOfItems, googleMarker) {
    this.numberOfItems = numberOfItems;
    this.valueOfItems = valueOfItems;
    this.weightOfItems = weightOfItems;
    this.googleMarker = googleMarker;
}

function roads(beg, end, dir) {
    this.beg = beg;
    this.end = end;
    this.dir = dir;
}

let myDir = [];

let toSend = new Array(100);
for (let kar = 0; kar < 100; kar++) {
    toSend[kar] = new Array(100);
}
let s = "";
let latlngX;
let itemsbyCities = [];

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
    //let geocoder = new google.maps.Geocoder;

    google.maps.event.addListener(map, 'click', function(event) {
        let latX = event.latLng.lat();
        let lngX = event.latLng.lng();
        latlngX = { lat: latX, lng: lngX };
        setTimeout(function() { openPopUp() }, 200);
        routeDisplay(map, event);
    })
}

//function addToSelect(index, marker) {
function addToSelect() {
    let select = document.getElementById("select")
    let option = document.createElement("option")

    // Add onclick to a html element dynamically using javascript
    //option.onclick = function() { alert('blah') }
    //option.addEventListener("click", myFunction, false)
    option.onclick = function() { checkAreaSafe(parseInt($("#select option:selected").text())) }

    option.id = markerLabelNum;
    option.text = markerLabelNum;
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


let markerGkeeper;


let optRoute = [];
let myIndex = 0;

async function routeDisplay(map, event) {
    let latX = event.latLng.lat();
    let lngX = event.latLng.lng();
    latlngX = { lat: latX, lng: lngX };


    markerGkeeper = new google.maps.Marker({
        label: markerLabelNum.toString(),
        position: latlngX,
        map: map
    })


    //toSend[markers.length - 1] = new Array(100);

    //addToSelect();
    //markerLabelNum++;


    if (markers.length > 0) {
        clickBlocked();
        for (let i = 0; i < markers.length; i++) {
            let delay = Math.floor(i % 5)
            if (i != 0 && delay == 0) {
                await sleep(3000); // Change back to 4000 ms
            }

            optRoute[myIndex] = new Array(2);
            optRoute[myIndex][0] = i;
            optRoute[myIndex][1] = markers.length;
            myIndex++;

            calculateAndDisplayRoute(markers[i].googleMarker.getPosition(), markerGkeeper.getPosition(), i, markers.length);
        }
        await sleep(1000); // Change back to 2000 ms

        if (directionsDisplay.length == ((markers.length + 1) * (markers.length)) / 2) {
            $('#blockModal').fadeOut(250);
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
                colorIndex = 0;
            }

            //console.log("Distance: " + response.routes[0].legs[0].distance.text);

            toSend[p][q] = parseInt(response.routes[0].legs[0].distance.text);
            toSend[q][p] = parseInt(response.routes[0].legs[0].distance.text);

            directionsDisplay[directionsDisplay.length] = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                draggable: false,
                polylineOptions: {
                    strokeColor: 'red', //wow[colorIndex /*Math.floor(Math.random() * wow.length)*/ ]
                    strokeOpacity: 0.3
                }
            });

            myDir[myDir.length] = new roads(p, q, directionsDisplay[directionsDisplay.length - 1]);

            colorIndex++;
            directionsDisplay[directionsDisplay.length - 1].setMap(map);
            directionsDisplay[directionsDisplay.length - 1].setDirections(response);


        } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            window.alert(status);
        } else {
            //window.alert(status)
            location.reload();
        }
    })
}

function reColorRoute() {
    let expt = [0, 3, 5, 1, 4, 2, 0];
    let k = 0,
        l = 1,
        j = 0;
    while (l < expt.length) {
        while ((myDir[j].beg != expt[k] || myDir[j].end != expt[l]) && (myDir[j].end != expt[k] || myDir[j].beg != expt[l])) {
            j++;
            console.log("j = " + j);
        }
        directionsDisplay[j].polylineOptions.strokeColor = 'green';
        directionsDisplay[j].polylineOptions.strokeOpacity = 1.0;
        directionsDisplay[j].setMap(map);
        console.log("Green!!!");
        k++;
        l++;
        j = 0;
    }
}


function testFunction(resp) {


    s = "";
    let trap = new Array(markers.length);
    for (let mmm = 0; mmm < markers.length; mmm++) {
        trap[mmm] = new Array(markers.length);
    }

    for (let i = 0; i < markers.length; i++) {
        for (let j = 0; j < markers.length; j++) {
            if (toSend[i][j] != null) {
                s += toSend[i][j] + "   ";
                trap[i][j] = toSend[i][j];
                //Number(toSend[i][j]);
                //s += (toSend[i][j]).substring(0, toSend[i][j].length - 3) + " ";
            } else {
                s += "0   ";
                trap[i][j] = 0;
            }
        }
        s += "\n";
    }

    let JSONObj = {
        "WeightsOfItems": wghItm,
        "ValuesOfItems": valItm,
        "ItemsbyCities": itemsbyCities,
        "Distances": trap
    };
    //console.log(JSONObj);
    console.log(optRoute);
    //console.log(toSend);
    console.log(directionsDisplay[0]);
    //console.log(trap);
    let expt = [0, 3, 5, 1, 4, 2, 0];
    let k = 0,
        l = 1,
        j = 0;
    while (l < expt.length) {
        while ((optRoute[j][0] != expt[k] && optRoute[j][1] != expt[l]) || (optRoute[j][0] != expt[l] && optRoute[j][1] != expt[k])) {
            j++;
        }
        directionsDisplay[j].polylineOptions.strokeColor = 'green';
        k++;
        l++;
    }
}


function removeLastMarker() {
    let element;

    markerGkeeper.setMap(null);

    let myFrom = ((markers.length) * (markers.length - 1)) / 2;
    console.log("myFrom = " + myFrom);
    console.log("length = " + directionsDisplay.length);

    for (let uip = myFrom; uip < directionsDisplay.length; uip++) {
        console.log("uip = " + uip);
        directionsDisplay[uip].setMap(null);
        directionsDisplay[uip] = null;
    }
    directionsDisplay.splice(myFrom, directionsDisplay.length - myFrom);

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
}