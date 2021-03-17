import {
  newImage,
  photoPreview,
  resetPreview,
  onNewImageChange
} from './upload-new-picture.js';
import {isEscEvent} from './util.js';
import {
  createSlider,
  closeSlider
} from './apply-effect.js';

const MIN_VALUE_CONTROL = 25;
const MAX_VALUE_CONTROL = 100;

const body = document.querySelector('body');
const imgContainer = document.querySelector('.img-upload__overlay');
const cancelButton = imgContainer.querySelector('#upload-cancel');
const scale = imgContainer.querySelector('.scale');
const controlValue = imgContainer.querySelector('.scale__control--value');

const openPicture = () => {
  createSlider();

  imgContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  controlValue.value = `${MAX_VALUE_CONTROL}%`;

  document.addEventListener('keydown', onEscKeydown);
};

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

const closePicture = () => {
  imgContainer.classList.add('hidden');
  body.classList.remove('modal-open');

  resetPreview();
  closeSlider();

  document.removeEventListener('keydown', onEscKeydown);
};

const changeScale = (evt) => {
  let currentValue = parseInt(controlValue.value);

  if (evt.target.matches('.scale__control--smaller') && currentValue > MIN_VALUE_CONTROL) {
    currentValue = currentValue - MIN_VALUE_CONTROL;
    controlValue.value = `${currentValue}%`;
    photoPreview.style.transform = `scale(${(currentValue) / 100})`;
  }
  if (evt.target.matches('.scale__control--bigger') && currentValue < MAX_VALUE_CONTROL) {
    currentValue = currentValue + MIN_VALUE_CONTROL;
    controlValue.value = `${currentValue}%`;
    photoPreview.style.transform = `scale(${(currentValue) / 100})`;
  }
};

newImage.addEventListener('change', onNewImageChange.bind(null, openPicture));

cancelButton.addEventListener('click', () => {
  closePicture();
});

scale.addEventListener('click', (evt) => {
  changeScale(evt);
});
