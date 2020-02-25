'use strict';

(function () {
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var PICTURES_NUMBER = 25;

  var getPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    // pictureElement.dataset.id = 1;
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;

    return pictureElement;
  };

  // var renderPictures = function (array) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < array.length; i++) {
  //     var currentPicture = getPicture(array[i]);
  //     fragment.appendChild(currentPicture);
  //   }
  //   picturesList.appendChild(fragment);
  // };

  var onSuccessLoad = (function (pictures) {
    var picturesResult = [pictures];
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PICTURES_NUMBER; i++) {
      getPicture(pictures[i]).dataset.id = i;
      fragment.appendChild(getPicture(pictures[i]));
    }
    picturesList.appendChild(fragment);
    return picturesResult;
  });

  // var onErrorLoad = function (errorMessage) {
  //   var node = document.createElement('div');
  //   node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  //   node.style.position = 'absolute';
  //   node.style.left = 0;
  //   node.style.right = 0;
  //   node.style.fontSize = '30px';

  //   node.textContent = errorMessage;
  //   document.body.insertAdjacentElement('afterbegin', node);
  // };

  // var pictures = window.data.createPictures();
  // renderPictures(pictures);
  var pictures = window.load(onSuccessLoad);
  // var pictures = onSuccessLoad(pictures);

  window.gallery = {
    pictures: pictures,
    onSuccessLoad: onSuccessLoad,
    // renderPictures: renderPictures,
  };

})();
