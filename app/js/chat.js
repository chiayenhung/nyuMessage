(function () {
  define([], function () {

    function Chat () {
      this.socket = io.connect('http://localhost');
    }

    Chat.prototype.initialize = function () {
      var copy = this;
      copy.socket.on('news', function (data) {
        console.log(data);
        copy.socket.emit('my other event', { my: 'data' });
      });
    };

    return Chat;
  });
})();