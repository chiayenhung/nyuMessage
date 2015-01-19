var express = require ('express');
var mongoose = require ('mongoose');
var passport = require ('passport');

var authController = require ('./controllers/auth_controller');
var datasetController = require ('./controllers/dataset_controller');

var app = express();

var mongodbURL = (process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nyuMessage')

mongoose.connect (mongodbURL);

app.configure(function(){
  app.use (express.compress());
  app.set ('title', "NYU Message");
  app.set ('views', __dirname + "/pages");
  app.set ('view engine', 'jade');
  app.use (express.cookieParser());
  app.use (express.session({secret: '1234567890QWERTY'}));
  app.use (passport.initialize());
  app.use (passport.session());
  app.use (express.bodyParser());
  app.use (express.static(__dirname + "/../dist/"));

  app.get ('/login', authController.login);
  app.get ('/signup', authController.signup);
  app.post('/login', authController.createSession);
  app.post('/signup', authController.createUser);

  app.get ('/fillData', datasetController.fillData);

  app.get ('/getDatasets', datasetController.getDatasets);

  app.put ('/update', datasetController.updateDataset);

});

module.exports = app;
