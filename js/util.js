'use strict';

window.util = (function () {
  var ESC_KEYCODE = 'Escape';
  var ENTER_KEYCODE = 'Enter';

  return {
    getRandomItem: function (min, max) {
      return Math.ceil(Math.random() * (max - min) + min);
    },
    getRandomElemFromArr: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };

})();
