
var place1 = "";
var place2 = "";
var type = "";
var radius = 10;

$(".btn").on('click', function (event) {
    event.preventDefault();

    place1 = $("#address1").val().trim();
    place2 = $("#address2").val().trim();
    type = $("select#type").val().trim();
    radius = $("select#radius").val().trim();

    console.log(place1 + " " + place2);

    var location = {
        origin: place1,
        origin1: place2,
        type: type,
        radius: radius
    };

    database.ref().push(location);

    console.log(type);
    console.log(radius);

});