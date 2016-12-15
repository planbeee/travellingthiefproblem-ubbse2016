/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
/*function myFunction() {
    //alert("clicked")
    document.getElementById("myDropdown").classList.toggle("show");
}*/

// Close the dropdown menu if the user clicks outside of it
/*window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {

            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }*/
/*function autoSizeSelect() {
    var select = document.getElementById('select');
    select.size = select.length + 1;
}*/


/*function myFunction() {
    var select = document.getElementById("select");
    var option = document.createElement("option");
    option.text = "Kiwi";
    select.add(option);
    alert("Sat de sapari...");
}*/

/*google.maps.event.addListener(map, "click", function(event) {
    var latX = event.latLng.lat();
    var lngX = event.latLng.lng();
    var x = { lat: latX, lng: lngX };
    addMarker(x);

    if (markerLabelNum > 1) {
        for (var i = 0; i < markerLabelNum - 1; i++) {
            calculateAndDisplayRoute(markers[i].getPosition(), markers[markerLabelNum - 1].getPosition());
        }
    }

    var x = document.getElementById("sel");
    var option = document.createElement("option");
    option.text = markers[markers.length - 1].getPosition();
    x.add(option);

    //if (markers[markers.length - 1].getPosition().toString == "46.556618, 23.907623") {
    //    alert("Sat de sapari...");
    //}
});*/