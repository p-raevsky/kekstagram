import './edit-new-picture.js';

import {getData} from './api.js';
import {
  showAlert,
  delayBounce
} from './util.js';
import {openModalPicture} from './modal-picture.js';
import {
  picturesList,
  showPictures
} from './show-pictures.js';
import {
  showFilter,
  filterData
} from './filter-data.js';

const filterFormElement = document.querySelector('.img-filters__form');
const filterButtonlement = filterFormElement.querySelectorAll('.img-filters__button');

const onPicturesClick = (evt) => {
  if (evt.target.closest('.picture')) {
    const el = evt.target.closest('.picture');
    const arrayIndex = el.dataset.id;

    openModalPicture(currentData[arrayIndex]);
  }
};

const onFilterFormElementClick = delayBounce((evt) => {
  const button = evt.target;
  const filteredData = filterData(button, currentData);

  filterButtonlement.forEach(element => element.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');

  showPictures(filteredData);
});

let currentData = [];

getData(showAlert)
  .then(data => {
    currentData = data;

    showFilter(currentData);
    showPictures(currentData);
  });

picturesList.addEventListener('click', onPicturesClick);

filterFormElement.addEventListener('click', onFilterFormElementClick);
