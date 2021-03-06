var express = require ('express.io');
var mongoose = require ('mongoose');
var passport = require ('passport');

var authController = require ('./controllers/auth_controller');
var datasetController = require ('./controllers/dataset_controller');
var socketController = require ('./controllers/socket_controller');
var messageController = require ('./controllers/message_controller');

var app = express();

var mongodbURL = (process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nyuMessage')

mongoose.connect (mongodbURL);

process.env.PWD = process.cwd();

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
  app.use (express.static(process.env.PWD + "/dist/"));

  app.http().io();
  socketController.setup(app);

  app.get ('/login', authController.login);
  app.get ('/signup', authController.signup);
  app.post('/login', authController.createSession);
  app.post('/signup', authController.createUser);
  app.get ('/logout', authController.logout);

  app.get ('/', authController.index);

  app.get ('/fillData', datasetController.fillData);

  app.get ('/getDatasets', datasetController.getDatasets);

  app.put ('/update', datasetController.updateDataset);

  app.post ('/sendMessage', socketController.postMessage);

  app.get ('/messages', messageController.getMessages);

});

module.exports = app;
