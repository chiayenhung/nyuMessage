
var Buildings = function() {

  var self = this;
  this.data = [];

  this.fetch = function(cb) {
    if (!window.localStorage.buildings) {
      $.ajax({
        url: 'getAll',
        method: 'get',
        success: function(response) {
          populate(response);
        },
        error: function(err) {
          console.log (err);
        }
      });
    }
    else {
      console.log("data are ready");
    }
  };

  var populate = function (data) {
    data.forEach(function(item, index){
      self.data.push(new Building(item));
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
