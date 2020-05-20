'use strict';

(function () {
  var DATA_URL = 'https://javascript.pages.academy/kekstagram/data';
  var UPLOAD_URL = 'https://javascript.pages.academy/kekstagram';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  var getRequest = function (method, url, onSuccess, onError, data) {

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

  var formUpload = function (data, onSuccess, onError) {
    getRequest('POST', UPLOAD_URL, onSuccess, onError, data);
  };

  window.request = {
    dataDownload: dataDownload,
    formUpload: formUpload
  };
})();
