'use strict';

window.util = (function () {
  var ESC_KEYNAME = 'Escape';
  var ENTER_KEYNAME = 'Enter';

  return {
    getRandomItem: function (min, max) {
      return Math.ceil(Math.random() * (max - min) + min);
    },
    getRandomElemFromArr: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEYNAME) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEYNAME) {
        action();
      }
    }
  };

})();
