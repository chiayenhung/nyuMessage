(function () {
  define(['model/baseCollection' ,'model/user'], function (Collection, User) {
    function Users(options) {
      Collection.call(this, options);
      this.model = User;
    }

    Users.prototype = new Collection();

    return Users;
  });
})();