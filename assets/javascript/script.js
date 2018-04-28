function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('directionsMap'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);

    var onClickHandler = function(event) {
        event.preventDefault();
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('Run').addEventListener('click', onClickHandler);

   // document.getElementById('address1').addEventListener('change', onChangeHandler);
   // document.getElementById('address2').addEventListener('change', onChangeHandler);
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      console.log("Getting here");
    directionsService.route({
        
      origin: document.getElementById('address1').value,
      destination: document.getElementById('address2').value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }