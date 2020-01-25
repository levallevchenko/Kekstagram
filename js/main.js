var PICTURES_NUMBER = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;

var pictureProperties = {
  url: [],
  description: ['На море', 'После дождя', 'Я и моя семья', 'Любимый пёс', 'Первый снег', 'Мой ДР'],
  likes: [],
  comments: ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
};

var getRandomItem = function (min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
};

var getRandomElemFromArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var pictures = [];

var getPictures = function () {
  for (i = 0; i < PICTURES_NUMBER; i++) {
    pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: getRandomElemFromArr(pictureProperties.description),
      likes: getRandomItem(LIKES_MIN, LIKES_MAX),
      comments: getRandomElemFromArr(pictureProperties.comments),
    };
  };
  return pictures;
};

getPictures();

var pictureList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  // pictureElement.querySelector('.picture__comments').textContent = picture.comments;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < PICTURES_NUMBER; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
}

pictureList.appendChild(fragment);
