var map;
function initialize() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(40.730823,-73.997332)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var marker = new google.maps.Marker({
	position: map.getCenter(),
	map: map,
	title: 'Click to zoom'
	});


	google.maps.event.addListener(map, 'bounds_changed', function(){
	window.setTimeout(function(){
		map.panTo(marker.getPosition());
	}, 3000);});

	google.maps.event.addListener(marker, 'click', function(){
	map.setZoom(8);
	map.setCenter(marker.getPosition());
	});

}
//google.maps.event.addDomListener(window, 'load', initialize);






function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;