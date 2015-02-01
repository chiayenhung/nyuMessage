var _ = require('underscore');

function Chat(app) {
  this.app = app;
  this.users = [];
  this.userMap = {};
}

Chat.prototype.setup = function () {
  var copy = this;
  this.app.io.on('connection', function (socket) {
    socket.on('online', function (user) {
      copy.userOnline(socket.id, user);
      copy.app.io.broadcast("userSignin", copy.users);
    });

    socket.on("disconnect", function () {
      copy.userOffline(socket.id);
      copy.app.io.broadcast("userSignin", copy.users);
    });
  });
};

Chat.prototype.userOnline = function (socketId, user) {
  var copy = this;
  copy.userMap[socketId] = user.id;
  copy.users.push(user);
}

Chat.prototype.userOffline = function (socketId) {
  var copy = this,
      userId = copy.userMap[socketId],
      index;
  delete copy.userMap[socketId];
  user = _.find(copy.users, function (user) {
    return user.id == userId;
  });
  copy.users = _.without(copy.users, user);
};

Chat.prototype.postMessage = function (req, res) {
  var copy = this;
  console.log(req.body, copy.userMap, copy.users, this);
  var calleeSocket = _.invert(copy.userMap)[req.body.callee];
  console.log(calleeSocket);
  calleeSocket.emit('message', {message: req.body.message, caller: req.body.caller});
};

module.exports = Chat;
