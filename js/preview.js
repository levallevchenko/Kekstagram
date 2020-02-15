'use strict';

(function () {
  var pictures = window.gallery.pictures;
  var picturesList = document.querySelector('.pictures');
  var pictureElement = picturesList.querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var pictureLikes = bigPicture.querySelector('.likes-count');
  var pictureCommentsNumber = bigPicture.querySelector('.comments-count');
  var pictureCaption = bigPicture.querySelector('.social__caption');

  var socialCommentsList = bigPicture.querySelector('.social__comments');
  var socialComment = bigPicture.querySelector('.social__comment');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var comment = socialComment.cloneNode(true);

  socialCommentsList.appendChild(comment);
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  var fillBigPicture = function (picture) {
    bigPictureImage.src = picture.url;
    pictureLikes.textContent = picture.likes;
    pictureCommentsNumber.textContent = picture.commentsNumber;
    pictureCaption.textContent = picture.descriptions;
  };

  var fillComment = function (picture) {
    var socialAvatar = comment.querySelector('.social__picture');
    var commentText = comment.querySelector('.social__text');
    socialAvatar.src = picture.avatarUrl;
    socialAvatar.alt = picture.names;
    commentText.textContent = picture.commentsText;
  };

  var onPictureElementEnterPress = function (evt) {
    window.util.isEnterEvent(evt, openFullScreen);
  };

  pictureElement.addEventListener('keydown', onPictureElementEnterPress);

  var onPictureElementClick = function (evt) {
    var index = evt.target.dataset.id;
    fillBigPicture(pictures[index]);
    fillComment(pictures[index]);
    openFullScreen();
  };

  picturesList.addEventListener('click', onPictureElementClick);

  var onBigPictureCloseEscPress = function (evt) {
    window.util.isEscEvent(evt, closeFullScreen);
  };

  var openFullScreen = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureCloseEscPress);
    document.querySelector('body').classList.add('modal-open');
  };

  var closeFullScreen = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureCloseEscPress);
    document.querySelector('body').classList.remove('modal-open');
  };

  var onBigPictureCloseClick = function () {
    closeFullScreen();
  };

  bigPictureClose.addEventListener('click', onBigPictureCloseClick);

  window.preview = {
    fillComment: fillComment,
  };

})();

