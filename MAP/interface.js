function autoSizeSelect() {
    var select = document.getElementById('sel');
    select.size = select.length + 1;
}

function myFunction() {
    var x = document.getElementById("sel");
    var option = document.createElement("option");
    option.text = "Kiwi";
    x.add(option);
    alert("Sat de sapari...");
}