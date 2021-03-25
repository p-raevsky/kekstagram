import {removePictures} from './show-pictures.js'
import {getRandomArray} from './util.js';

const ZERO = 0;
const MAX_NUMBER = 24;
const NUMBER_OF_RANDOM_PHOTOS = 10;

const buttonsForFilter = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');

const showFilter = (data) => {
  if (data.length) {
    filterElement.classList.remove('img-filters--inactive');
  }
};

const filterData = (button, data) => {
  removePictures();

  if (button.id === buttonsForFilter.default) {
    return data;
  }

  if (button.id === buttonsForFilter.random) {
    const randomArray = getRandomArray(ZERO, MAX_NUMBER, NUMBER_OF_RANDOM_PHOTOS);

    return data.filter(({id}) => randomArray.includes(id));
  }

  if (button.id === buttonsForFilter.discussed) {
    return data.slice().sort((a, b) => {
      if (a.comments.length > b.comments.length) {
        return -1;
      }

      if (a.comments.length < b.comments.length){
        return 1;
      }

      return 0;
    });
  }
};

export {
  showFilter,
  filterData
};
