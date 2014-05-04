var map;
function initialize() {
  var washingtonSquare = new google.maps.LatLng(40.730823,-73.997332)
  var mapOptions = {
    zoom: 12,
    center: washingtonSquare,
    disableDefaultUI: true,
    panControl: true,
    zoomControl: true,
  	mapTypeControl: true,
  	scaleControl: false,
  	streetViewControl: true,
  	overviewMapControl: true
  	



  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var marker = new google.maps.Marker({
	position: map.getCenter(),
	map: map,
	title: 'Click to zoom'
	});


	// google.maps.event.addListener(map, 'bounds_changed', function(){
	// window.setTimeout(function(){
	// 	map.panTo(marker.getPosition());
	// }, 3000);});

	google.maps.event.addListener(marker, 'click', function(){
	map.setZoom(16);
	map.setCenter(marker.getPosition());

	});


	google.maps.event.addListener(map, 'click', function(event){
		placeMarker(event.latLng);
	});


	var infowindow = new google.maps.InfoWindow({
    content: 'Change the zoom level',
    position: washingtonSquare
	});
  	infowindow.open(map);

  	google.maps.event.addListener(map, 'zoom_changed', function() {
    var zoomLevel = map.getZoom();
    map.setCenter(washingtonSquare);
    infowindow.setContent('Zoom: ' + zoomLevel);
    updateBuildingList(zoomLevel); 
  });





}

function placeMarker(location){
	var marker = new google.maps.Marker({
		position: location,
		map: map
	});
	marker.setTitle('user id');
	map.setCenter(location);
	map.setZoom(16);
	attachSecretMessage(marker, 'hi, this is a secret')
}


function attachSecretMessage(marker, message){
	var infowindow = new google.maps.InfoWindow(
		{content: message,
			size: new google.maps.Size(50, 50)});

	google.maps.event.addListener(marker, 'click', function(){
		infowindow.open(map, marker);
	})
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