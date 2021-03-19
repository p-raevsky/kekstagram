import './modal-picture.js';
import './upload-new-picture.js';
import './edit-new-picture.js';
import './apply-effect.js';
import './validation.js';

import {
  pictures,
  showPictures
} from './show-pictures.js';
import {getData} from './api.js';
import {openModalPicture} from './modal-picture.js';
import {showAlert} from './util.js';

let currentData = [];

const onPicturesClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    const arrayIndex = evt.target.dataset.id;

    openModalPicture(currentData[arrayIndex]);
  }
};

getData(showAlert)
  .then(data => {
    currentData = data;
    showPictures(data);
  });

pictures.addEventListener('click', onPicturesClick);
