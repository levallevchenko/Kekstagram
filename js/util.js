'use strict';

// util.js

window.util = (function () {
  return {
    getRandomItem: function (min, max) {
      return Math.ceil(Math.random() * (max - min) + min);
    },
    getRandomElemFromArr: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
  };
})();
