(function () {

  define(['jquery', 'underscore', 'components/templates'], function ($, _, templates) {

    function GMap(buildings) {
      this.map = null;
      this.buildings = buildings;
    }

    GMap.prototype.initialize = function () {
      var copy = this,
          washingtonSquare,
          mapOptions;

      if (!copy.map) {        
        washingtonSquare = new google.maps.LatLng(40.730823,-73.997332)
        mapOptions = {
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
        copy.map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        copy.getUserLocation();
      }
    };
    
      // function initialize() {

      // }

        // nyu_building_markers = new Array(buildings.data.length);
        // nyu_infowindows = new Array(buildings.data.length);

        // for (var i=0; i<buildings.data.length; i++){
        //   var markerlatlng = new google.maps.LatLng(buildings.data[i].Latitute, buildings.data[i].Longtitue);
        //   var buildingname = buildings.data[i].building_name;
        //   var buildingimg = { url: 'images/nyubuilding1.png',
        //     // This marker is 20 pixels wide by 32 pixels tall.
        //     size: new google.maps.Size(30, 30)
        //   };

        //   var marker = new google.maps.Marker({
        //     position: markerlatlng,
        //     animation: google.maps.Animation.DROP,
        //     map: map,
        //     title: buildingname,
        //     icon: buildingimg,
        //     data: buildings.data[i]
        //   });

        //   var contentString = _.template(JST['infoWindow'], buildings.data[i]);

        //   contentString = $(contentString);
        //   attachMessage(marker, contentString[0]);

        //   var postBtn = contentString.find('button.post-message')[0];
        //   attachPostWindow(marker, postBtn);

        //   var saveBtn = contentString.find('button.saveBtn')[0];
        //   attachSave(marker, saveBtn);

        //   var like = contentString.find('a.like_link');
        //   attachLike(marker, like);
          
        //   google.maps.event.addListener(marker, 'click', toggleBounce(marker, nyu_building_markers));
        //   nyu_building_markers[i] = marker;

        //   attachMarker(marker);
        // }

        // Create the search box and link it to the UI element.
        // var input = document.getElementById('pac-input');
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // var searchBox = new google.maps.places.SearchBox(input);
        // google.maps.event.addListener(searchBox, 'places_changed', function() {
        //   var places = searchBox.getPlaces();
        //   search_markers = [];
        //   var bounds = new google.maps.LatLngBounds();
        //   for (var i = 0, place; place = places[i]; i++) {
        //     var image = {
        //       url: place.icon,
        //       size: new google.maps.Size(71, 71),
        //       origin: new google.maps.Point(0, 0),
        //       anchor: new google.maps.Point(17, 34),
        //       scaledSize: new google.maps.Size(25, 25)
        //     };
        //     // Create a marker for each place.
        //     var search_marker = new google.maps.Marker({
        //       map: map,
        //       icon: image,
        //       title: place.name,
        //       position: place.geometry.location
        //     });

        //     search_markers.push(search_marker);
        //     bounds.extend(place.geometry.location);
        //   }

        //   map.fitBounds(bounds);
        //   });

        //   // Bias the SearchBox results towards places that are within the bounds of the
        //   // current map's viewport.
        //   google.maps.event.addListener(map, 'bounds_changed', function() {
        //     var bounds = map.getBounds();
        //     searchBox.setBounds(bounds);
        //   });

        // google.maps.event.addListener(map, 'rightclick', function(event){
        //   placeMarker(event.latLng);
        // });

        // google.maps.event.addListener(map, 'zoom_changed', function() {
        //   var zoomLevel = map.getZoom();
        //   updateBuildingList(map);
        // });

        // google.maps.event.addListener(map, 'center_changed', function() {
        //   updateBuildingList(map);
        // });
      // }

    GMap.prototype.getUserLocation = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      }
      else{
        alert("Geolocation is not supported by this browser.");
      }
    }

    GMap.prototype.showPosition = function (position) {
      var copy = this;
      var userlatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var user_marker = new google.maps.Marker({
        position: userlatlng,
        animation: google.maps.Animation.BOUNCE,
        map: copy.map,
        title: "You are here.",
        icon: 'images/user1.png'
      });
    }

    return GMap;
  });

})();