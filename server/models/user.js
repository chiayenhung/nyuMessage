var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var crypto = require ('crypto'),
    algorithm = 'aes-256-ctr',
    salt = 'sweetcool';

var User = new Schema( {
  id: ObjectId,
  username: String,
  password: String,
  email: String,
  create_time: Date,
});

User.methods.validPassword = function (password) {
  if (encrypt(password) == this.password)
    return true;
  return false;
};

User.methods.encrypt = function (done) {
  this.password = encrypt(this.password);
  done();
}

module.exports = mongoose.model ('User', User);

function encrypt(text){
  var cipher = crypto.createCipher(algorithm, salt)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

// not used yet
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm, salt)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
