
var generateList = function () {
  var $buildingList = $(".building_list");
  $buildingList.empty();
  buildings.sortBy().data.forEach(function(building, index){
    var content = _.template(JST['buildingsList'], building);
    $buildingList.append(content);
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