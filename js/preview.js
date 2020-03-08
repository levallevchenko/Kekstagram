'use strict';

(function () {

  var COMMENTS_STEP = 5;
  var defaultCommentNumber = COMMENTS_STEP;

  var picturesList = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var pictureLikes = bigPicture.querySelector('.likes-count');
  var pictureCommentsNumber = bigPicture.querySelector('.comments-count');
  var pictureCaption = bigPicture.querySelector('.social__caption');

  var socialCommentsList = bigPicture.querySelector('.social__comments');
  var socialComment = socialCommentsList.querySelector('.social__comment');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  socialCommentsList.innerHTML = '';

  var getComment = function (comment) {
    var commentElement = socialComment.cloneNode(true);
    var commentAvatar = commentElement.querySelector('.social__picture');
    var commentText = commentElement.querySelector('.social__text');

    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentText.textContent = comment.message;

    return commentElement;
  };

  var fillBigPicture = function (picture) {
    bigPictureImage.src = picture.url;
    pictureLikes.textContent = picture.likes;
    pictureCommentsNumber.textContent = picture.comments.length;
    pictureCaption.textContent = picture.description;
  };

  var fillComment = function (array) {
    var fragment = document.createDocumentFragment();
    var commentsNumber = array.comments.length;

    if (commentsNumber < defaultCommentNumber) {
      defaultCommentNumber = commentsNumber;
      socialCommentCount.textContent = array.comments.length + ' из ' + array.comments.length + ' комментариев';
    } else if (commentsNumber >= defaultCommentNumber) {
      defaultCommentNumber = COMMENTS_STEP;
      socialCommentCount.textContent = defaultCommentNumber + ' из ' + array.comments.length + ' комментариев';
    }

    for (var i = 0; i < defaultCommentNumber; i++) {
      var currentComment = getComment(array.comments[i]);
      fragment.appendChild(currentComment);
    }

    socialCommentsList.appendChild(fragment);

    return commentsNumber;
  };

  var onPictureElementEnterPress = function (evt) {
    window.util.isEnterEvent(evt, openFullScreen);

    var isClickOnPicture = evt.target.classList.contains('picture');
    var isClickInsidePicture = evt.target.closest('.picture');

    if (!isClickOnPicture && !isClickInsidePicture) {
      return;
    }
    var imageId = isClickOnPicture ?
      evt.target.dataset.id :
      evt.target.closest('.picture').dataset.id;
    fillBigPicture(window.gallery.pictures[imageId]);
    fillComment(window.gallery.pictures[imageId]);
    socialCommentsList.innerHTML = '';
  };

  var onPictureElementClick = function (evt) {
    var isClickOnPicture = evt.target.classList.contains('picture');
    var isClickInsidePicture = evt.target.closest('.picture');

    if (!isClickOnPicture && !isClickInsidePicture) {
      return;
    }
    var imageId = isClickOnPicture ?
      evt.target.dataset.id :
      evt.target.closest('.picture').dataset.id;

    fillBigPicture(window.gallery.pictures[imageId]);
    fillComment(window.gallery.pictures[imageId]);
    openFullScreen();
  };

  picturesList.addEventListener('click', onPictureElementClick);
  picturesList.addEventListener('keydown', onPictureElementEnterPress);

  var onBigPictureCloseEscPress = function (evt) {
    window.util.isEscEvent(evt, closeFullScreen);
  };

  var openFullScreen = function () {
    bigPicture.classList.remove('hidden');
    picturesList.addEventListener('keydown', onBigPictureCloseEscPress);
    picturesList.removeEventListener('keydown', onPictureElementEnterPress);
    document.querySelector('body').classList.add('modal-open');
  };

  var closeFullScreen = function () {
    socialCommentsList.innerHTML = '';
    bigPicture.classList.add('hidden');
    picturesList.addEventListener('keydown', onPictureElementEnterPress);
    document.removeEventListener('keydown', onBigPictureCloseEscPress);
    document.querySelector('body').classList.remove('modal-open');
  };

  var onBigPictureCloseClick = function () {
    closeFullScreen();
  };

  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  picturesList.addEventListener('keydown', onPictureElementEnterPress);

})();
