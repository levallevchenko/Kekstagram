'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram/';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  var getRequest = function (method, url, onSuccess, onError, data) {

    onError = function (message) {
      var errorNode = document.createElement('div');
      errorNode.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; padding: 10px 0; color: #ffe753; background-color: #3c3614';
      errorNode.style.position = 'absolute';
      errorNode.style.left = 0;
      errorNode.style.right = 0;
      errorNode.style.fontSize = '24px';

      errorNode.textContent = message;
      document.body.insertAdjacentElement('afterbegin', errorNode);
    };

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
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
      onError('Слишком долгая загрузка данных');
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
