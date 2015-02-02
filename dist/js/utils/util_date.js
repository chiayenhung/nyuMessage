(function () {
  define(['underscore'], function (_) {
    var utils = {};

    utils.timeString = function (dateStr) {
      var date = new Date(dateStr);
      return date.getHours() + ":" + date.getMinutes();
    };

    return utils;
  });
})();