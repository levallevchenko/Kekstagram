'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram/';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };
  var picturesList = document.querySelector('.pictures');
  var messageTemplate = document.querySelector('#error').content.querySelector('.error');

  var getRequest = function (method, url, onSuccess, onError, data) {

    onError = function (message) {
      var errorMessage = messageTemplate.cloneNode(true);
      errorMessage.querySelector('.error__title').textContent = message;
      errorMessage.querySelector('.error__button').style.display = 'none';
      picturesList.appendChild(errorMessage);
    };

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      // console.log(xhr.response);
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        var error;
        switch (xhr.status) {
          case 400:
            error = 'Неверный запрос';
            break;
          case 401:
            error = 'Пользователь не авторизован';
            break;
          case 404:
            error = 'Ничего не найдено';
            break;

          default:
            error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }

        if (error) {
          onError(error);
        }
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };

  var dataDownload = function (onSuccess, onError) {
    getRequest('GET', DATA_URL, onSuccess, onError);
  };

  var formUpload = function (onSuccess, onError) {
    getRequest('POST', UPLOAD_URL, onSuccess, onError);
  };

  window.request = {
    dataDownload: dataDownload,
    formUpload: formUpload
  };
})();
