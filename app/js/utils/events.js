(function () {
  define([], function () {

    function Events () {
      this.eventMap = {};
    }

    Events.prototype.on = function (eventName, handler) {
      if (eventName in this.eventMap) {
        this.eventMap[eventName].push(handler);
      }
      else
        this.eventMap[eventName] = [handler];
    };

    Events.prototype.trigger = function (eventName, arg) {
      if (eventName in this.eventMap) {
        this.eventMap[eventName].forEach(function (handler) {
          handler.apply(this, arg);
        });
      }
    };

    Events.prototype.off = function (eventName) {
      if (eventName in this.eventMap) {
        delete this.eventMap[eventName];
      }
    };

    return Events;

  });
})();