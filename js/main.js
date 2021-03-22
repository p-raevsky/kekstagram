import './edit-new-picture.js';

import {getData} from './api.js';
import {showAlert} from './util.js';
import {openModalPicture} from './modal-picture.js';
import {
  picturesList,
  showPictures
} from './show-pictures.js';

const onPicturesClick = (evt) => {
  if (evt.target.closest('.picture')) {
    const el = evt.target.closest('.picture');
    const arrayIndex = el.dataset.id;
    openModalPicture(currentData[arrayIndex]);
  }
};

let currentData = [];

getData(showAlert)
  .then(data => {
    currentData = data;
    showPictures(data);
  });

picturesList.addEventListener('click', onPicturesClick);
