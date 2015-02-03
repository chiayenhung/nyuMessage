(function () {
  define(['jquery', 'underscore', 'model/baseCollection', 'model/building'], function ($, _, Collection, Building) {

    function Buildings(options) {
      Collection.call(this, options);
      this.url = 'getDatasets';
      this.model = Building;
    }

    Buildings.prototype = new Collection();

    return Buildings;

  });
})();