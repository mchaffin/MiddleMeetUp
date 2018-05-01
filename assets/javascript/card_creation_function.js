function searchGooglePlaces(lat, lon) {
    //var searchString = searchString;
    // Constructing a queryURL using the search term   
    var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lon + "&radius=10&key=AIzaSyD0QSfHIgzXIakE7DMJpdq18X6A8X4OHy4";

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
            placeDiv.append("<header class='card-header'><p class='card-header-title'>" + result.name + "</p><p class='title is-6'>" + result.types);
            //adds other content
            placeDiv.append("<div class='card-content'><div class='content'>Rating: " + result.rating + "<br>Address: " + result.formatted_address + "</div></div>");
            $("#google-places-here").append(placeDiv);
        }
    });    
 }
