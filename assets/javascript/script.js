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



$(".btn").on('click', function (event) {
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