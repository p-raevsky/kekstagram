const getRandomNumber = (minNumber, maxNumber) => {
  return +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed();
};

const getRandomArray = (minNumber, maxNumber) => {
  let array = [];

  while (array.length < maxNumber) {
    const item = getRandomNumber(minNumber, maxNumber);

    if (array.indexOf(item) === -1) {
      array.push(item);
    }
  }

  return array;
};

const getRandomArrayElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)];
};

const checkMaxStrLength = (checkedStr, maxLength) => {
  const checkedStrLength = checkedStr.length;

  return checkedStrLength <= maxLength;
};

export {getRandomNumber, getRandomArray, getRandomArrayElement, checkMaxStrLength};
