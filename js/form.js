'use strict';

(function () {
  var ONE_HUNDRED_PERCENT = 100;
  var EFFECT_PIN_LEFT_START = '20%';

  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS = 5;
  var REG = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;

  var imageUpload = document.querySelector('.img-upload');
  var imageSetup = imageUpload.querySelector('.img-upload__overlay');
  var uploadFile = imageUpload.querySelector('#upload-file');
  var imageUploadForm = imageUpload.querySelector('.img-upload__form');
  var hashtagsInput = imageSetup.querySelector('.text__hashtags');
  var imageComment = imageSetup.querySelector('.text__description');

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = imageSetup.querySelector('.effect-level__pin');
  var effectLevelDepth = imageSetup.querySelector('.effect-level__depth');
  var effectsRadios = imageSetup.querySelectorAll('.effects__radio');

  var uploadCancel = imageUpload.querySelector('#upload-cancel');


  var onCloseUploadSetupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeUploadSetup);
  };

  var openUploadSetup = function () {
    imageSetup.classList.remove('hidden');
    document.addEventListener('keydown', onCloseUploadSetupEscPress);
  };

  uploadFile.addEventListener('change', function () {
    openUploadSetup();
    var effectLevelLineWidth = effectLevelLine.offsetWidth;
    var onePercentEffectLevelLineWidth = effectLevelLineWidth / ONE_HUNDRED_PERCENT;
    return onePercentEffectLevelLineWidth;
  });

  var closeUploadSetup = function () {
    imageSetup.classList.add('hidden');
    document.removeEventListener('keydown', onCloseUploadSetupEscPress);
    hashtagsInput.setCustomValidity('');
    uploadFile.value = '';
    hashtagsInput.value = '';
    imageComment.value = '';
  };

  uploadCancel.addEventListener('click', function () {
    closeUploadSetup();
  });

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
  };

  effectLevelLine.addEventListener('mouseup', onEffectLevelPinMouseup);

  var onEffectsListClick = function () {
    effectLevelPin.style.left = EFFECT_PIN_LEFT_START;
    effectLevelDepth.style.width = EFFECT_PIN_LEFT_START;
  };

  effectsRadios.forEach(function (radio) {
    radio.addEventListener('click', onEffectsListClick);
  });

  var onHashtagInputInput = function () {
    var error = '';
    var hashtagsValue = hashtagsInput.value;
    var hashtagsValueLower = hashtagsValue.toLowerCase();
    var hashtagsArray = hashtagsValueLower.trim().split(' ');

    for (var i = 0; i < hashtagsArray.length; i++) {
      var allWordsStartWithHash = hashtagsArray[i].indexOf('#') === 0;
      var getMaxHashLength = hashtagsArray[i].length < MAX_HASHTAG_LENGTH;
      var checkWordsConsist = REG.test(hashtagsArray[i].slice(1));
      var isSameInArray = hashtagsArray.indexOf(hashtagsArray[i], i + 1) !== -1;

      if (hashtagsValue === '') {
        break;
      }
      if (!allWordsStartWithHash) {
        error = 'Хэш-тег должен начинаться с символа #';
        break;
      }
      if (!getMaxHashLength) {
        error = 'Длина хеш-тега не должна быть больше 20 символов';
        break;
      }
      if (hashtagsArray.length > MAX_HASHTAGS) {
        error = 'Должно быть не больше 5 хештегов';
        break;
      }
      if (!checkWordsConsist) {
        error = 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы и символы';
        break;
      }
      if (isSameInArray) {
        error = 'Один и тот же хэш-тег не может быть использован дважды';
        break;
      }
    }
    hashtagsInput.setCustomValidity(error);
  };

  var onCommentInput = function () {
    if (imageComment.textLength > 140) {
      imageComment.setCustomValidity('Комментарий не должен быть больше 140 символов');
    }
  };

  var onImageUploadFormSubmit = function (evt) {
    evt.preventDefault();
    imageSetup.classList.add('hidden');
    uploadFile.value = '';
    hashtagsInput.value = '';
    imageComment.value = '';
  };

  hashtagsInput.addEventListener('input', function () {
    onHashtagInputInput();
  });

  imageComment.addEventListener('input', function () {
    onCommentInput();
  });

  imageUploadForm.addEventListener('submit', onImageUploadFormSubmit);

}());
