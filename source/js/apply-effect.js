import noUiSlider from 'noUiSlider';
import 'nouislider/distribute/nouislider.css';

import {photoPreview} from './upload-new-picture.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const valueElement = sliderContainer.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects');

const effects = {
  none: {
    value: 'none',
    id: 'effect-none',
  },
  chrome: {
    value: 'chrome',
    id: 'effect-chrome',
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  sepia: {
    value: 'sepia',
    id: 'effect-sepia',
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  marvin: {
    value: 'marvin',
    id: 'effect-marvin',
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
  },
  phobos: {
    value: 'phobos',
    id: 'effect-phobos',
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
  },
  heat: {
    value: 'heat',
    id: 'effect-heat',
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
  },
};

const createSlider = () => {
  sliderContainer.classList.add('hidden');

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  effectsList.addEventListener('change', onEffectsListChange);
};

const onEffectsListChange = (evt) => {
  const effect = evt.target.value;

  sliderContainer.classList.remove('hidden');
  photoPreview.className = '';
  photoPreview.classList.add(`effects__preview--${effect}`);

  if (effect !== effects.none.value) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effects[effect].min,
        max: effects[effect].max,
      },
      start: effects[effect].start,
      step: effects[effect].step,
    });

    sliderElement.noUiSlider.on('update', (values, handle) => {
      valueElement.value = values[handle];

      const effectValue = effects[effect].filter;
      const unit = effects[effect].unit;

      photoPreview.style.filter = `${effectValue}(${valueElement.value}${unit})`;
    });
  } else {
    photoPreview.style.filter = '';
    sliderContainer.classList.add('hidden');
  }
};

const closeSlider = () => {

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  photoPreview.className = '';
  photoPreview.style.filter = '';

  effectsList.removeEventListener('change', onEffectsListChange);
};

export {
  createSlider,
  closeSlider
};
