'use strict';

(function (url, ) {
  var SERVER_URL = 'https://js.dump.academy/kekstagram/data';
  var statusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('GET', SERVER_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      };
    });
    xhr.send();
    console.log(xhr.response);
  };
})();
