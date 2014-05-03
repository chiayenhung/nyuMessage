var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Dataset = new Schema( {
  building_name: String,
  address: String,
  Latitute: Number,
  Longtitue: Number
});

module.exports = mongoose.model ('Dataset', Dataset);
