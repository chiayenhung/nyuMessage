var Message = require('../models/message');

var messageController = {};

var ITEMS_PER_PAGE = 10;

messageController.getMessages = function (req, res) {
  var query = req.query,
      offset = query.offset || 0,
      queryList = [{caller: query.caller, callee: query.callee}, {caller: query.callee, callee: query.caller}];
  Message.find({$or: queryList}).sort({created: -1}).limit(ITEMS_PER_PAGE).skip(offset * ITEMS_PER_PAGE).exec(function (err, messages) {
    if (err) {
      res.send(500, err);
    }
    else if (messages.length == 0) {
      res.send(404, 'Messages not found');
    }
    else
      res.send(messages);
  });
};

module.exports = messageController;