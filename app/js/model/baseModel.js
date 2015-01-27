(function () {
  define([], function () {

    function Model (data) {
      this.attrs(data);
    }

    Model.prototype.getDataFromDom = function (objStr) {
      this.attrs(objStr);
    }

    Model.prototype.attrs = function (data) {
      var obj = {};
      if (data) {
        data = _.omit(data, '__v');
        for (var key in data) {
          if (key == '_id')
            this["id"] = data[key];
          else
            this[key] = data[key];
        }
        return;
      }
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          if (key == 'id')
            obj["_id"] = this[key];
          else
            obj[key] = this[key];
        }
      }
      return obj;
    };

    Model.prototype.update = function (cb) {
      var copy = this,
          data = this.attrs();
      $.ajax({
        url: copy.url,
        method: 'put',
        data: data,
        dataType: 'json',
        success: function(response) {
          cb (null, response);
        },
        error: function(response) {
          cb (response);
        },
      });
    };

    return Model;
  });
})();