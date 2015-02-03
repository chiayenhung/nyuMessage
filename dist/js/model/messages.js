(function () {
  define(['underscore', 'model/baseCollection', 'model/message'], function (_, Collection, Message) {
    function Messages(options) {
      Collection.call(this, options);
      this.url = 'messages';
      this.model = Message;
      this.offest = 0;
      this.ended = false;
    }

    Messages.prototype = new Collection();

    Messages.prototype.load = function (options, cb) {
      var copy = this;
      if (copy.ended)
        return;
      _.extend(options, {offest: this.offest});

      copy.fetch(options, function (err, messages) {
        if (err) {
          if (err.status == 404)
            copy.ended = true;
          else
            cb(err);
        }
        else {
          copy.offest += 1;
          copy.sortBy({key: 'created'});
          cb(null, messages);
        }
      });
    };

    return Messages;
  });
})();