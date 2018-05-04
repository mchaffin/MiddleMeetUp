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



// Global variables
var addressesArr = [];
var markersArr = [];
var origin = "";
var destination = "";
var $middleMap = $("#middleMap");
var place_id0 = "";
var place_id1 = "";
var midpointCoord = {};


/// Google Directions 
function initMap() {
  //Virtual Directions Service
  var directionsService = new google.maps.DirectionsService;
  //Virtual Directions Renderer
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var middleMap = new google.maps.Map(document.getElementById('middleMap'),

    {
      zoom: 12,
      //Calculated midpoint coords btw Mpls & St Paul Mn
      center: { lat: 44.96, lng: -93.17 }
    });

  directionsDisplay.setMap(middleMap);

  var onClickHandler = function (event) {
    event.preventDefault();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('Run').addEventListener('click', onClickHandler);

  var midPtMarker = new google.maps.Marker({
    position:{ lat: 44.96, lng: -93.17 },
    label:"M",
    animation: google.maps.Animation.DROP,
    content: '<h1>Howdy!</h1>',
    title: "I'm the Midpoint!ß",
    map: middleMap
  });

  var infowindow = new google.maps.InfoWindow({
    content: "<h1>Howdy!</h1><p>I'm the Middle Point between Minneapolis and St. Paul MN</p>"
  });

  midPtMarker.addListener('click', function() {
    infowindow.open(middleMap, midPtMarker);
  });
  
  console.log(midPtMarker);
  
}//End initMap()



function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  // Get origin nd destination 

  origin = document.getElementById('address1').value;
  destination = document.getElementById('address2').value;

  // Push origin and destination to Firebase
  database.ref().push({
    origin: origin,
    destination: destination,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });


  //Utilizes .route in directionsService to perform AJAX call 
  directionsService.route({
    // Save a call to DOM use origin and destination
    origin: document.getElementById('address1').value,
    destination: document.getElementById('address2').value,
    travelMode: 'DRIVING'

  }, function (response, status) {
    if (status === 'OK') {

      console.log("Google Directions API JSON Response: ");
      console.log(response);

      console.log("place_id of Address One: ");
      console.log(response.geocoded_waypoints["0"].place_id);

      place_id0 = response.geocoded_waypoints["0"].place_id;

      console.log("place_id of Address Two: ");
      console.log(response.geocoded_waypoints["1"].place_id);
      place_id1 = response.geocoded_waypoints["1"].place_id;

      addressesArr.push(place_id0, place_id1);

      //calls function to extract coordinates
      extractCoordinates(place_id0, place_id1);

      directionsDisplay.setDirections(response);

      
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}//End calculateAndDisplayRoute()

// Fct drawMarkers consumes two arguments: an initialized map rendered map and an array of objs with containing lat/lng for each of the markers to be drawn, then executes drawing those markers on the given map
function drawMarkers(map, markerArr) {
  
  for (var i = 0; i < markersArr.length; i++) {
    // Add marker
    addMarker(markersArr[i]);
  }

  function addMarker(props){
    var marker = new google.maps.Marker({ position:props.coord, map:map});

    
  }

};//End drawMarkers()