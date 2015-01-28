function Chat(app) {
  this.app = app;
}

Chat.prototype.setup = function () {
  var copy = this;
  this.app.io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
  });
};

module.exports = Chat;