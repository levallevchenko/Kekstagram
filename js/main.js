'use strict';

var PICTURES_NUMBER = 25;
var AVATARS_NUMBER = 6;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 200;

var pictureProperties = {
  url: [],
  bigPictureUrl: [],
  names: ['Михаил', 'Катя', 'Марк', 'Олечка', 'Маруся', 'BigMan', 'Тундра'],
  descriptions: ['На море', 'После дождя', 'Я и моя семья', 'Любимый пёс', 'Первый снег', 'Мой ДР'],
  likes: [],
  commentsText: ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  commentsNumber: [],
};

var getRandomItem = function (min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
};

var getRandomElemFromArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getPictures = function () {
  var picturesResult = [];
  for (var i = 0; i < PICTURES_NUMBER; i++) {
    picturesResult[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      bigPictureUrl: 'img/avatar-' + (i + 1) + '.svg',
      names: getRandomElemFromArr(pictureProperties.names),
      descriptions: getRandomElemFromArr(pictureProperties.descriptions),
      likes: getRandomItem(LIKES_MIN, LIKES_MAX),
      commentsText: getRandomElemFromArr(pictureProperties.commentsText),
      commentsNumber: getRandomItem(COMMENTS_MIN, COMMENTS_MAX),
    };
  }
  return picturesResult;
};

var pictures = getPictures();

var pictureList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
var socialComments = bigPicture.querySelector('.social__comments');

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  return pictureElement;
};

var renderBigPicture = function (picture) {

  bigPicture.querySelector('.big-picture__img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;

  socialComments.querySelector('.social__picture').src = picture.bigPictureUrl;
  socialComments.querySelector('.social__picture').alt = picture.names;
  socialComments.querySelector('.social__text').textContent = picture.commentsText;
  bigPicture.querySelector('.social__caption').textContent = picture.descriptions;

  return socialComments;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < PICTURES_NUMBER; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
}

for (var i = 0; i < AVATARS_NUMBER; i++) {
  fragment.appendChild(renderBigPicture(pictures[i]));
}

pictureList.appendChild(fragment);
socialComments.appendChild(fragment);

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');

