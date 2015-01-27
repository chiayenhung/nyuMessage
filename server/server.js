var express = require ('express');
var mongoose = require ('mongoose');
var passport = require ('passport');

var authController = require ('./controllers/auth_controller');
var datasetController = require ('./controllers/dataset_controller');

var app = express();
var server = require('http').Server(app);
var io = require ('socket.io')(server);

var mongodbURL = (process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nyuMessage')

mongoose.connect (mongodbURL);

var WHITELIST = {
  "/login": true,
  "/signup": true,
  "/favicon.ico": true,
  "/css/main.css": true
};

function checkAuthenticate (req, res, next) {
  if (!req.user && !(req.url in WHITELIST)) {
    return res.redirect ('/login');
  }
  next();
}

app.configure(function(){
  app.use (express.compress());
  app.set ('title', "NYU Message");
  app.set ('views', __dirname + "/pages");
  app.set ('view engine', 'jade');
  app.use (express.bodyParser());
  app.use (express.cookieParser());
  app.use (express.session({secret: '1234567890QWERTY'}));
  app.use (passport.initialize());
  app.use (passport.session());
  app.use (checkAuthenticate);
  app.use (express.static(__dirname + "/../dist/"));


  app.get ('/login', authController.login);
  app.get ('/signup', authController.signup);
  app.post('/login', authController.createSession);
  app.post('/signup', authController.createUser);
  app.get ('/logout', authController.logout);

  app.get ('/', authController.index);

  app.get ('/fillData', datasetController.fillData);

  app.get ('/getDatasets', datasetController.getDatasets);

  app.put ('/update', datasetController.updateDataset);

});

server.listen(process.env.PORT || 3000);

module.exports = app;
