
var generateList = function () {
  var $buildingList = $(".building_list");
  $buildingList.empty();
  buildings.data.forEach(function(building, index){
    var content = _.template(JST['buildingsList'], building);
    $buildingList.append(content);
  });
};