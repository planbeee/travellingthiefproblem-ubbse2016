function openPopUp() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        document.getElementById("numOfItemsInput").value = 0;
        //removeMarker();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("numOfItemsInput").value = 0;
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
    $.ajax({
            method: "POST",
            url: "http://localhost:13337/",
            data: { name: "John", location: "Boston" }
        })
        .done(function(msg) {
            alert("Data Saved: " + msg);
        });
}