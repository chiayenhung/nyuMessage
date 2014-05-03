var express = require ('express');
var mongoose = require ('mongoose');

var datasetController = require ('./controllers/dataset_controller');
var postController = require ('./controllers/post_controller');

var app = express();

var mongodbURL = (process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nyuMessage')

mongoose.connect (mongodbURL);

app.configure(function(){
  app.use (express.compress());
  app.set ('title', "NYU Message");
  app.set ('views', "#{__dirname}/pages");
  app.set ('view engine', 'html');
  app.use (express.cookieParser());
  app.use (express.session({secret: '1234567890QWERTY'}));
  app.use (express.bodyParser());
  app.use (express.static("#{__dirname}/../dist/"));

  app.get ('/fillData', datasetController.fillData);

  app.get ('/getDatasets', datasetController.getDatasets);

  app.get ('/getPosts', postController.getPosts);

});

module.exports = app;
