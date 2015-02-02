
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

 


  nyu_building_markers = new Array(buildings.data.length);
  nyu_infowindows = new Array(buildings.data.length);

  for (var i=0; i<buildings.data.length; i++){
  	var markerlatlng = new google.maps.LatLng(buildings.data[i].Latitute, buildings.data[i].Longtitue);
  	var buildingname = buildings.data[i].building_name;
  	var buildingimg = { url: 'images/nyubuilding1.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(30, 30)
  };


    var marker = new google.maps.Marker({
      position: markerlatlng,
      animation: google.maps.Animation.DROP,
      map: map,
      title: buildingname,
      icon: buildingimg,
      data: buildings.data[i]
    });

    var contentString = _.template(JST['infoWindow'], buildings.data[i]);

    contentString = $(contentString);
    attachMessage(marker, contentString[0]);

    var postBtn = contentString.find('button.post-message')[0];
    attachPostWindow(marker, postBtn);

    var saveBtn = contentString.find('button.saveBtn')[0];
    attachSave(marker, saveBtn);

    var like = contentString.find('a.like_link');
    attachLike(marker, like);
    
    google.maps.event.addListener(marker, 'click', toggleBounce(marker, nyu_building_markers));
    nyu_building_markers[i] = marker;

    attachMarker(marker);
  

	}

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





	google.maps.event.addListener(map, 'zoom_changed', function() {
    var zoomLevel = map.getZoom();
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
      icon: 'images/user1.png'
    });
  }

function attachLike(marker, like) {
  $(like).click(function(e){
    e.preventDefault();
    var $post = $(this).parents("li");
    var postId = $post.data("id");
    var post = _.find(marker.data.posts, function(post) {return post._id == postId;});
    if (post) {
      post.likes = (post.likes || 0) + 1;
    }
    else{
      post.likes = 0;
    }
    marker.data.update(function(err, building){
      if (err) {
        alert("O oh");
      }
      else {
        $post.find(".badge").text(post.likes);
      }
      
    });
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
        likes: 0,
      }
      marker.data.posts.push(data);
      marker.data.update(function(err, building){
        if(err) {
          alert("O oh");
        }
        else{
          data._id = building.posts[building.posts.length - 1]._id;
          var html = _.template(JST['postList'], data);
          $postList.append(html);
          attachLike(marker, $postList.find(".like_link").last()[0]);
          generateList();
          updateBuildingList(map);
        }
      });
    }


    $postList.slideDown();
    $infowindow.find(".add_post").slideUp();
  });
}


function attachMarker(marker) {
  google.maps.event.addListener(marker, 'click', function(e){
    marker.setAnimation(google.maps.Animation.BOUNCE);
        
  });
}

function attachPostWindow(marker, postBtn) {
  $(postBtn).click(function(e){
    $infowindow = $(this).parents(".info_window_container");
    $infowindow.find(".post_list").slideUp();
    $infowindow.find(".add_post").slideDown();

  });
}

function attachMessage(marker, message){
  var infowindow = new google.maps.InfoWindow(
    {content: message,
      size: new google.maps.Size(100, 100)});

  google.maps.event.addListener(marker, 'click', function(){
    infowindow.open(map, marker);
  })
  

}

function openPostWindow(marker){
  var postString = "<div id='postboard'><form method='get'><table><tr><td id='postTitle'><h4>Place:&nbsp&nbsp</h4></td><td><input type='text' name='title'></input></td></tr>"+
  "<tr><td><h4>Type:&nbsp&nbsp</h4></td><td id='posttype'><select id='type'><option value='Class'>Class</option><option value='Event'>Event</option><option value='Facilities'>Facilities</option>"+
  "<option value='LostFound'>Lost&Found</option><option value='Message'>Message</option><option value='Others'>Others</option></td></tr>"+
  "<tr><td><h4>Comment:&nbsp&nbsp</h4></td><td id='postContent'><textarea rows='4' cols='50' name='content'></textarea></td></tr>"+
  "<tr><td></td><td align='right'><input type='submit' value='Submit'></td></tr></table></form></div>";

  var postwindow = new google.maps.InfoWindow(
    { content: postString,
      size: new google.maps.Size(80, 50)});
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
	marker.setTitle('user id');
	map.setCenter(location);
	map.setZoom(16);
	var contentString = '<div><div id="infobuttons"><button name="remove-marker" class="remove-marker btn btn-danger">Remove Marker</button></div><br />'+
  '<div id="postContent">'+
  '<h4>Comment:</h4><textarea rows="4" cols="50" class="submitContent" name="content"></textarea></div><button name="submitMessage" class="submitMessage btn btn-success">Submit</button></div>';

    contentString = $(contentString);
    var infowindow = new google.maps.InfoWindow(
    {content: contentString[0],
      size: new google.maps.Size(50, 50)});
      google.maps.event.addListener(marker, 'click', function(){
      infowindow.open(map, marker);
    })

    
    var removeBtn = contentString.find('button.remove-marker')[0];
    var submitBtn = contentString.find('button.submitMessage')[0];
    google.maps.event.addDomListener(removeBtn, "click", function() {
      marker.setMap(null);
    });

    google.maps.event.addDomListener(submitBtn, "click", function() {
      infowindow.close();
      var content = $(submitBtn).siblings("#postContent").find("textarea").val();
      infowindow = new google.maps.InfoWindow(
      {content: content,
      size: new google.maps.Size(50, 50)});

      google.maps.event.addListener(marker, 'click', function(){
      infowindow.open(map, marker);
    })

    });


    google.maps.event.addListener(marker, 'click', toggleBounce(marker, nyu_building_markers));
    
}





function closeAllInfoWindow(){
  for (var i=0; i<nyu_infowindows.length; i++){
    nyu_infowindows[i].close();
  }

}

var closeButton = document.getElementById('closeAll');
google.maps.event.addDomListener(closeButton, 'click', closeAllInfoWindow);
var homeButton = document.getElementById('goHome');
google.maps.event.addDomListener(homeButton, 'click', function(){map.setCenter(washingtonSquare)});


function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&libraries=places,panoramio&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;
