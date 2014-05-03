var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Post = new Schema( {
  building_id: ObjectId,
  content: String,
});

module.exports = mongoose.model ('Post', Post);
