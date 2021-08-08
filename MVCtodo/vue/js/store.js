/*jshint unused:false */

(function (exports) {
  "use strict";
  // id key 是todos vuejs
  var STORAGE_KEY = "todos-vuejs";

  exports.todoStorage = {
    fetch: function () {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    },
    save: function (todos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    },
  };
})(window);
