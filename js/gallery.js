'use strict';

// gallery.js
(function () {
  var picturesAmount = window.data.PICTURES_NUMBER;
  var pictures = window.data.createPicture(picturesAmount);
  var pictureList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  };

  var show = function (array, length, block) {
    for (var i = 0; i < length - 1; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    block.appendChild(fragment);
  };

  window.gallery = {
    show: show(pictures, picturesAmount, pictureList),
  };
})();

// var getPictures = function () {
//   var picturesResult = [];
//   for (var i = 0; i < window.data.PICTURES_NUMBER; i++) {
//     picturesResult[i] = {
//       url: 'photos/' + (i + 1) + '.jpg',
//       avatarUrl: 'img/avatar-' + (i + 1) + '.svg',
//       names: window.util.getRandomElemFromArr(window.data.names),
//       descriptions: window.util.getRandomElemFromArr(window.data.descriptions),
//       likes: window.util.getRandomItem(window.data.LIKES_MIN, window.data.LIKES_MAX),
//       commentsText: window.util.getRandomElemFromArr(window.data.commentsText),
//       commentsNumber: window.util.getRandomItem(window.data.COMMENTS_MIN, window.data.COMMENTS_MAX),
//     };
//   }
//   return picturesResult;
// };
// var renderPicture = function (picture) {
  //   var pictureElement = pictureTemplate.cloneNode(true);
  //   pictureElement.querySelector('.picture__img').src = picture.url;
  //   pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  //   return pictureElement;
  // };

  // var fragment = document.createDocumentFragment();
  // for (var i = 0; i < PICTURES_NUMBER; i++) {
  //   fragment.appendChild(renderPicture(pictures[i]));
  // }
  // pictureList.appendChild(fragment);
