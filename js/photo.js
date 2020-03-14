'use strict';

(function () {
  var IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#upload-file');
  var photoPreview = document.querySelector('.img-upload__preview img');
  var effectsPreview = document.querySelectorAll('.effects__preview');

  var onFileChooserChange = function () {

    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = IMAGE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoPreview.src = reader.result;
        var effectBackground = 'url(' + reader.result + ')';
        effectsPreview.forEach(function (effect) {
          effect.style.backgroundImage = effectBackground;
        });
      });

      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', onFileChooserChange);

})();
