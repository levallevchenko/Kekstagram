'use strict';

(function () {

  var COMMENTS_STEP = 5;
  var defaultCommentsNumber = COMMENTS_STEP;

  var picturesList = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var pictureLikes = bigPicture.querySelector('.likes-count');
  var pictureCommentsNumber = bigPicture.querySelector('.comments-count');
  var pictureCaption = bigPicture.querySelector('.social__caption');

  var socialCommentsList = bigPicture.querySelector('.social__comments');
  var socialComment = socialCommentsList.querySelector('.social__comment');
  var socialCommentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
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

  var fillComments = function (comments, step) {
    var fragment = document.createDocumentFragment();
    var commentsNumber = comments.length;
    var existingComments = socialCommentsList.querySelectorAll('.social__comment');
    var commentsNumberText = ' из ' + commentsNumber + ' комментариев';
    var start = existingComments ? existingComments.length : 0;
    var end = start + step;
    if (start + step > commentsNumber) {
      end = commentsNumber;
    }

    if (commentsNumber >= defaultCommentsNumber) {
      defaultCommentsNumber = step;
      socialCommentsCount.textContent = existingComments.length + step + commentsNumberText;
      commentsLoaderButton.classList.remove('hidden');
    } else {
      defaultCommentsNumber = commentsNumber;
      socialCommentsCount.textContent = commentsNumber + commentsNumberText;
      commentsLoaderButton.classList.add('hidden');
    }

    var renderComments = comments.slice(start, end);

    renderComments.forEach(function (comment) {
      fragment.appendChild(getComment(comment));
    });

    if (commentsNumber - existingComments.length < step) {
      socialCommentsCount.textContent = commentsNumber + commentsNumberText;
      commentsLoaderButton.classList.add('hidden');
    }

    socialCommentsList.appendChild(fragment);
  };

  var openPreview = function (evt) {
    var isClickOnPicture = evt.target.classList.contains('picture');
    var isClickInsidePicture = evt.target.closest('.picture');

    if (!isClickOnPicture && !isClickInsidePicture) {
      return;
    }
    var imageId = isClickOnPicture ?
      evt.target.dataset.id :
      evt.target.closest('.picture').dataset.id;

    var targetImage =
      window.gallery.pictures
        .find(function (picture) {
          return picture.id === +imageId;
        });

    socialCommentsList.innerHTML = '';
    fillBigPicture(targetImage);
    fillComments(targetImage.comments, COMMENTS_STEP);
    openFullScreen();

    var onCommentsLoaderButtonClick = function () {
      socialCommentsCount.textContent = '';
      fillComments(targetImage.comments, COMMENTS_STEP);
    };
    commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);

  };

  var onPictureElementClick = function (evt) {
    openPreview(evt);
  };

  var onPictureElementEnterPress = function (evt) {
    window.util.isEnterEvent(evt, function () {
      openPreview(evt);
    });
  };

  picturesList.addEventListener('click', onPictureElementClick);
  picturesList.addEventListener('keydown', onPictureElementEnterPress);

  var onBigPictureCloseEscPress = function (evt) {
    window.util.isEscEvent(evt, closeFullScreen);
  };

  var openFullScreen = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureCloseEscPress);
    picturesList.removeEventListener('keydown', onPictureElementEnterPress);
    document.querySelector('body').classList.add('modal-open');
  };

  var closeFullScreen = function () {
    socialCommentsList.innerHTML = '';
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureCloseEscPress);
    picturesList.addEventListener('keydown', onPictureElementEnterPress);
    document.querySelector('body').classList.remove('modal-open');
    socialCommentsList.innerHTML = '';
  };

  var onBigPictureCloseClick = function () {
    closeFullScreen();
  };

  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  picturesList.addEventListener('keydown', onPictureElementEnterPress);

})();
