(function () {
  define(['jquery', 'underscore', 'model/baseCollection', 'model/building'], function ($, _, Collection, Building) {

    function Buildings(options) {
      Collection.call(this, options);
      this.model = Building;
    }

    Buildings.prototype = new Collection({});

    // Buildings.prototype.fetch = function (cb) {
    //   var copy = this;
    //   $.ajax({
    //     url: 'getDatasets',
    //     method: 'get',
    //     success: function(response) {
    //       copy.populate(response, cb);
    //     },
    //     error: function(err) {
    //       console.error(err);
    //       cb();
    //     }
    //   });
    // };

    // Buildings.prototype.populate = function (data, cb) {
    //   var copy = this,
    //       building;
    //   copy.data = [];
    //   data.forEach(function(item, index){
    //     building = new Building(item);
    //     copy.data.push(building);
    //     if (index >= data.length - 1) {
    //       cb(copy);
    //     }
    //   });
    // };

    // Buildings.prototype.findById = function (id) {
    //   return _.find(this.data, function(building){return building.id == id;});
    // };

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

    // Buildings.prototype.sortBy = function (options) {
    //   this.data = _.sortBy(this.data, function(building){ return building.likes;});
    //   return this;
    // };

    return Buildings;

  });
})();