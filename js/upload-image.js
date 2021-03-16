const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const IMAGE_STYLE_OBJECT_FIT = 'cover';
const IMAGE_SIZE = '100%';
const TRANSFORM_DEFAULT_VALUE = 1;
const IMAGE_STYLE_OVERFLOW ='hidden';

const newImage = document.querySelector('#upload-file');
const photo = document.querySelector('.img-upload__preview');
const photoPreview = document.querySelector('.img-upload__preview img');

const uploadPicture = () => {
  const file = newImage.files[0];

  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => fileName.endsWith(ending));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      photoPreview.src = reader.result;
      photoPreview.style.width = IMAGE_SIZE;
      photoPreview.style.height = IMAGE_SIZE;
      photoPreview.style.objectFit = IMAGE_STYLE_OBJECT_FIT;
      photo.style.overflow = IMAGE_STYLE_OVERFLOW;
    });

    reader.readAsDataURL(file);
  }
};

const onNewImageChange = () => {
  uploadPicture();
};

const resetPreview = () => {
  photoPreview.src = '';
  photoPreview.style.transform = `scale(${TRANSFORM_DEFAULT_VALUE})`;
};

newImage.addEventListener('change', onNewImageChange);

export {
  newImage,
  photoPreview,
  resetPreview
};
