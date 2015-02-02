(function () {
  define(['model/baseCollection' ,'model/user'], function (Collection, User) {
    var Users = function (options) {
      Collection.call(this, options);
      this.model = User;
    }

    Users.prototype = new Collection({});

    return Users;
  });
})();