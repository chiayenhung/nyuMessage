(function () {
  define(['model/baseModel'], function (Model) {
    function Message(data) {
      Model.call(this, data);
    }

    Message.prototype = new Model();

    return Message;
  });
})();