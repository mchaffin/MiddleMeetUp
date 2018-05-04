jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

function searchGooglePlaces(midpoint) {
    //var searchString = searchString;
    // Constructing a queryURL using the search term 
    var lat = midpointCoord.coord.lat;
    var lon = midpointCoord.coord.lng;

    var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lon + "&radius=10000&type=bar&key=AIzaSyD0QSfHIgzXIakE7DMJpdq18X6A8X4OHy4";

  

    // Performing an AJAX request with the queryURL
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    // After data comes back from the request
    .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.results;


        for (var j = 0; j < results.length; j++){
            var result = results[j];
            var placeDiv = $("<div class='card'>");
            
            // //adds image
            placeDiv.append("<div class='card-image'><img src='https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + result.photos[0].photo_reference + "&key=AIzaSyD0QSfHIgzXIakE7DMJpdq18X6A8X4OHy4' alt='place image'></div>");
            //adds name and type
            placeDiv.append("<div class = 'media-content'><p class='title is-6' id='place-card'>" + result.name + "</p><p class='subtitle is-6'>");
            //adds other content
            placeDiv.append("<div class='content'>Rating: " + result.rating + "<br>Address: " + result.formatted_address + "</div></div>");
            $("#suggestions").append(placeDiv);
        }
    });    
 }

 window.onscroll = function() {scrollFunction()};

 function scrollFunction() {
     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
         document.getElementById("myBtn").style.display = "block";
     } else {
         document.getElementById("myBtn").style.display = "none";
     }
 }
 function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
}