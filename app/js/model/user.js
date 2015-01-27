(function () {
  define(["model/baseModel"], function (Model) {

    function User(data) {
      Model.call(this, data);
    }

    User.prototype = new Model();

    User.prototype.attrs = function (data) {
      if (data)
        data = _.omit(data, "password");
      Model.prototype.attrs.call(this, data);
    }

    return User;

  });
})();