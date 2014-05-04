// $(document).ready(function(){
var map;
initialize();
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
  var nyu_infowindows = new Array(buildings.data.length);
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

    var contentString = '<div><div id="infobuttons" flot="left"><button name="post-message" class="post-message" data-id="' +
        buildings.data[i].id +
        '">Post</button></div><br />'+
        '<div id="content">'+
        '<h1 id="firstHeading" class="firstHeading">'+'NYU Secret'+'</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>'+
        '</div></div>';
    contentString = $(contentString);
    attachMessage(marker, contentString[0]);
    var postBtn = contentString.find('button.post-message')[0];
    attachPostWindow(marker, postBtn);
    
    google.maps.event.addListener(marker, 'click', toggleBounce(marker, nyu_building_markers));
    nyu_building_markers[i] = marker;



    // var infowindow = new google.maps.InfoWindow({
    //   content: buildings.data[i].address,
    //   size: new google.maps.Size(50, 50)});

    // google.maps.event.addListener(marker, 'click', function(){
    // infowindow.open(map, marker);});
    // nyu_infowindows[i] = infowindow;


	}

  
  

	// google.maps.event.addListener(map, 'bounds_changed', function(){
	// window.setTimeout(function(){
	// 	map.panTo(marker.getPosition());
	// }, 3000);});


	google.maps.event.addListener(map, 'rightclick', function(event){
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


}


function addMarker(){

}

function attachPostWindow(marker, postBtn) {
  google.maps.event.addDomListener(postBtn, "click", function() {
    console.log($(this).data('id'));
    openPostWindow(marker);
  });
}

function attachMessage(marker, message){
  var infowindow = new google.maps.InfoWindow(
    {content: message,
      size: new google.maps.Size(50, 50)});

  google.maps.event.addListener(marker, 'click', function(){
    infowindow.open(map, marker);
  })
  

}

function openPostWindow(marker){
  var postString = "<form method='get'><div id='postTitle'><h4>Title:&nbsp&nbsp<input type='text' name='title'></h4></input></div><div id='postContent'>"+
  "<h4>Comment:</h4><textarea rows='4' cols='50' name='content'></textarea></div><input type='submit' value='Submit'></form>"

  var postwindow = new google.maps.InfoWindow(
    { content: postString,
      size: new google.maps.Size(50, 50)});
  postwindow.open(map, marker);
  

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
	var contentString = '<div><div id="infobuttons"><button name="remove-marker" class="remove-marker" title="Remove Marker">Remove Marker</button></div><br />'+'<form method="get"><div id="postTitle"><h4>Title:&nbsp&nbsp<input type="text" name="title"></h4></input></div><div id="postContent">'+
  '<h4>Comment:</h4><textarea rows="4" cols="50" name="content"></textarea></div><input type="submit" value="Submit"></form></div>';

    contentString = $(contentString);
    attachMessage(marker, contentString[0]);

    var removeBtn = contentString.find('button.remove-marker')[0];
    console.log(removeBtn);
    google.maps.event.addDomListener(removeBtn, "click", function() {
      marker.setMap(null);
    });

    google.maps.event.addListener(marker, 'click', toggleBounce(marker, nyu_building_markers));
    
}





function closeAllInfoWindow(){
  for (var i=0; i<nyu_infowindows.length; i++){
    nyu_infowindows[i].close();
  }

}
//google.maps.event.addDomListener(window, 'load', initialize);

var closeButton = document.getElementById('closeAll');
google.maps.event.addDomListener(closeButton, 'click', closeAllInfoWindow);
var homeButton = document.getElementById('goHome');
google.maps.event.addDomListener(homeButton, 'click', function(){map.setCenter(washingtonSquare)});


function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;
// });