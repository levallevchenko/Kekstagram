'use strict';

window.util = (function () {
  var ESC_KEYNAME = 'Escape';
  var ENTER_KEYNAME = 'Enter';

  return {
    getRandomItem: function (min, max) {
      return Math.ceil(Math.random() * (max - min) + min);
    },
    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
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
