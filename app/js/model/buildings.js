(function () {
  define(['jquery', 'underscore', 'model/baseCollection', 'model/building'], function ($, _, Collection, Building) {

    function Buildings(options) {
      Collection.call(this, options);
      this.url = 'getDatasets';
      this.model = Building;
    }

    Buildings.prototype = new Collection();

    Buildings.prototype.hiding = function (bounds) {
      var copy = this;
      $(".building_list a").removeClass('hidden');
      copy.data.forEach(function(building, index){
          $('a[data-id=' + building.id + ']').toggleClass('hidden', copy.outbound(building, bounds));
      });    
    };

    Buildings.prototype.outbound = function (building, bounds) {
      var result = (building.Latitute > bounds.latLarge || building.Latitute < bounds.latSmall) || (building.Longtitue > bounds.longLarge || building.Longtitue < bounds.longSamll);
      return result;
    };

    return Buildings;

  });
})();