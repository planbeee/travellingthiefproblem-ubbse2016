let modal;
let modalClk;

function openPopUp() {
    // Get the modal
    modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        document.getElementById("itemsSelect").value = 0;
        removeLastMarker();
    }

    // When the user clicks anywhere outside of the modal, close it
    /*window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("itemsSelect").value = 0;
        }
    }*/
}


async function clickBlocked() {
    // Get the modal
    modalClk = document.getElementById('blockModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    modalClk.style.display = "block";

    //if (directionNum == (markerLabelNum + markerLabelNum + 1) / 2) {
    //modal.style.display = "none";
    //}

}

function sendData() {
    function packageBuilder(markers, directionDisp) {
        this.markers = markers;
        this.directionDisp = directionDisp;
    }

    let toSendPackage = new packageBuilder(markers, directionsDisplay);


    $.ajax({
        type: 'POST',
        url: 'http://localhost/Thief/sendData.php',
        data: {
            username: $('#username').val(),
            password: $('#password').val()
        },

        success: function(response) {
            console.log(response);

            alert(response);
            //result = response;
            // return response; // <- I tried that one as well
        }
    });

    /*$.ajax({
            method: "POST",
            //url: "http://localhost:13337/",
            url: "http://localhost/sendData.php",
            data: { sentPackage: toSendPackage, location: "Boston" }
        })
        .done(function(msg) {
            alert("Data Saved: " + msg);
        });*/
}

function addToPopSelect() {
    let select = document.getElementById("itemsSelect");

    for (let i = 0; i < 10; i++) {
        let option = document.createElement("option");
        option.id = i;
        option.text = "Item[" + i + "]: value: " + valItm[i] + " | weight: " + wghItm[i];
        option.value = valItm[i] + "%%%" + wghItm[i];

        select.add(option);
    }
}

let gatherVal = [],
    gatherWhg = [],
    wut;

function Gather() {
    itemsbyCities[itemsbyCities.length] = new Array(10);
    for (let j = 0; j < 10; j++) {
        itemsbyCities[itemsbyCities.length - 1][j] = 0;
    }

    gatherVal = [];
    gatherWhg = [];
    wut = $("#itemsSelect option:selected");
    for (let i = 0; i < wut.length; i++) {
        //console.log(wut[i]);
        let markerData = wut[i].value.split("%%%"); //document.getElementById(i).value.split("%%%");
        gatherVal[i] = markerData[0];
        gatherWhg[i] = markerData[1];
        itemsbyCities[itemsbyCities.length - 1][wut[i].id] = 1;
    }

    //console.log(markerGkeeper);
    markers[markers.length] = new marker(wut.length, gatherVal, gatherWhg, markerGkeeper
        /*new google.maps.Marker({
                label: markerLabelNum.toString(),
                position: latlngX,
                map: map
            })*/
    )


    addToSelect();
    markerLabelNum++;

    modal.style.display = "none";
}