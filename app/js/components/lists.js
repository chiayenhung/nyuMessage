
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
    var id = $(this).data("id");
    nyu_building_markers.forEach(function(marker, index){
      if (marker.data.id == id) {
        new google.maps.event.trigger( marker, 'click' );
      }
    });
  });
};

var updateBuildingList = function(map) {
  buildings.hiding(parseBounds(map.getBounds()));
}

var parseBounds = function(enbounds) {
  var bounds = {
    'latLarge': enbounds.getNorthEast().k,
    'latSmall': enbounds.getSouthWest().k,
    'longLarge': enbounds.getNorthEast().A,
    'longSmall': enbounds.getSouthWest().A
  }
  return bounds;
}