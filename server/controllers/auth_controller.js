var authController = {},
    User = require('../models/user'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

authController.index = function (req, res) {
  res.render("index", {user: req.user});
}

authController.login = function (req, res) {
  res.render("login", {user: req.user});
};

authController.signup = function (req, res) {
  res.render("signup", {user: req.user});
};

authController.createUser = function (req, res) {
  var properties = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    create_time: new Date()
  };
  var user = new User(properties);

  user.encrypt(function () {
    user.save(function (err, user) {
      if (err)
        res.redirect("/signup");
      else
        res.redirect("/login");
    });
  });
};

authController.logout = function (req, res) {
  req.logout();
  res.redirect("/login");
};

authController.createSession = passport.authenticate ('local', {
  successRedirect: '/',
  failureRedirect: '/login?err=true'  
});

module.exports = authController;
