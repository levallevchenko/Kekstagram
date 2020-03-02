'use strict';

(function () {
  var MAX_PICTURES = 25;
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var getPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;

    return pictureElement;
  };

  var renderPictures = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_PICTURES; i++) {
      var currentPicture = getPicture(array[i]);
      currentPicture.dataset.id = i;
      fragment.appendChild(currentPicture);
    }
    picturesList.appendChild(fragment);
  };

  var onSuccessLoad = function (pictures) {
    window.gallery.pictures = pictures;
    renderPictures(pictures);
  };

  window.request.dataDownload(onSuccessLoad);

  window.gallery = {
    onSuccessLoad: onSuccessLoad,
  };

})();
