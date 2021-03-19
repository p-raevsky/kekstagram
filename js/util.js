const ALERT_SHOW_TIME = 5000;

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
//удалить getRandomNumber, если не буду использовать
const getRandomNumber = (minNumber, maxNumber) => {
  return +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed();
};
//удалить getRandomArrayElement, если не буду использовать
const getRandomArrayElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)];
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

export {
  getRandomNumber,
  getRandomArrayElement,
  isEscEvent,
  isEnterEvent,
  showAlert
};
