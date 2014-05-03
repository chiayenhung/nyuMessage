
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
  }
};

var Building = function (data) {
  this.id = data._id;
  this.building_name = data.building_name;
  this.address = data.address;
  this.Latitute = data.Latitute;
  this.Longtitue = data.Longtitue;
}

var buildings = new Buildings();

buildings.fetch(function() {
  generateList();
});
