(function () {
  define(['jquery', 'underscore', 'components/templates', 'jsx!components/buildingItem'], function ($, _, JST, BuildingItem) {
    
    var template = JST['infoWindow'];

    function InfoWindow (data) {
      this.user = data.user;
      this.map = data.map;
      this.marker = data.marker;
      this.model = data.model;
    }

    InfoWindow.prototype.render = function () {
      var obj = Object.create(this.model);
      _.extend(obj, {user: this.user});
      this.contentString = $(_.template(JST['infoWindow'], obj));
      this.infowindow = new google.maps.InfoWindow(
        {content: this.contentString[0],
          size: new google.maps.Size(100, 100)});
      this.setHandlers();
    }

    InfoWindow.prototype.setHandlers = function () {
      var copy = this;
      google.maps.event.addListener(copy.marker, 'click', function(){
        copy.infowindow.open(copy.map, copy.marker);
      });
      copy.setInternalHandlers();
    };

    InfoWindow.prototype.closeEdit = function () {
      var copy = this;
      copy.contentString.find(".post_list").slideDown();
      copy.contentString.find(".post-message").slideDown();
      copy.contentString.find(".add_post").slideUp();
    };

    InfoWindow.prototype.setInternalHandlers = function () {
      var copy = this;

      copy.contentString.off(".infowindowEvents").on("click.infowindowEvents", ".post-message", function () {
        copy.contentString.find(".post_list").slideUp();
        copy.contentString.find(".post-message").slideUp();
        copy.contentString.find(".add_post").slideDown();
      }).on("click", ".cancelBtn", function () {
        copy.closeEdit();
      }).on("click", ".like_link", function (e) {
        e.preventDefault();
        var $like = $(this),
            $post = $like.parents(".list-group-item-info"),
            postId = $post.data("id"),
            post;
            copy.model.like(postId, copy.user.id, function (err, building) {
              if (err) {
                console.error(err);
              }
              else {
                post = _.find(copy.model.posts, function (post) { return post._id == postId});
                $post.find(".badge").text(post.likes.length).toggleClass("liked", _.indexOf(post.likes, copy.user.id) != -1);
              }
            });
      }).on("click", ".saveBtn", function () {
        var val = copy.contentString.find("textarea").val(),
            data = {
              building_id: copy.model.id,
              content: val,
              likes: []
            },
            post, newPost;
        copy.model.posts.push(data);
        copy.model.update(function (err, building) {
          if (err)
            console.log(err);
          else {
            post = copy.model.posts[building.posts.length - 1];
            post._id = building.posts[building.posts.length - 1]._id;
            newPost = _.template(JST['postList'], post);
            copy.contentString.find(".post_list").append(newPost);
            copy.closeEdit();
            copy.trigger("updateBuildingList");     
          }
        });
      });

    };

    return InfoWindow;
  });
})();