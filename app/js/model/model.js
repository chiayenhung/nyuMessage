
var Buildings = function() {

  var self = this;
  this.data = [];

  Buildings.prototype.fetch = function(cb) {
    if (!window.localStorage.buildings) {
      $.ajax({
        url: 'getDatasets',
        method: 'get',
        success: function(response) {
          Buildings.prototype.populate(response, cb);
        },
        error: function(err) {
          console.log (err);
          cb();
        }
      });
    }
    else {
      console.log("data are ready");
      cb();
    }
  };

  Buildings.prototype.populate = function (data, cb) {
    self.data = [];
    data.forEach(function(item, index){
      self.data.push(new Building(item));
      if (index >= data.length - 1) {
        cb();
      }
    });
  };

  Buildings.prototype.findById = function (id) {
    return _.find(this.data, function(building){return building.id == id;});
  };

  Buildings.prototype.hiding = function (bounds) {
    $(".building_list a").removeClass('hidden');
    // console.log (bounds);
    this.data.forEach(function(building, index){
      // if (!Buildings.prototype.outbound(building, bounds)) {
        console.log($('a[data-id=' + building.id + ']').length);
        $('a[data-id=' + building.id + ']').toggleClass('hidden', Buildings.prototype.outbound(building, bounds));
      // }
    });    
  };

  Buildings.prototype.outbound = function (building, bounds) {
    var result = (building.Latitute > bounds.latLarge || building.Latitute < bounds.latSmall) || (building.Longtitue > bounds.longLarge || building.Longtitue < bounds.longSamll);
    // console.log(result);
    return result;
  }

};

var Building = function (data) {
  this.id = data._id;
  this.building_name = data.building_name;
  this.address = data.address;
  this.Latitute = data.Latitute;
  this.Longtitue = data.Longtitue;
  this.posts = data.posts || [];
  this.postNum = this.posts.length;

  Building.prototype.update = function () {
    var data = {
      _id: this.id,
      building_name: this.building_name,
      address: this.address,
      Latitute: this.Latitute,
      Longtitue: this.Longtitue,
      posts: this.posts
    };
    $.ajax({
      url: 'update',
      method: 'put',
      data: data,
      dataType: 'json',
      success: function(response) {
        console.log (response);
      },
      error: function(response) {
        console.log (response);
      },
    });
  };
}

var buildings = new Buildings();

buildings.fetch(function() {
  generateList();
});
