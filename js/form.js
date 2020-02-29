'use strict';

(function () {

  var MAX_HASHTAGS_LENGTH = 20;
  var MAX_COMMENTS_LENGTH = 140;
  var MAX_HASHTAGS = 5;
  var REG = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;

  var imageUpload = document.querySelector('.img-upload');
  var imageSetup = imageUpload.querySelector('.img-upload__overlay');
  var uploadFile = imageUpload.querySelector('#upload-file');
  var imageUploadForm = imageUpload.querySelector('.img-upload__form');
  var hashtagsInput = imageSetup.querySelector('.text__hashtags');
  var imageComment = imageSetup.querySelector('.text__description');
  var imageUploadPreviewImage = imageUpload.querySelector('.img-upload__preview img');
  var defaultEffectValue = window.setup.effectLevelValue.value = '';
  var imageUploadEffectLevel = imageUpload.querySelector('.img-upload__effect-level');
  var effectsPreview = imageUpload.querySelector('.effects__preview');
  var effectsRadio = imageUpload.querySelector('.effects__radio');

  var uploadCancel = imageUpload.querySelector('#upload-cancel');

  var onCloseUploadSetupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeUploadSetup);
  };

  var openUploadSetup = function () {
    imageSetup.classList.remove('hidden');
    document.addEventListener('keydown', onCloseUploadSetupEscPress);
    setupReset();
  };

  uploadFile.addEventListener('change', function () {
    openUploadSetup();
  });

  var setupReset = function () {
    uploadFile.value = '';
    hashtagsInput.value = '';
    imageComment.value = '';
    imageUploadEffectLevel.style.display = 'none';
    imageUploadPreviewImage.style.transform = 'none';
    hashtagsInput.setCustomValidity('');
    window.setup.applyEffect(defaultEffectValue);
    imageUploadPreviewImage.classList = '';
    effectsPreview.classList.add('effects__preview--none');

  };

  var closeUploadSetup = function () {
    imageSetup.classList.add('hidden');
    document.removeEventListener('keydown', onCloseUploadSetupEscPress);
    setupReset();
  };

  uploadCancel.addEventListener('click', function () {
    closeUploadSetup();
  });

  var onHashtagInputInput = function () {
    var error = '';
    var hashtagsValue = hashtagsInput.value;
    var hashtagsValueLower = hashtagsValue.toLowerCase();
    var hashtagsArray = hashtagsValueLower.trim().split(' ');

    for (var i = 0; i < hashtagsArray.length; i++) {
      var allWordsStartWithHash = hashtagsArray[i].indexOf('#') === 0;
      var getMaxHashLength = hashtagsArray[i].length < MAX_HASHTAGS_LENGTH;
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
    if (imageComment.textLength > MAX_COMMENTS_LENGTH) {
      imageComment.setCustomValidity('Комментарий не должен быть больше 140 символов');
    }
  };

  var onImageUploadFormSubmit = function (evt) {
    evt.preventDefault();
    closeUploadSetup();
  };

  hashtagsInput.addEventListener('input', function () {
    onHashtagInputInput();
  });

  imageComment.addEventListener('input', function () {
    onCommentInput();
  });

  imageUploadForm.addEventListener('submit', onImageUploadFormSubmit);

}());
