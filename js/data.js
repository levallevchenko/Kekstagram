'use strict';

(function () {
  var AVATAR_NUMBER = 6;
  var PICTURES_NUMBER = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var COMMENTS_MIN = 0;
  var COMMENTS_MAX = 200;


  var FolderMap = {
    PICTURE: 'photos/',
    AVATAR: 'img/avatar-'
  };

  var FormatMap = {
    PICTURE: '.jpg',
    AVATAR: '.svg'
  };

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

  var createPictures = function () {
    var picturesResult = [];
    for (var i = 0; i < PICTURES_NUMBER; i++) {
      picturesResult[i] = {
        id: i,
        url: FolderMap.PICTURE + (i + 1) + FormatMap.PICTURE,
        avatarUrl: FolderMap.AVATAR + window.util.getRandomItem(1, AVATAR_NUMBER) + FormatMap.AVATAR,
        names: window.util.getRandomElemFromArr(mocks.names),
        descriptions: window.util.getRandomElemFromArr(mocks.descriptions),
        likes: window.util.getRandomItem(LIKES_MIN, LIKES_MAX),
        commentsText: window.util.getRandomElemFromArr(mocks.commentsText),
        commentsNumber: window.util.getRandomItem(COMMENTS_MIN, COMMENTS_MAX),
      };
    }
    return picturesResult;
  };

  window.data = {
    createPictures: createPictures,
  };

})();
