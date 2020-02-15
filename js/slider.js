'use strict';

(function () {

  var ONE_HUNDRED_PERCENT = 100;
  var EFFECT_PIN_LEFT_START = '100%';

  var imageUpload = document.querySelector('.img-upload');
  var effectLevelValue = imageUpload.querySelector('.effect-level__value');
  var effectLevelLine = imageUpload.querySelector('.effect-level__line');
  var effectLevelPin = imageUpload.querySelector('.effect-level__pin');
  var effectLevelDepth = imageUpload.querySelector('.effect-level__depth');
  var effectsRadios = imageUpload.querySelectorAll('.effects__radio');

  // Перемещение ползунка по клику
  var onEffectLevelPinMouseup = function (evt) {
    var effectLevelLineWidth = effectLevelLine.offsetWidth;
    var onePercentEffectLevelLineWidth = effectLevelLineWidth / ONE_HUNDRED_PERCENT;
    var pinLeft = evt.offsetX / onePercentEffectLevelLineWidth;
    var pinLeftString = String(pinLeft);
    var target = evt.target;
    var isClickOnPin = target.classList.contains('effect-level__pin');
    if (isClickOnPin) {
      return;
    }
    effectLevelPin.style.left = pinLeftString + '%';
    effectLevelDepth.style.width = pinLeftString + '%';
    effectLevelValue.value = pinLeftString;
  };

  effectLevelLine.addEventListener('mouseup', onEffectLevelPinMouseup);

  var onEffectsListClick = function () {
    effectLevelValue.value = ONE_HUNDRED_PERCENT;
    effectLevelPin.style.left = EFFECT_PIN_LEFT_START;
    effectLevelDepth.style.width = EFFECT_PIN_LEFT_START;
  };

  effectsRadios.forEach(function (radio) {
    radio.addEventListener('change', onEffectsListClick);
  });


  // drag-and-drop
  var onMouseDown = function (evt) {
    evt.preventDefault();
    var effectLevelLineWidth = effectLevelLine.offsetWidth;
    var onePercentEffectLevelLineWidth = effectLevelLineWidth / ONE_HUNDRED_PERCENT;

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
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

      var pinShift = (effectLevelPin.offsetLeft - shift.x) / onePercentEffectLevelLineWidth;
      if (pinShift > 100) {
        pinShift = 100;
      }
      if (pinShift < 0) {
        pinShift = 0;
      }
      effectLevelPin.style.left = pinShift + '%';
      effectLevelDepth.style.width = pinShift + '%';
      effectLevelValue.value = pinShift;

      if (effectLevelValue.value > 100 || effectLevelValue.value < 0) {
        document.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  effectLevelPin.addEventListener('mousedown', onMouseDown);

})();
