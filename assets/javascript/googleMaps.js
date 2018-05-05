// In the following code, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
//                                  // Global variables
var map;                            // main map
var markers = [];                   // marker array
var origin = "";                    // initial origin location - geolocation sourced
var destination = "";               // inital destination location - geolocation sourced
var $middleMap = $("#middleMap");   // Jquery var for main map selector
var place_id0 = "";                 // Google GeoPlace0
var place_id1 = "";                 // Google GeoPlace1
var midpointCoord = {};             // mid-point

// Initialze map and wait for click
function initMap() {
    // Set intial map focus
    var twinCites = { lat: 44.96, lng: -93.17 };
    // Virtual Directions Service
    var directionsService = new google.maps.DirectionsService;
    // Virtual Directions Renderer
    var directionsDisplay = new google.maps.DirectionsRenderer;
    // Virtual Geocoder
    var geocoder = new google.maps.Geocoder;
    // Virtual InfoWindow
    var infowindow = new google.maps.InfoWindow;
    
    // main event listener - click handler
    var onClickHandler = function (event) {
        event.preventDefault();
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };

    map = new google.maps.Map(document.getElementById('middleMap'), {
        zoom: 12,
        center: twinCites,
        mapTypeId: 'terrain'
    });

    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function(event) {
        addMarker(event.latLng);
    });
    
    // This event listener will call onClickHandler() when Run element ID is clicked.
    document.getElementById('Run').addEventListener('click', onClickHandler);
    // Add other click events here.
    // document.getElementById('place-id').addEventListener('click', geocodePlaceId);
    // Adds a marker at the center of the map.
    addMarker(twinCites);
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

// Calculate and display route - not using driving directions here
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    // Get origin and destination 
    origin = document.getElementById('address1').value;
    destination = document.getElementById('address2').value;

    //Utilizes .route in directionsService to perform AJAX call 
    directionsService.route({
      // Save a call to DOM use origin and destination
      origin: document.getElementById('address1').value,
      destination: document.getElementById('address2').value,
      travelMode: 'DRIVING'

    }, function (response, status) {
      if (status === 'OK') {
        place_id0 = response.geocoded_waypoints["0"].place_id;
        place_id1 = response.geocoded_waypoints["1"].place_id;
        // Call mid-point function.
        extractCoordinates(place_id0, place_id1);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

// Get geocode of a place ID.
function geocodePlaceId(geocoder, map, infowindow, placeid) {
    // need to get Place ID from Google Places
    var placeId = document.getElementById('place-id').value;

    geocoder.geocode({'placeId': placeId}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(11);
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
        } else {
        window.alert('Geocoder failed due to: ' + status);
        }
    });
}