const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const IMAGE_STYLE_OBJECT_FIT = 'cover';
const IMAGE_SIZE = '100%';
const TRANSFORM_DEFAULT_VALUE = 1;
const IMAGE_STYLE_OVERFLOW ='hidden';

const newImage = document.querySelector('#upload-file');
const photo = document.querySelector('.img-upload__preview');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const uploadPhoto = (onModalOpen) => {
  photoPreview.src = '';

  let file = newImage.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((ending) => fileName.endsWith(ending));
  const reader = new FileReader();

  if (matches) {
    reader.readAsDataURL(file);

    reader.addEventListener('load', () => {
      photoPreview.src = reader.result;
      photoPreview.style.width = IMAGE_SIZE;
      photoPreview.style.height = IMAGE_SIZE;
      photoPreview.style.objectFit = IMAGE_STYLE_OBJECT_FIT;
      photo.style.overflow = IMAGE_STYLE_OVERFLOW;

      changeEffectsPreview(reader.result);
    });

    onModalOpen();
  }
};

const changeEffectsPreview = (result = '') => {
  effectsPreview.forEach((preview) => {
    preview.style.backgroundImage = `url(${result})`;
  });
};

const resetPreview = () => {
  photoPreview.src = '';
  photoPreview.style.transform = `scale(${TRANSFORM_DEFAULT_VALUE})`;
  changeEffectsPreview();
};

export {
  newImage,
  photoPreview,
  resetPreview,
  uploadPhoto
};
