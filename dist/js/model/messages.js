(function () {
  define(['model/baseCollection', 'model/message'], function (Collection, Message) {
    function Messages(options) {
      Collection.call(this, options);
      this.model = Message;
    }

    Messages.prototype = new Collection();

    return Messages;
  });
})();