'use strict';

// preview.js
(function () {
  var ONE_HUNDRED_PERCENT = 100;
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

  var imageUpload = document.querySelector('.img-upload');
  var scaleControl = imageUpload.querySelector('.scale__control--value');
  var scaleControlSmaller = imageUpload.querySelector('.scale__control--smaller');
  var scaleControlBigger = imageUpload.querySelector('.scale__control--bigger');
  var imageUploadPreviewImage = imageUpload.querySelector('.img-upload__preview img');

  // bigPicture.classList.remove('hidden');

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

  // Изменение размера

  var setScale = function (value) {
    var ScaleValue = value.substring(0, scaleControl.value.length - 1);
    var scaleNumber = ScaleValue / ONE_HUNDRED_PERCENT;

    imageUploadPreviewImage.style.transform = 'scale' + '(' + scaleNumber + ')';
  };

  var onScaleSmallerClick = function () {
    var scaleValue = scaleControl.value.substring(0, scaleControl.value.length - 1);
    if (scaleValue > 25) {
      scaleControl.value = scaleValue - 25 + '%';
    }
    setScale(scaleControl.value);
  };

  var onScaleBiggerClick = function () {
    var scaleValue = scaleControl.value.substring(0, scaleControl.value.length - 1);
    var scaleValueNumber = parseInt(scaleValue, 10);
    if (scaleValueNumber < 100) {
      scaleControl.value = scaleValueNumber + 25 + '%';
    }
    setScale(scaleControl.value);
  };

  scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleBiggerClick);

})();

// Изменение размера

// var onScaleSmallerClick = function () {
//   var scaleValue = scaleControlValue.substring(0, scaleControlValue.length - 1);
//   scaleControlValue = scaleValue - 25 + '%';
//   return scaleControlValue;
// };

// var onScaleBiggerClick = function () {
//   scaleControlValue += 25 + '%';
// };

// scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
// scaleControlBigger.addEventListener('click', onScaleBiggerClick);

// var setScale = function (value) {
//   var scale = value / ONE_HUNDRED_PERCENT;
//   return scale;
// };

// setScale(scaleControlValue);
