///////// ** Firebase Configuration **//////////////
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
  ///////// ** End Firebase Configuration **//////////////

//midPtCalc(): consumes two geographical points as objects with respective lats and lngs, returns a midpoint with a lat and lng 
/*PseudoCode For MidPoint Calculation given N number of points with latitudes and longitudes */
/**Simple Average of Input Points */
/**This method finds a simple average latitude and longitude for the locations in 'Your Places'. This is equivalent to finding a midpoint on a flat rectangular projection map. When the distance between locations is less than 250 miles (400 km), this method gives a close approximation to the true geographic midpoint in Method A. */

function extractCoordinates(place_idA, place_idB) {
    place_idA = place_idA.toString();
    place_idB = place_idB.toString();

    var queryURLA = 'https://maps.googleapis.com/maps/api/geocode/json?place_id=' + place_idA + '&key=AIzaSyC-WAHRv2HNx3C-2GwVypyKRA0-YujTH9s';

    var queryURLB = 'https://maps.googleapis.com/maps/api/geocode/json?place_id=' + place_idB + '&key=AIzaSyC-WAHRv2HNx3C-2GwVypyKRA0-YujTH9s';

    //First AJAX Call
    $.ajax({
        type: "GET",
        url: queryURLA

    }).then(function (response) {
        // setting coordinates to JSON response "location" from callback lat, lng
        var coordinatesA = response.results[0].geometry.location;

        //Second AJAX Call
        $.ajax({
            type: "GET",
            url: queryURLB

        }).then(function (response) {
            var coordinatesB = response.results[0].geometry.location;

            // Calc midpt given coordinates from AJAX calls
            midPtCalc(coordinatesA, coordinatesB);

            //Push Calculated Midt coords to Firebase for storage
            database.ref().push({
                midPt: midpointCoord.coord,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
              });

            // call searchGooglePlaces to fill CommonGround recommendations
            searchGooglePlaces(midpointCoord);
            
            console.log("EXC Midpoint");
            console.log(midpointCoord);

        });
        //return response.results[0].geometry.location;;
    });
}; // End extractCoordinates() function.

function midPtCalc(ptA, ptB) {
    //Initialize empty Lat and Lng for MidPt
    var midPtLat;
    var midPtLng;

    console.log("Input Coords");
    console.log(ptA, ptB);

    //Extract Lat and Lng from input pts
    var ptALat = ptA.lat;
    var ptBLat = ptB.lat;

    var ptALng = ptA.lng;
    var ptBLng = ptB.lng;

    //Calc simple avg of coordinates
    midPtLat = (ptALat + ptBLat) / 2;
    midPtLng = (ptALng + ptBLng) / 2;

    // Set Global midpoint variable
    midpointCoord = { coord: {lat: midPtLat, lng: midPtLng }};

    console.log("Mid Point Coordinate: ");
    console.log(midpointCoord);

};// End midPtCalc() function.  

