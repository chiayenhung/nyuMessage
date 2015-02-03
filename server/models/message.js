var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Message = new Schema( {
  caller: String,
  callee: String,
  created: Date,
  message: String,
});

module.exports = mongoose.model ('Message', Message);
