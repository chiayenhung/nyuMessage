
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
    this.data.forEach(function(building, index){
        $('a[data-id=' + building.id + ']').toggleClass('hidden', Buildings.prototype.outbound(building, bounds));
    });    
  };

  Buildings.prototype.outbound = function (building, bounds) {
    var result = (building.Latitute > bounds.latLarge || building.Latitute < bounds.latSmall) || (building.Longtitue > bounds.longLarge || building.Longtitue < bounds.longSamll);
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
  this.likes = data.likes || 0;
  // this.postNum = this.posts.length;

  Building.prototype.update = function (cb) {
    var data = {
      _id: this.id,
      building_name: this.building_name,
      address: this.address,
      Latitute: this.Latitute,
      Longtitue: this.Longtitue,
      posts: this.posts,
      likes: this.likes,
    };
    $.ajax({
      url: 'update',
      method: 'put',
      data: data,
      dataType: 'json',
      success: function(response) {
        cb (null, response);
      },
      error: function(response) {
        cb (response);
      },
    });
  };

  Building.prototype.like = function (postId, cb) {
    var post = _.find(this.posts, function (post) { return post._id == postId; });
    if (post) {
      post.likes++;
      Building.prototype.update(cb);
    }
    else{
      cb();
    }
  }
}

var buildings = new Buildings();

buildings.fetch(function() {
  generateList();
  $(".list-group-item").click(function(e){
    e.preventDefault();
    $(".list-group-item").removeClass("active");
    $(this).addClass("active");
  });
});
