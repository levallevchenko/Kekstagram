'use strict';

// form.js

(function () {

  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS = 5;
  var REG = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;

  var imageUpload = document.querySelector('.img-upload');
  var imageSetup = imageUpload.querySelector('.img-upload__overlay');
  var uploadFile = imageUpload.querySelector('#upload-file');
  var imageUploadForm = imageUpload.querySelector('.img-upload__form');
  var hashtagsInput = imageSetup.querySelector('.text__hashtags');
  var imageComment = imageSetup.querySelector('.text__description');
  var imageUploadPreviewImage = imageUpload.querySelector('.img-upload__preview img');
  var originEffectValue = window.slider.effectLevelValue.value = '';

  imageSetup.classList.remove('hidden');

  var openUploadSetup = function () {
    imageSetup.classList.remove('hidden');
    document.addEventListener('keydown', onCloseUploadSetupEscPress);
  };

  uploadFile.addEventListener('change', function () {
    openUploadSetup();
  });

  var uploadCancel = imageUpload.querySelector('#upload-cancel');

  var onCloseUploadSetupEscPress = function (evt) {
    if (evt.key === window.util.ESC_KEYCODE) {
      closeUploadSetup();
    }
  };

  var closeUploadSetup = function () {
    imageSetup.classList.add('hidden');
    document.removeEventListener('keydown', onCloseUploadSetupEscPress);
    uploadFile.value = '';
    hashtagsInput.value = '';
    imageComment.value = '';
    window.slider.applyEffect(originEffectValue);
    imageUploadPreviewImage.classList = '';
  };

  uploadCancel.addEventListener('click', function () {
    closeUploadSetup();
  });

  var onHashtagInputInput = function () {
    var hashtagsValue = hashtagsInput.value;
    var hashtagsValueLower = hashtagsValue.toLowerCase();
    var hashtagsArr = hashtagsValueLower.trim().split(' ');

    if (hashtagsValue === '') {
      hashtagsInput.setCustomValidity('');
      return;
    }

    var allWordsStartWithHash = hashtagsArr.every(function (word) {
      return word.indexOf('#') === 0;
    });

    if (!allWordsStartWithHash) {
      hashtagsInput.setCustomValidity('Хэш-тег должен начинаться с символа #');
      return;
    }

    var getMaxHashLength = hashtagsArr.every(function (word) {
      return word.length < MAX_HASHTAG_LENGTH;
    });
    if (!getMaxHashLength) {
      hashtagsInput.setCustomValidity('Длина хеш-тега не должна быть больше 20 символов');
      return;
    }

    if (hashtagsArr.length > MAX_HASHTAGS) {
      hashtagsInput.setCustomValidity('Должно быть не больше 5 хештегов');
      return;
    }

    var checkWordsConsist = hashtagsArr.every(function (word) {
      return REG.test(word.slice(1));
    });
    if (!checkWordsConsist) {
      hashtagsInput.setCustomValidity('Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы и символы');
      return;
    }

    var getSameHashtags = function () {
      var result;
      hashtagsArr.forEach(function (hashtag, index, arr) {
        var isInArray = arr.indexOf(hashtag, index + 1) !== -1;
        if (!result && isInArray) {
          result = true;
        }
      });
      return result;
    };

    if (getSameHashtags()) {
      hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      return;
    }

    hashtagsInput.setCustomValidity('');
  };

  var onImageUploadFormSubmit = function (evt) {
    evt.preventDefault();
    imageSetup.classList.add('hidden');
    uploadFile.value = '';
    hashtagsInput.value = '';
    imageComment.value = '';
    window.slider.applyEffect(originEffectValue);
    imageUploadPreviewImage.classList = '';
  };

  hashtagsInput.addEventListener('input', function () {
    onHashtagInputInput();
  });

  imageUploadForm.addEventListener('submit', onImageUploadFormSubmit);
}());
