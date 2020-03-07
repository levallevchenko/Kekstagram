'use strict';

(function () {
  var MAX_PICTURES = 25;
  var RANDOM_PICTURES_NUMBER = 10;

  var FilterId = {
    DEFAULT: 'filter-default',
    RANDOM: 'filter-random',
    DISCUSSED: 'filter-discussed'
  };

  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var imageFiltersBlock = document.querySelector('.img-filters');
  var imageFiltersForm = imageFiltersBlock.querySelector('.img-filters__form');
  imageFiltersBlock.classList.remove('img-filters--inactive');

  var getPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;

    return pictureElement;
  };

  var renderPictures = function (array, picturesNumber) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < picturesNumber; i++) {
      var currentPicture = getPicture(array[i]);
      currentPicture.dataset.id = i;
      fragment.appendChild(currentPicture);
    }
    picturesList.appendChild(fragment);
  };

  var onSuccessLoad = function (data, picturesNumber) {
    window.gallery.pictures = data;
    picturesNumber = MAX_PICTURES;
    imageFiltersBlock.classList.remove('img-filters--inactive');

    renderPictures(data, picturesNumber);
  };

  var removePictures = function () {
    var picturesArray = picturesList.querySelectorAll('.picture');
    picturesArray.forEach(function (element) {
      picturesList.removeChild(element);
    });
  };

  var sortPicturesByComments = function (first, second) {
    if (first.comments.length < second.comments.length) {
      return 1;
    }
    if (first.comments.length > second.comments.length) {
      return -1;
    }
    return 0;
  };

  var activateFilter = function (evt) {
    var activeFilter = document.querySelector('.img-filters__button--active');
    activeFilter.classList.toggle('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  };

  var renderDefaultPictures = function () {
    removePictures();
    window.request.dataDownload(onSuccessLoad);
  };

  var renderRandomPictures = function (pictures) {
    removePictures();
    var randomPicturesArray = window.util.shuffleArray(pictures);
    renderPictures(randomPicturesArray, RANDOM_PICTURES_NUMBER);
  };

  var renderSortedByCommentsPictures = function (pictures) {
    removePictures();
    var sortedByCommentsPictures = pictures.sort(sortPicturesByComments);
    renderPictures(sortedByCommentsPictures, MAX_PICTURES);
  };

  var switchFilters = window.debounce(function (filter) {
    var pictures = window.gallery.pictures;
    switch (filter.id) {
      case FilterId.DEFAULT:
        renderDefaultPictures();
        break;
      case FilterId.RANDOM:
        renderRandomPictures(pictures);
        break;
      case FilterId.DISCUSSED:
        renderSortedByCommentsPictures(pictures);
        break;
    }
  });

  var onImageFiltersFormClick = function (evt) {
    activateFilter(evt);
    switchFilters(evt.target);
  };

  imageFiltersForm.addEventListener('click', onImageFiltersFormClick);

  window.request.dataDownload(onSuccessLoad);

  window.gallery = {
    onSuccessLoad: onSuccessLoad,
  };

})();
