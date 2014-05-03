express = require ('express');
mongoose = require ('mongoose');

// userControler = require ('./controlers/userControler')

app = express();

mongodbURL = (process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nyuMessage')

mongoose.connect (mongodbURL);

app.configure(function(){
  app.use (express.compress());
  app.set ('title', "Map Tag");
  app.set ('views', "#{__dirname}/pages");
  app.set ('view engine', 'html');
  app.use (express.cookieParser());
  app.use (express.session({secret: '1234567890QWERTY'}));
  app.use (express.bodyParser());
  app.use (express.static("#{__dirname}/../dist/"));
});

// app.configure ->
//   app.use express.compress()
//   app.set 'title', "Map Tag"
//   app.set 'views', "#{__dirname}/pages"
//   app.set 'view engine', 'jade'
//   app.use express.cookieParser()
//   app.use express.session(secret: '1234567890QWERTY')
//   app.use express.bodyParser()
//   app.use express.static("#{__dirname}/../dist/")

//   app.get '/signin', userControler.showSignin
//   app.post '/signin', userControler.singin
//   app.get '/signup', userControler.signup
//   app.post '/signup', userControler.createUser

module.exports = app;
