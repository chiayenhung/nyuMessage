(function () {
  define(['jquery', 'underscore', 'model/baseModel'], function ($, _, BaseModel) {
    function Collection(options) {
      this.url = options.url;
      this.model = BaseModel;
      this.data = [];
    }

    Collection.prototype.fetch = function (options, cb) {
      var copy = this;
      $.ajax({
        url: copy.url,
        method: 'get',
        params: options,
        success: function(response) {
          copy.populate(response, cb);
        },
        error: function(err) {
          console.error(err);
          cb();
        }
      });
    };

    Collection.prototype.populate = function (data, cb) {
      var copy = this,
          model;
      copy.data = [];
      data.forEach(function(item, index){
        model = new copy.model(item);
        copy.data.push(model);
        if (index >= data.length - 1) {
          cb(copy);
        }
      });
    };

    Collection.prototype.findById = function (id) {
      return _.find(this.data, function(model){return model.id == id;});
    };

    Collection.prototype.sortBy = function (options) {
      this.data = _.sortBy(this.data, function(building){ return building[options.key];});
      return this;
    };


    return Collection;
  });
})();