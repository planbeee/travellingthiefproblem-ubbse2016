function openPopUp() {
	//show the modal
	$('#myModal').fadeIn(300);

    // When the user clicks on <span> (x), close the modal
    $('#close').click(function() {
        $('#myModal').fadeOut(300);  // hide the modal;
        //document.getElementById("itemsSelect").value = 0;
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


async function clickBlocked() {
    // Block the user from interaction whit the map
    $('#blockModal').fadeIn(250);
}

function sendData() {
    function packageBuilder(markers, directionDisp) {
        this.markers = markers;
        this.directionDisp = directionDisp;
    }

    let toSendPackage = new packageBuilder(markers, directionsDisplay);


    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080',
        data: {
            username: 'imi'
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

    $('#myModal').fadeOut(300);
}