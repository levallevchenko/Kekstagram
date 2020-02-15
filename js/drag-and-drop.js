'use strict';

(function () {
  var ONE_HUNDRED_PERCENT = 100;
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
  var pinHandle = effectLevelLine.querySelector('.effect-level__pin');

  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var effectLevelLineWidth = effectLevelLine.offsetWidth;
      var onePercentEffectLevelLineWidth = effectLevelLineWidth / ONE_HUNDRED_PERCENT;
      var pinLeft = moveEvt.offsetX / onePercentEffectLevelLineWidth;
      var pinLeftString = String(pinLeft);
      var target = moveEvt.target;
      var isClickOnPin = target.classList.contains('effect-level__pin');
      if (isClickOnPin) {
        return;
      }

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var a = effectLevelLineWidth + 'px';

      if (pinHandle.style.left >= a) {
        document.removeEventListener('mousemove', onMouseMove);
      }

      pinHandle.style.left = pinHandle.offsetLeft - shift.x + 'px';
      effectLevelDepth.style.width = pinHandle.offsetLeft + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

})();

// var startCoords = {
//   x: EFFECT_PIN_LEFT_START
// };

// var onMouseMove = function (moveEvt) {
//   moveEvt.preventDefault();

//   var effectLevelLineWidth = effectLevelLine.offsetWidth;
//   var onePercentEffectLevelLineWidth = effectLevelLineWidth / ONE_HUNDRED_PERCENT;
//   var pinLeft = moveEvt.offsetX / onePercentEffectLevelLineWidth;
//   var pinLeftString = String(pinLeft);
//   var target = moveEvt.target;
//   var isClickOnPin = target.classList.contains('effect-level__pin');
//   if (isClickOnPin) {
//     return;
//   }

//   var shift = {
//     x: startCoords.x - pinLeftString,
//   };

//   startCoords = {
//     x: pinLeftString
//   };

//   effectLevelPin.style.left = pinLeftString + '%';
//   effectLevelDepth.style.width = pinLeftString + '%';


