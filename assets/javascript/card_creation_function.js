//inside AJAX call and assumes that we call the response "suggestions"

for (var j = 0; j < suggestions.length; j++){
    var result = suggestions.result[j];
    var placeDiv = $("<div class='card'>");

    //adds image
    placeDiv.append("<div class='card-image'><img src='" + result.icon + "' alt='place image'></div>");
    //adds name and type
    placeDiv.append("<header class='card-header'><p class='card-header-title'>" + result.name + "</p><p class='title is-6'>" + result.types);
    //adds other content
    placeDiv.append("<div class='card-content'><div class='content'>Rating: " + result.rating + "<br>Address: " + result.formatted_address + "<br><a href='" + result.website + "'>Website</a></div></div>");

    $("#suggestions").append(placeDiv);

}

