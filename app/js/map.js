var map;

function HomeControl(controlDiv, map){
	// Set CSS styles for the DIV containing the control
	// Setting padding to 5 px will offset the control
	// from the edge of the map.
	controlDiv.style.padding = '5px';

	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = 'white';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderWidth = '2px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to set the map to Home';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '12px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = '<strong>Home</strong>';
	controlUI.appendChild(controlText);
	google.maps.event.addDomListener(controlUI, 'click', function(){
	map.setCenter(washingtonSquare);});
}


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

 //  var marker = new google.maps.Marker({
	// position: washingtonSquare,
	// map: map,
	// title: buildingname
	// });
  var nyu_building_markers = new Array(buildings.data.length);
  for (var i=0; i<buildings.data.length; i++){
  	
  	var markerlatlng = new google.maps.LatLng(buildings.data[i].Latitute, buildings.data[i].Longtitue);
  	var buildingname = buildings.data[i].building_name;
  	var marker = new google.maps.Marker({
	position: markerlatlng,
	animation: google.maps.Animation.DROP,
	map: map,
	title: buildingname,
  icon: 'images/nyubuilding.png'
	});
	google.maps.event.addListener(marker, 'click', toggleBounce(marker, nyu_building_markers));
	nyu_building_markers[i] = marker;
	

	}

  
  

	// google.maps.event.addListener(map, 'bounds_changed', function(){
	// window.setTimeout(function(){
	// 	map.panTo(marker.getPosition());
	// }, 3000);});

	


	google.maps.event.addListener(map, 'click', function(event){
		placeMarker(event.latLng);
	});


	// var infowindow = new google.maps.InfoWindow({
 //    content: 'Change the zoom level',
 //    position: washingtonSquare
	// });
 //  	infowindow.open(map);

 //  	google.maps.event.addListener(map, 'zoom_changed', function() {
 //    var zoomLevel = map.getZoom();
 //    map.setCenter(washingtonSquare);
 //    infowindow.setContent('Zoom: ' + zoomLevel);
 //  });
	var homeControlDiv = document.createElement('div');
	var homeControl = new HomeControl(homeControlDiv, map);
	homeControlDiv.index = 1
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);


}

function addMarker(){

}


function toggleBounce(marker, nyu_building_markers) {
  return function() {
  	for (var i=0; i < nyu_building_markers.length; i++){
      if (nyu_building_markers[i].getAnimation() != null){
        nyu_building_markers[i].setAnimation(null)
      }
    }
   
	   marker.setAnimation(google.maps.Animation.BOUNCE);
	  
  }
  
}


function placeMarker(location){
	var marker = new google.maps.Marker({
		position: location,
		map: map,
    draggable: true,

	});
  //google.maps.event.addListener(marker, 'click', toggleBounce(marker, null));
	marker.setTitle('user id');
	map.setCenter(location);
	map.setZoom(16);
	//attachSecretMessage(marker, 'hi, this is a secret')
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