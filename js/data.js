'use strict';

// data.js

(function () {
  var PICTURES_NUMBER = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var COMMENTS_MIN = 0;
  var COMMENTS_MAX = 200;
  var ESC_KEY = 'Escape';
  var mocks = {
    names: ['Михаил', 'Катя', 'Марк', 'Олечка', 'Маруся', 'BigMan', 'Тундра'],
    descriptions: ['На море', 'После дождя', 'Я и моя семья', 'Любимый пёс', 'Первый снег', 'Мой ДР'],
    commentsText: ['Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  };
  var getArray = function (array, length) {
    for (var i = 0; i < length; i++) {
      var arrayResult = [];
      arrayResult.push(array[i]);
    }
    return arrayResult;
  };

  window.data = {
    PICTURES_NUMBER: PICTURES_NUMBER,
    createPicture: function (pictureAmount) {
      var pictures = [];

      for (var j = 0; j < pictureAmount; j++) {
        pictures.push({
          url: 'photos/' + (j + 1) + '.jpg',
          avatarUrl: 'img/avatar-' + (j + 1) + '.svg',
          names: window.util.getRandomElemFromArr(mocks.names),
          descriptions: window.util.getRandomElemFromArr(mocks.descriptions),
          likes: window.util.getRandomItem(LIKES_MIN, LIKES_MAX),
          commentsText: window.util.getRandomElemFromArr(mocks.commentsText),
          commentsNumber: window.util.getRandomItem(COMMENTS_MIN, COMMENTS_MAX),
        });
      }
      return pictures;
    },
  };
})();


// arrayResult[i] = {
//   url: 'photos/' + (i + 1) + '.jpg',
//   avatarUrl: 'img/avatar-' + (i + 1) + '.svg',
//   names: window.util.getRandomElemFromArr(mocks.names),
//   descriptions: window.util.getRandomElemFromArr(mocks.descriptions),
//   likes: window.util.getRandomItem(mocks.LIKES_MIN, mocks.LIKES_MAX),
//   commentsText: window.util.getRandomElemFromArr(mocks.commentsText),
//   commentsNumber: window.util.getRandomItem(mocks.COMMENTS_MIN, mocks.COMMENTS_MAX),
