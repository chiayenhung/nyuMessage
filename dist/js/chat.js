(function () {
  define(['utils/events'], function (Events) {

    function Chat (data) {
      this.socket = io.connect('http://localhost');
      this.user = data.user;
    }

    Chat.prototype = new Events();

    Chat.prototype.initialize = function () {
      var copy = this;
      copy.socket.on('userSignin', function (data) {
        copy.trigger("updateUserList", data);
      });

      copy.socket.on('message', function (data) {
        copy.trigger("chatting", data);
      });

      copy.socket.emit("online", copy.user);

    };

    return Chat;
  });
})();
