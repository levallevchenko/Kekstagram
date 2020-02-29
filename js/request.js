'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram/';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  var getRequest = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      // console.log(xhr.response);
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
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
