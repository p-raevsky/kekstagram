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
import {
  hashtagElement,
  commentElement,
  onHashtagElementChange,
  onCommentElementInput
} from './validation.js';
import {sendData} from './api.js';

const MIN_VALUE_CONTROL = 25;
const MAX_VALUE_CONTROL = 100;
const Z_INDEX_VALUE = 1000;

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const body = document.querySelector('body');
const imgContainer = document.querySelector('.img-upload__overlay');
const cancelButton = imgContainer.querySelector('#upload-cancel');
const scale = imgContainer.querySelector('.scale');
const controlValue = imgContainer.querySelector('.scale__control--value');
const newImageForm = document.querySelector('.img-upload__form');

const openPicture = () => {
  createSlider();

  imgContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  controlValue.value = `${MAX_VALUE_CONTROL}%`;

  document.addEventListener('keydown', onEscKeydownInPicture);
  hashtagElement.addEventListener('change', onHashtagElementChange);
  commentElement.addEventListener('input', onCommentElementInput);
  newImageForm.addEventListener('submit', onAdFormSubmit);
};

const closePicture = () => {
  const currentElement = document.activeElement.id;

  if (currentElement === hashtagElement.id || currentElement === commentElement.id) {
    return;
  }

  imgContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  newImage.value = '';
  hashtagElement.value = '';
  commentElement.value = '';
  hashtagElement.style.boxShadow = '';

  resetPreview();
  closeSlider();

  document.removeEventListener('keydown', onEscKeydownInPicture);
  hashtagElement.removeEventListener('change', onHashtagElementChange);
  commentElement.removeEventListener('input', onCommentElementInput);
  newImageForm.removeEventListener('submit', onAdFormSubmit);
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

const onEscKeydownInPicture = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

const onAdFormSubmit = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(
    () => {
      showPopup(successTemplate);
      closePicture();
    },
    () => {
      showPopup(errorTemplate);
      document.removeEventListener('keydown', onEscKeydownInPicture);
    },
    formData,
  );
};

const showPopup = (elementTemplate) => {
  const element = elementTemplate.cloneNode(true);
  const button = element.querySelector('button');

  element.style.zIndex = Z_INDEX_VALUE;

  main.appendChild(element);

  button.addEventListener('click', () => closePopup());
  document.addEventListener('keydown', onEscKeydownInPopup);
  document.addEventListener ('click', (evt) => {
    if (evt.target.className !== 'success' || evt.target.className !== 'error') {
      element.remove();
    }
  });
};

const removePopup =(element) => {
  element.remove();
  const button = element.querySelector('button');
  button.removeEventListener('click', () => closePopup());
};

const closePopup = () => {
  const successElement = document.querySelector('.success');
  const errorElement = document.querySelector('.error');

  successElement
    ? removePopup(successElement)
    : removePopup(errorElement);

  document.removeEventListener('keydown', onEscKeydownInPopup);
};

const onEscKeydownInPopup = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
    document.addEventListener('keydown', onEscKeydownInPicture);
  }
};

newImage.addEventListener('change', onNewImageChange.bind(null, openPicture));

cancelButton.addEventListener('click', () => {
  closePicture();
});

scale.addEventListener('click', (evt) => {
  changeScale(evt);
});
