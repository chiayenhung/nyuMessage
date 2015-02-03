var _ = require('underscore');
var Message = require('../models/message');

var socketController = {};
var users = [];
var userMap = {};

socketController.setup = function (app) {
  var copy = this;
  app.io.on('connection', function (socket) {
    socket.on('online', function (user) {
      copy.userOnline(socket.id, user);
      app.io.broadcast("userSignin", users);
    });

    socket.on("disconnect", function () {
      copy.userOffline(socket.id);
      app.io.broadcast("userSignin", users);
    });
  });

  app.io.route('message', function (req) {
    var calleeSocket = _.invert(userMap)[req.body.callee];
    app.io.room(calleeSocket).socket.sockets[calleeSocket].emit('message', req.body);
  });

};

socketController.userOnline = function (socketId, user) {
  var copy = this;
  userMap[socketId] = user.id;
  users.push(user);
}

socketController.userOffline = function (socketId) {
  var copy = this,
      userId = userMap[socketId],
      index;
  delete userMap[socketId];
  user = _.find(users, function (user) {
    return user.id == userId;
  });
  users = _.without(users, user);
};

socketController.postMessage = function (req, res) {console.log(req.body)
  var message = new Message(req.body);
  message.save(function (err, m) {
    if (err)
      res.send(500, err);
    else if (!m) {
      res.send(400, 'Message not found');
    }
    else {
      req.io.route('message');
      res.send(m);      
    }
  })
};

module.exports = socketController;