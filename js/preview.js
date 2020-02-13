'use strict';

// preview.js
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var pictureImage = bigPicture.querySelector('.big-picture__img img');
  var pictureLikes = bigPicture.querySelector('.likes-count');
  var pictureCommentsNumber = bigPicture.querySelector('.comments-count');
  var pictureCaption = bigPicture.querySelector('.social__caption');

  var socialCommentsList = bigPicture.querySelector('.social__comments');
  var socialComment = bigPicture.querySelector('.social__comment');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  bigPicture.classList.remove('hidden');

  var fillBigPicture = function (picture) {
    pictureImage.src = picture.url;
    pictureLikes.textContent = picture.likes;
    pictureCommentsNumber.textContent = picture.commentsNumber;
    pictureCaption.textContent = picture.descriptions;
  };

  fillBigPicture(window.gallery.pictures[0]);

  var comment = socialComment.cloneNode(true);

  var fillComment = function (picture) {
    var socialAvatar = comment.querySelector('.social__picture');
    var commentText = comment.querySelector('.social__text');
    socialAvatar.src = picture.avatarUrl;
    socialAvatar.alt = picture.names;
    commentText.textContent = picture.commentsText;
  };

  fillComment(window.gallery.pictures[0]);

  socialCommentsList.appendChild(comment);

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  var closefullScreen = function () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  };

  var onBigPictureCloseClick = function () {
    closefullScreen();
  };

  var onBigPictureCloseEnterKeydown = function (evt) {
    window.util.isEscEvent(evt, closefullScreen);
  };

  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  document.addEventListener('keycode', onBigPictureCloseEnterKeydown);
})();

