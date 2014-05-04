
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

  


  getUserLocation();

 


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
      icon: 'images/nyubuilding.png',
      data: buildings.data[i]
    });

    // var contentString = '<div><div id="infobuttons" flot="left"><button name="post-message" class="post-message" data-id="' +
    //     buildings.data[i].id +
    //     '">Post</button></div><br />'+
    //     '<div id="content">'+
    //     '<h1 id="firstHeading" class="firstHeading">'+'NYU Secret'+'</h1>'+
    //     '<div id="bodyContent">'+
    //     '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    //     'sandstone rock formation in the southern part of the '+
    //     'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    //     'south west of the nearest large town, Alice Springs; 450&#160;km '+
    //     '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    //     'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    //     'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    //     'Aboriginal people of the area. It has many springs, waterholes, '+
    //     'rock caves and ancient paintings. Uluru is listed as a World '+
    //     'Heritage Site.</p>'+
    //     '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    //     'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    //     '(last visited June 22, 2009).</p>'+
    //     '</div>'+
    //     '</div></div>';
    var contentString = _.template(JST['infoWindow'], buildings.data[i]);

    contentString = $(contentString);
    attachMessage(marker, contentString[0]);

    var postBtn = contentString.find('button.post-message')[0];
    attachPostWindow(marker, postBtn);

    var saveBtn = contentString.find('button.saveBtn')[0];
    attachSave(marker, saveBtn);
    
    // google.maps.event.addListener(marker, 'click', toggleBounce(marker, nyu_building_markers));
    // nyu_building_markers[i] = marker;

    attachMarker(marker);
  

	}

  
  

	// google.maps.event.addListener(map, 'bounds_changed', function(){
	// window.setTimeout(function(){
	// 	map.panTo(marker.getPosition());
	// }, 3000);});

   
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var searchBox = new google.maps.places.SearchBox(input);
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    search_markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      // Create a marker for each place.
      var search_marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      search_markers.push(search_marker);
      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
    });

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
      var bounds = map.getBounds();
      searchBox.setBounds(bounds);
    });

	google.maps.event.addListener(map, 'rightclick', function(event){
		placeMarker(event.latLng);
	});



  // var panoramioLayer = new google.maps.panoramio.PanoramioLayer();
  // panoramioLayer.setMap(map);

  // var photoPanel = document.getElementById('photo-panel');
  // map.controls[google.maps.ControlPosition.RIGHT_TOP].push(photoPanel);

  // google.maps.event.addListener(panoramioLayer, 'click', function(photo) {
  //   var li = document.createElement('li');
  //   var link = document.createElement('a');
  //   link.innerHTML = photo.featureDetails.title + ': ' +
  //       photo.featureDetails.author;
  //   link.setAttribute('href', photo.featureDetails.url);
  //   li.appendChild(link);
  //   photoPanel.appendChild(li);
  //   photoPanel.style.display = 'block';
  // });


	// var infowindow = new google.maps.InfoWindow({
 //    content: 'Change the zoom level',
 //    position: washingtonSquare
	// });
 //  	infowindow.open(map);

	google.maps.event.addListener(map, 'zoom_changed', function() {
    var zoomLevel = map.getZoom();
    // map.setCenter(washingtonSquare);
    // infowindow.setContent('Zoom: ' + zoomLevel);
    updateBuildingList(map);
  });

  google.maps.event.addListener(map, 'center_changed', function() {
    updateBuildingList(map);
  });


}


function getUserLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{alert("Geolocation is not supported by this browser.");}
  }
function showPosition(position)
  {
    var userlatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var user_marker = new google.maps.Marker({
      position: userlatlng,
      animation: google.maps.Animation.BOUNCE,
      map: map,
      title: "You are here.",
      icon: 'images/user.png'
    });



  }

function attachSave(marker, saveBtn) {
  $(saveBtn).click(function(e){
    $infowindow = $(this).parents(".info_window_container");
    $postList = $infowindow.find(".post_list");
    var content = $infowindow.find("textarea").val();
    if (content.trim() != "") {
      var data = {
        building_id: marker.data.id,
        content: content,
      }
      marker.data.posts.push(data);
      marker.data.update(function(err, building){
        if(err) {
          alert("O oh");
        }
        else{
          $postList.append(_.template(JST['postList'], data));
        }
      });
    }


    $postList.slideDown();
    $infowindow.find(".add_post").slideUp();
  });
}


function attachMarker(marker) {
  google.maps.event.addListener(marker, 'click', function(e){
    console.log(marker.data);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    // nyu_building_markers[i] = marker;
    // toggleBounce(marker, nyu_building_markers)();
        
  });
}

function attachPostWindow(marker, postBtn) {
  // google.maps.event.addDomListener(postBtn, "click", function() {
  //   // console.log($(this).data('id'));
  //   openPostWindow(marker);
  // });
  $(postBtn).click(function(e){
    $infowindow = $(this).parents(".info_window_container");
    $infowindow.find(".post_list").slideUp();
    $infowindow.find(".add_post").slideDown();

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
  var postString = "<div id='postboard'><form method='get'><table><tr><td id='postTitle'><h4>Title:&nbsp&nbsp</h4></td><td><input type='text' name='title'></input></td></tr>"+
  "<tr><td><h4>Type:&nbsp&nbsp</h4></td><td id='posttype'><select id='type'><option value='Class'>Class</option><option value='Event'>Event</option><option value='Facilities'>Facilities</option>"+
  "<option value='LostFound'>Lost&Found</option><option value='Message'>Message</option><option value='Others'>Others</option></td></tr>"+
  "<tr><td><h4>Comment:&nbsp&nbsp</h4></td><td id='postContent'><textarea rows='4' cols='50' name='content'></textarea></td></tr>"+
  "<tr><td></td><td align='right'><input type='submit' value='Submit'></td></tr></table></form></div>";

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
    // console.log(removeBtn);
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
  // script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&libraries=places,panoramio&' +
  //     'callback=initialize';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&libraries=places&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;
// });