var config = {
    apiKey: "AIzaSyBIaYZCktWCryF8cMhxK-XUNzIJibtquU0",
    authDomain: "middlemeetup-a2868.firebaseapp.com",
    databaseURL: "https://middlemeetup-a2868.firebaseio.com",
    projectId: "middlemeetup-a2868",
    storageBucket: "middlemeetup-a2868.appspot.com",
    messagingSenderId: "482753535895"
};
firebase.initializeApp(config);

var database = firebase.database();
var place1 = "";
var place2 = "";

$(".btn").on('click', function(event){
    event.preventDefault();

    place1 = $("#address1").val().trim();
    place2 = $("#address2").val().trim();

    console.log(place1 + " " + place2);

    var location = {
        origin: place1,
        origin1: place2
    };

    database.ref().push(location);

});

google.maps.event.addDomListener(window, 'load', function () {
    var from_places = new google.maps.places.Autocomplete(document.getElementById('address1'));
    var to_places = new google.maps.places.Autocomplete(document.getElementById('address2'));

    google.maps.event.addListener(from_places, 'place_changed', function () {
        var from_place = from_places.getPlace();
        var from_address = from_place.formatted_address;
        $('#origin').val(from_address);
    });

    google.maps.event.addListener(to_places, 'place_changed', function () {
        var to_place = to_places.getPlace();
        var to_address = to_place.formatted_address;
        $('#destination').val(to_address);
    });
});
