(function () {
  requirejs.config ({
    paths: {
      'jquery': "lib/jquery-1.11.1.min",
      'underscore': "lib/underscore-min",
      'react': 'lib/react.min',
    },
    shims: {
      'jquery': {exports: '$'},
      'underscore': {exports: '_'},
      'react': {exports: 'React'},
    }
  });

  requirejs(['app'], function (App) {
    app = new App();
  });

})();