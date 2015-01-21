(function () {
  define(['jquery', 'underscore'], function ($, _) {

    function Building(data) {
      this.id = data._id;
      this.building_name = data.building_name;
      this.address = data.address;
      this.Latitute = data.Latitute;
      this.Longtitue = data.Longtitue;
      this.posts = data.posts || [];
      this.likes = data.likes || 0;
    }

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
      var copy = this;
      var post = _.find(this.posts, function (post) { return post._id == postId; });
      if (post) {
        post.likes++;
        copy.update(cb);
      }
      else{
        cb();
      }
    };

    return Building;

  });

})();