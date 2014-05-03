var postController = {};

var Post = require ('../models/post');

postController.getPosts = function (req, res) {
  Post.find({}, function (err, posts) {
    if (err) {
      res.send(500, err);
    }
    else{
      res.send (posts);
    }
  });
};

module.exports = postController;

