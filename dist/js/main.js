(function () {
  requirejs.config ({
    paths: {
      'jquery': "lib/jquery-1.11.1.min",
      'underscore': "lib/underscore-min",
      'react': "lib/react-with-addons",
      'jsx': "lib/jsx",
      'JSXTransformer': "lib/JSXTransformer"
    },
    shims: {
      'jquery': {exports: '$'},
      'underscore': {exports: '_'},
      'react': {exports: 'React'},
      'JSXTransformer': {exports: "JSXTransformer"}
    }
  });

  requirejs(['jsx!app', 'model/buildings'], function (App, Buildings) {
    var buildings = new Buildings();
    buildings.fetch({}, function (err, buildings) {
      app = new App(buildings);
      app.render();
    })
  });

})();