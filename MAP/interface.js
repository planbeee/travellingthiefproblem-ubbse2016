// ============================================
// Opening the PopUp where you select the items
// ============================================
function openPopUp() {
    //show the modal
    $('#myModal').fadeIn(300);

    // When the user clicks on <span> (x), close the modal
    $('#close').click(function() {
        $('#myModal').fadeOut(300);
        removeLastMarker();
    })

    // When the user clicks anywhere outside of the modal, close it
    /*window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("itemsSelect").value = 0;
        }
    }*/
}


// ==============================================================
// Bringing up the PopUp that is the transparent black background
// that blocks clicks on the map while the routes are calculated
// Block the user from interacting with the map
// ==============================================================
async function clickBlocked() {
    $('#blockModal').fadeIn(250);
}


// ================================================================
// Generate and add the values and weights of items to the <SELECT>
// that is the PopUp which comes up when the map is clicked
// ================================================================
let valItm = [],
    wghItm = [];

function addToPopSelect() {
    for (let i = 0; i < 10; i++) {
        valItm[i] = Math.floor(Math.random() * 200) + 100;
        wghItm[i] = Math.floor(Math.random() * 50) + 10;
    }

    let select = document.getElementById("itemsSelect");

    for (let i = 0; i < 10; i++) {
        let option = document.createElement("option");
        option.id = i;
        option.text = "Item[" + i + "]: value: " + valItm[i] + " | weight: " + wghItm[i];
        option.value = valItm[i] + "%%%" + wghItm[i];

        select.add(option);
    }
}


// ================================================================================
// Gather the values and weights of items selected by user to be sent to the server
// ================================================================================
let itemsbyCities = [];

function Gather() {
    let gatherItm,
        gatherVal = [],
        gatherWhg = [];

    itemsbyCities[itemsbyCities.length] = new Array(10);
    for (let j = 0; j < 10; j++) {
        itemsbyCities[itemsbyCities.length - 1][j] = 0;
    }

    gatherVal = [];
    gatherWhg = [];
    gatherItm = $("#itemsSelect option:selected");
    for (let i = 0; i < gatherItm.length; i++) {
        let markerData = gatherItm[i].value.split("%%%");
        gatherVal[i] = markerData[0];
        gatherWhg[i] = markerData[1];
        itemsbyCities[itemsbyCities.length - 1][gatherItm[i].id] = 1;
    }

    markers[markers.length] = new marker(gatherItm.length, gatherVal, gatherWhg, markerKeeper
        /*new google.maps.Marker({
                label: markerLabelNum.toString(),
                position: latlngX,
                map: map
            })*/
    )


    addToSelect();
    markerLabelNum++;

    $('#myModal').fadeOut(300);
}


// ====================================================
// Sending the data gathered from the map to the server
// ====================================================
let expt = [];

function sendData() {

    let s = "";
    distMatrix = new Array(markers.length);

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

    let k = 0,
        l = 1,
        j = 0;

    while (l < expt.length) {
        while ((directionDisplay[j].beg != expt[k] || directionDisplay[j].end != expt[l]) && (directionDisplay[j].end != expt[k] || directionDisplay[j].beg != expt[l])) {
            j++;
        }

        directionDisplay[j].dir.polylineOptions.strokeColor = 'red';
        directionDisplay[j].dir.polylineOptions.strokeOpacity = 0.3;
        directionDisplay[j].dir.polylineOptions.strokeWeight = 7;
        directionDisplay[j].dir.setMap(map);
        k++;
        l++;
        j = 0;
    }


    var adat = 'AlgType=' +
        encodeURIComponent(algType) +
        '&Weight=' +
        encodeURIComponent(wghItm) +
        '&Value=' +
        encodeURIComponent(valItm) +
        '&ItemsbyCities=' +
        encodeURIComponent(itemsbyCities) +
        '&ItemsLength=' +
        encodeURIComponent(itemsbyCities[0].length) +
        '&Distances=' +
        encodeURIComponent(distMatrix) +
        '&DistLength=' +
        encodeURIComponent(distMatrix[0].length);

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/',
        data: adat,

        success: function(response) {
            expt = [];
            let citiesWthItems = response.split(":");
            let citiesAndItems = [];
            let sackText = "";
            for (let i = 0; i < citiesWthItems.length; i++) {
                citiesAndItems[i] = citiesWthItems[i].split(".");
                expt[i] = parseInt(citiesAndItems[i][0]);
                sackText += "City: " + citiesAndItems[i][0] + "<br>Values: ";

                for (let j = 1; j < citiesAndItems[i].length; j++) {
                    sackText += citiesAndItems[i][j] + " ";
                }
                sackText += "<br><br>";
            }
            document.getElementById("sack").innerHTML = sackText;
            expt[expt.length] = expt[0];
        }
    });
}