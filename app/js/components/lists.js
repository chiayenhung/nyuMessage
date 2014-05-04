
var generateList = function () {
  var $buildingList = $(".building_list");
  $buildingList.empty();
  buildings.data.forEach(function(building, index){
    var content = _.template(JST['buildingsList'], building);
    $buildingList.append(content);
  });
  $(".list-group-item").click(function(e){
    e.preventDefault();
    $(".list-group-item").removeClass("active");
    $(this).addClass("active");
    console.log($(this).data("id"));
    var id = $(this).data("id");
    nyu_building_markers.forEach(function(marker, index){
      // console.log(marker.data.id == id);
      if (marker.data.id == id) {
        // console.log(marker.data);
        new google.maps.event.trigger( marker, 'click' );
      }
    });
    // console.log(nyu_building_markers);
    // nyu_building_markers
  });
};

var updateBuildingList = function(map) {
  buildings.hiding(parseBounds(map.getBounds()));
}

var parseBounds = function(enbounds) {
  var bounds = {
    'latLarge': enbounds.Ba.j,
    'latSmall': enbounds.Ba.k,
    'longLarge': enbounds.ra.k,
    'longSmall': enbounds.ra.j
  }
  return bounds;
}