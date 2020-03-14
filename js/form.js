'use strict';

(function () {

  var MAX_HASHTAGS_LENGTH = 20;
  var MAX_COMMENTS_LENGTH = 140;
  var MAX_HASHTAGS = 5;
  var DEFAULT_SCALE = 1;
  var REG = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;

  var imageUpload = document.querySelector('.img-upload');
  var imageSetup = imageUpload.querySelector('.img-upload__overlay');
  var uploadFile = imageUpload.querySelector('#upload-file');
  var imageUploadForm = imageUpload.querySelector('.img-upload__form');
  var hashtagsInput = imageSetup.querySelector('.text__hashtags');
  var imageComment = imageSetup.querySelector('.text__description');
  var imageUploadPreviewImage = imageUpload.querySelector('.img-upload__preview img');

  var uploadCancel = imageUpload.querySelector('#upload-cancel');

  var uploudSuccessMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var uploudErrorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var successUploadMessage = uploudSuccessMessageTemplate.cloneNode(true);
  var errorUploadMessage = uploudErrorMessageTemplate.cloneNode(true);
  var successButton = successUploadMessage.querySelector('.success__button');
  var errorButton = errorUploadMessage.querySelector('.error__button');

  var onCloseUploadSetupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeUploadSetup);
  };

  uploadFile.addEventListener('change', function () {
    openUploadSetup();
  });

  var setupReset = function () {
    imageUploadForm.reset();

    imageUploadPreviewImage.classList = '';
    uploadFile.value = '';
    hashtagsInput.value = '';
    imageComment.value = '';

    imageUploadPreviewImage.style.transform = 'scale' + '(' + DEFAULT_SCALE + ')';
    window.setup.applyEffect(0);
  };

  var openUploadSetup = function () {
    imageSetup.classList.remove('hidden');
    document.addEventListener('keydown', onCloseUploadSetupEscPress);
    imageUploadForm.addEventListener('submit', onImageUploadFormSubmit);
  };

  var closeUploadSetup = function () {
    imageSetup.classList.add('hidden');
    document.removeEventListener('keydown', onCloseUploadSetupEscPress);
    imageUploadForm.removeEventListener('submit', onImageUploadFormSubmit);
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

    if (error) {
      hashtagsInput.style.border = '2px solid red';
    } else {
      hashtagsInput.style.border = 'none';
    }
  };

  var onCommentInput = function () {
    if (imageComment.textLength > MAX_COMMENTS_LENGTH) {
      imageComment.setCustomValidity('Комментарий не должен быть больше 140 символов');
    }
    document.removeEventListener('keydown', onCloseUploadSetupEscPress);
  };

  var showSuccessModal = function () {
    main.appendChild(successUploadMessage);
  };

  var showErrorModal = function () {
    main.appendChild(errorUploadMessage);
  };

  var onSuccessUploadResult = function () {
    successUploadMessage.classList.remove('hidden');
    successUploadMessage.classList.add('success');
    showSuccessModal();
  };

  var onErrorUploadResult = function () {
    errorUploadMessage.classList.add('hidden');
    errorUploadMessage.classList.add('error');
    showErrorModal();
  };

  var closeErrorModal = function () {
    errorUploadMessage.classList.remove('error');
    errorUploadMessage.classList.add('hidden');
  };

  var closeSuccessModal = function () {
    successUploadMessage.classList.remove('success');
    successUploadMessage.classList.add('hidden');
  };

  errorButton.addEventListener('click', function () {
    closeErrorModal();
  });

  successButton.addEventListener('click', function () {
    closeSuccessModal();
  });

  // var onImageCommentFocus = function () {

  // };

  var onImageUploadFormSubmit = function (evt) {
    window.request.formUpload(new FormData(imageUploadForm), onSuccessUploadResult, onErrorUploadResult);
    evt.preventDefault();
    closeUploadSetup();
  };

  hashtagsInput.addEventListener('input', function () {
    onHashtagInputInput();
  });

  imageComment.addEventListener('input', function () {
    onCommentInput();
  });

}());
