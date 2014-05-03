initialize = function (latitude, longitude) {
  return function() {
    var latLng = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
      zoom: 15,
      center: latLng
    };
    var map = new google.maps.Map (document.getElementById('map-canvas'), mapOptions);
  };
}

getLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition (showPosition);
  }
}

showPosition = function (position) {
  initialize(position.coords.latitude, position.coords.longitude)();
}
