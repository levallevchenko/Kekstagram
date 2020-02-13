'use strict';

// gallery.js
(function () {
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
    for (var i = 0; i < array.length; i++) {
      var currentPicture = getPicture(array[i]);
      fragment.appendChild(currentPicture);
    }
    picturesList.appendChild(fragment);
  };

  var pictures = window.data.createPictures();
  renderPictures(pictures);

  window.gallery = {
    pictures: pictures,
    renderPictures: renderPictures,
  };
})();
