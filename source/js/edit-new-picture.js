import {
  newImage,
  photoPreview,
  resetPreview,
  uploadPhoto
} from './upload-new-picture.js';
import {isEscEvent} from './util.js';
import {
  createSlider,
  closeSlider
} from './apply-effect.js';
import {
  validateHashtags,
  validateComments
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
const hashtagElement = document.querySelector('.text__hashtags');
const commentElement = document.querySelector('.text__description');

const openPicture = () => {
  createSlider();

  imgContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  controlValue.value = `${MAX_VALUE_CONTROL}%`;

  document.addEventListener('keydown', onDocumentKeydown);
  hashtagElement.addEventListener('input', onHashtagElementInput);
  commentElement.addEventListener('input', onCommentElementInput);
  newImageForm.addEventListener('submit', onAdFormSubmit);
};

const closePicture = () => {
  imgContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  newImage.value = '';
  hashtagElement.value = '';
  commentElement.value = '';
  hashtagElement.style.boxShadow = '';

  resetPreview();
  closeSlider();
  validateHashtags(hashtagElement);

  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagElement.removeEventListener('input', onHashtagElementInput);
  commentElement.removeEventListener('input', onCommentElementInput);
  newImageForm.removeEventListener('submit', onAdFormSubmit);
};

let isSuccessPopupOpen = false;
let isErorrPopupOpen = false;

const onAdFormSubmit = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(
    () => {
      showPopup(successTemplate);
      closePicture();
      document.addEventListener('keydown', onDocumentKeydown);
    },
    () => {
      showPopup(errorTemplate);
      isErorrPopupOpen = true;
    },
    formData,
  );
};

const showPopup = (elementTemplate) => {
  const element = elementTemplate.cloneNode(true);
  const button = element.querySelector('button');

  element.style.zIndex = Z_INDEX_VALUE;
  main.appendChild(element);

  if (elementTemplate.className === 'success') {
    isSuccessPopupOpen = true;

  } else {
    isErorrPopupOpen = true;
  }

  button.addEventListener('click', () => closePopup());
  document.addEventListener ('click', onDocumentClick);
};

const removePopup =(element) => {
  element.remove();
};

const closePopup = () => {
  const successElement = document.querySelector('.success');
  const errorElement = document.querySelector('.error');

  isSuccessPopupOpen = false;
  isErorrPopupOpen = false;

  successElement ? removePopup(successElement) : removePopup(errorElement);

  document.removeEventListener ('click', onDocumentClick);
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt) && (isSuccessPopupOpen || isErorrPopupOpen)) {
    evt.preventDefault();
    closePopup();
    return;
  }

  closePicture();
};

const onDocumentClick = (evt) => {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }

  closePopup();
}

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

const onHashtagElementInput = (evt) => {
  const element = evt.target;
  validateHashtags(element);
};

const onCommentElementInput = (evt) => {
  const valueLength = evt.target.value.length;
  validateComments(commentElement, valueLength);
};

hashtagElement.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

hashtagElement.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

commentElement.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

commentElement.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

newImage.addEventListener('change', () => uploadPhoto(openPicture));

cancelButton.addEventListener('click', () => {
  closePicture();
});

scale.addEventListener('click', (evt) => {
  changeScale(evt);
});
