(function () {
  define(['underscore'], function (_) {
    var utils = {};

    utils.timeString = function (dateStr) {
      var date = new Date(dateStr),
          hours = date.getHours(),
          mins = date.getMinutes();
      if (hours < 10)
        hours = "0" + hours;
      if (mins < 10)
        mins = "0" + mins;
      return hours + ":" + mins;
    };

    return utils;
  });
})();