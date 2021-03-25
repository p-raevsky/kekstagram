/* global _:readonly */

const ALERT_SHOW_TIME = 5000;
const RERENDER_DELAY = 500;

const alertValues = {
  zIndex: 1000,
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  padding: '10px 3px',
  fontSize: '30px',
  textAlign: 'center',
  backgroundColor: 'rgb(255, 0, 0, 0.8)',
  color:'white',
};

const getRandomNumber = (minNumber, maxNumber) => {
  return +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed();
};

const getRandomArray = (minNumber, maxNumber, numberRandomPhotos) => {
  let array = [];

  while (array.length < maxNumber) {
    const item = getRandomNumber(minNumber, maxNumber);

    if (array.indexOf(item) === -1) {
      array.push(item);
    }
  }

  return array.slice(0, numberRandomPhotos);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isEnterEvent = (evt) => evt.key === 'Enter';

const alertContainer = document.createElement('div');

const showAlert = (message) => {
  alertContainer.style.zIndex = alertValues.zIndex;
  alertContainer.style.position = alertValues.position;
  alertContainer.style.left = alertValues.left;
  alertContainer.style.top = alertValues.top;
  alertContainer.style.right = alertValues.right;
  alertContainer.style.padding = alertValues.padding;
  alertContainer.style.fontSize = alertValues.fontSize;
  alertContainer.style.textAlign = alertValues.textAlign;
  alertContainer.style.backgroundColor = alertValues.backgroundColor;
  alertContainer.style.color = alertValues.color;

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const delayBounce = (debouncedItem) => _.debounce(debouncedItem, RERENDER_DELAY);

export {
  getRandomArray,
  isEscEvent,
  isEnterEvent,
  showAlert,
  delayBounce
};
