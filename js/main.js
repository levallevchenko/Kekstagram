'use strict';

var PICTURES_NUMBER = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 200;
var ESC_KEY = 'Escape';

var pictureProperties = {
  names: ['Михаил', 'Катя', 'Марк', 'Олечка', 'Маруся', 'BigMan', 'Тундра'],
  descriptions: ['На море', 'После дождя', 'Я и моя семья', 'Любимый пёс', 'Первый снег', 'Мой ДР'],
  commentsText: ['Всё отлично!',
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

var getPictures = function () {
  var picturesResult = [];
  for (var i = 0; i < PICTURES_NUMBER; i++) {
    picturesResult[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      avatarUrl: 'img/avatar-' + (i + 1) + '.svg',
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

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < PICTURES_NUMBER; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
}
pictureList.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
var pictureImage = bigPicture.querySelector('.big-picture__img img');
var pictureLikes = bigPicture.querySelector('.likes-count');
var pictureCommentsNumber = bigPicture.querySelector('.comments-count');
var pictureCaption = bigPicture.querySelector('.social__caption');

// bigPicture.classList.remove('hidden');

var fillBigPicture = function (picture) {
  pictureImage.src = picture.url;
  pictureLikes.textContent = picture.likes;
  pictureCommentsNumber.textContent = picture.commentsNumber;
  pictureCaption.textContent = picture.descriptions;
};

fillBigPicture(pictures[0]);

var socialCommentsList = bigPicture.querySelector('.social__comments');
var socialComment = bigPicture.querySelector('.social__comment');

var comment = socialComment.cloneNode(true);

var fillComment = function (picture) {
  var socialAvatar = comment.querySelector('.social__picture');
  var commentText = comment.querySelector('.social__text');
  socialAvatar.src = picture.avatarUrl;
  socialAvatar.alt = picture.names;
  commentText.textContent = picture.commentsText;
};

fillComment(pictures[1]);

socialCommentsList.appendChild(comment);

var socialCommentCount = bigPicture.querySelector('.social__comment-count');
socialCommentCount.classList.add('hidden');

var commentsLoader = bigPicture.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

document.querySelector('body').classList.add('modal-open');


// Новое задание:

var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

var closefullScreen = function () {
  bigPicture.classList.add('hidden');
};

bigPictureClose.addEventListener('click', function () {
  closefullScreen();
});

// При наступлении события change на поле #upload-file, можно показывать форму редактирования изображения .img-upload__overlay
var imageUpload = document.querySelector('.img-upload');
var imageSetup = imageUpload.querySelector('.img-upload__overlay');
var uploadFile = imageUpload.querySelector('#upload-file');

var openUploadSetup = function () {
  imageSetup.classList.remove('hidden');
  document.addEventListener('keydown', onCloseUploadSetupEscPress);
};

uploadFile.addEventListener('change', function () {
  openUploadSetup();
});

// Закрыть форму пользователь может нажатием кнопки #upload-cancel, либо нажатием клавиши Esc.
var uploadCancel = imageUpload.querySelector('#upload-cancel');

var onCloseUploadSetupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeUploadSetup();
  }
};

var closeUploadSetup = function () {
  imageSetup.classList.add('hidden');
  document.removeEventListener('keydown', onCloseUploadSetupEscPress);
  // при закрытии формы, дополнительно необходимо сбрасывать значение поля выбора файла #upload-file
  uploadFile.value = '';
};

uploadCancel.addEventListener('click', function () {
  closeUploadSetup();
});

// Применение эффекта для изображения и редактирование размера изображения
var effectLevelLine = imageUpload.querySelector('.effect-level__line');
var effectLevelPin = imageUpload.querySelector('.effect-level__pin');
var effectLevelDepth = imageUpload.querySelector('.effect-level__depth');
var effectsList = imageUpload.querySelector('.effects__list');

imageSetup.classList.remove('hidden');

var ONE_HUNDRED_PERCENT = 100;
var EFFECT_PIN_LEFT_START = '20%';
var effectLevelLineWidth = effectLevelLine.offsetWidth;
var onePercentEffectLevelLineWidth = effectLevelLineWidth / ONE_HUNDRED_PERCENT;


var onEffectLevelPinMouseup = function (evt) {
  var pinLeft = evt.offsetX / onePercentEffectLevelLineWidth;
  var pinLeftString = String(pinLeft);
  effectLevelPin.style.left = pinLeftString + '%';
  effectLevelDepth.style.width = pinLeftString + '%';
};

effectLevelLine.addEventListener('mouseup', onEffectLevelPinMouseup);

var onEffectsListClick = function () {
  effectLevelPin.style.left = EFFECT_PIN_LEFT_START;
  effectLevelDepth.style.width = EFFECT_PIN_LEFT_START;
};

effectsList.addEventListener('click', onEffectsListClick);

// Валидация хеш-тегов
// var imageUploadForm = document.querySelector('.img-upload__form');
// var hashtags = imageSetup.querySelector('.text__hashtags');

// var onImageUploadFormSubmit = function () {
//   evt.preventDefault();
//   imageSetup.classList.add('hidden');
//   var hashtagsValue = hashtags.value;
//   var hashtagsArr = hashtagsValue.split(' ', 5); // не работает

//   Есть ли повторяющиеся хештеги
//   for (var h = 0; h < hashtagsArr; h++) {
//     for (var j = 1; j < hashtagsArr; h++) {
//     if (hashtagsArr[h] !== hashtagsArr[j]) {

//     }
//   }
// };

// imageUploadForm.addEventListener('submit', onImageUploadFormSubmit);


// Набор из букв и цифр (латиница + кириллица):
// [а-яА-ЯёЁa-zA-Z0-9]+$
