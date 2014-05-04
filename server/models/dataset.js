var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Post = new Schema( {
  building_id: {
    type: ObjectId,
    required: true,
  },
  content: String,
  create_time: Date,
  likes: Number,
});

var Dataset = new Schema( {
  building_name: String,
  address: String,
  posts: [Post],
  Latitute: Number,
  Longtitue: Number
});

module.exports = mongoose.model ('Dataset', Dataset);
