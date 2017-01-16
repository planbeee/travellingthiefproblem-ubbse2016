function openPopUp() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        document.getElementById("itemsSelect").value = 0;
        //removeMarker();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("itemsSelect").value = 0;
        }
    }
}

let modal;
async function clickBlocked() {
    // Get the modal
    modal = document.getElementById('blockModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    //if (directionNum == (markerLabelNum + markerLabelNum + 1) / 2) {
    //modal.style.display = "none";
    //}

}

function remMarkWithSel() {
    let toRem = $("#select option:selected").text();

    removeMarker(Number(toRem));
}

function sendData() {
    function packageBuilder(markers, directionDisp) {
        this.markers = markers;
        this.directionDisp = directionDisp;
    }

    let toSendPackage = new packageBuilder(markers, directionsDisplay);

    $.ajax({
            method: "POST",
            url: "http://localhost:13337/",
            data: { sentPackage: toSendPackage, location: "Boston" }
        })
        .done(function(msg) {
            alert("Data Saved: " + msg);
        });
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

function Gather() {
    let gatherVal = [];
    let gatherWhg = [];
    let wut = $("#itemsSelect option:selected");
    for (let i = 0; i < wut.length; i++) {
        //console.log(wut[i]);
        let markerData = document.getElementById(i).value.split("%%%");
        gatherVal[i] = markerData[0];
        gatherWhg[i] = markerData[1];
    }

    markers[markers.length] = new marker(wut.length, gatherVal, gatherWhg, new google.maps.Marker({
        label: markerLabelNum.toString(),
        position: latlngX,
        map: map
    }))

    toSend[markers.length - 1] = new Array(100);

    addToSelect();
    markerLabelNum++;
}