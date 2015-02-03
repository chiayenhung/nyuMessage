(function () {
  define(['jquery', 'underscore', 'model/baseModel'], function ($, _, Model) {

    function Building(data) {
      data.url = 'update';
      Model.call(this, data);
    }

    Building.prototype = new Model();

    Building.prototype.like = function (postId, userId, cb) {
      var copy = this,
          index;
      var post = _.find(copy.posts, function (post) { return post._id == postId; });
      if (post) {
        index = _.indexOf(post.likes, userId);
        if ( index == -1) 
          post.likes.push(userId);
        else
          post.likes.pop(index);
        copy.update(cb);
      }
      else{
        cb();
      }
    };

    Building.prototype.inViewport = function (bounds) {
      var building = this;
      return !(building.Latitute > bounds.latLarge || building.Latitute < bounds.latSmall || building.Longtitue > bounds.longLarge || building.Longtitue < bounds.longSamll);
    };

    return Building;

  });

})();