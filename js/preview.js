'use strict';

// preview.js
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

fillBigPicture(window.picture.get[0]);

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

fillComment(window.picture.get[0]);

socialCommentsList.appendChild(comment);

var socialCommentCount = bigPicture.querySelector('.social__comment-count');
socialCommentCount.classList.add('hidden');

var commentsLoader = bigPicture.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

document.querySelector('body').classList.add('modal-open');


// form.js

var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

var closefullScreen = function () {
  bigPicture.classList.add('hidden');
};

bigPictureClose.addEventListener('click', function () {
  closefullScreen();
});


// window.preview = (function () {
//   var bigPicture = document.querySelector('.big-picture');
//   var pictureImage = bigPicture.querySelector('.big-picture__img img');
//   var pictureLikes = bigPicture.querySelector('.likes-count');
//   var pictureCommentsNumber = bigPicture.querySelector('.comments-count');
//   var pictureCaption = bigPicture.querySelector('.social__caption');
//   var socialCommentsList = bigPicture.querySelector('.social__comments');
//   var socialComment = bigPicture.querySelector('.social__comment');
//   var comment = socialComment.cloneNode(true);
//   var socialAvatar = comment.querySelector('.social__picture');
//   var commentText = comment.querySelector('.social__text');
//   var socialCommentCount = bigPicture.querySelector('.social__comment-count');
//   var commentsLoader = bigPicture.querySelector('.comments-loader');
//   var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
//   var pictures = window.getPictures();

//   return {
//     fillBigPicture: (function (picture) {
//       pictureImage.src = picture.url;
//       pictureLikes.textContent = picture.likes;
//       pictureCommentsNumber.textContent = picture.commentsNumber;
//       pictureCaption.textContent = picture.descriptions;
//       document.querySelector('body').classList.add('modal-open');
//       bigPicture.classList.remove('hidden');
//     })(pictures[0]),

//     fillComment: (function (picture) {
//       socialAvatar.src = picture.avatarUrl;
//       socialAvatar.alt = picture.names;
//       commentText.textContent = picture.commentsText;
//       socialCommentsList.appendChild(comment);
//       socialCommentCount.classList.add('hidden');
//       commentsLoader.classList.add('hidden');
//     })(pictures[1]),

//     // Закрытие большого изображения
//     closefullScreen: function () {
//       bigPicture.classList.add('hidden');
//     },

//     onbigPictureCloseClick: bigPictureClose.addEventListener('click', function () {
//       window.preview.closefullScreen();
//     }),
//   };
// })();

