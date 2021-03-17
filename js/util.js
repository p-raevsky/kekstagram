const getRandomNumber = (minNumber, maxNumber) => {
  return +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed();
};

const getRandomArrayElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)];
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isEnterEvent = (evt) => evt.key === 'Enter';

export {
  getRandomNumber,
  getRandomArrayElement,
  isEscEvent,
  isEnterEvent
};
