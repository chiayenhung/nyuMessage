(function () {
  define(["model/baseModel", 'model/messages'], function (Model, Messages) {

    function User(data) {
      Model.call(this, data);
      this.messages = new Messages();
    }

    User.prototype = new Model();

    User.prototype.attrs = function (data) {
      if (data)
        data = _.omit(data, ["password", "messages"]);
      Model.prototype.attrs.call(this, data);
    }

    return User;

  });
})();