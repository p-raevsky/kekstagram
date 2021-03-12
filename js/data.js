import {getRandomNumber, getRandomArray, getRandomArrayElement} from './util.js';

const ZERO = 0;
const MIN_NUMBER = 1;
const MAX_NUMBER = 25;
const LIKES_MIN_NUMBER = 15;
const LIKES_MAX_NUMBER = 99;
const COMMENTS_MAX_NUMBER = 50;
const AVATAR_MAX_NUMBER = 6;
const MESSAGES_MAX_NUMBER = 5;
const DISCRIPTIONS = [
  'Крутая фотка, лучший кадр, который приходилось делать',
  'Очень люблю это фото',
  'Просто фото, сделанное пару дней назад',
  'Снято моим личным фотографом',
  'Зацените это...',
  'Эту фотку сделал мой ребёнок',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Vladimir',
  'Olha',
  'Natalja Ivanovna',
  'Anonym',
  'Evgen',
  'Kitty',
  'Sasha',
  'Prosto Vasiliy',
  'XXX',
];

const arrayForId = getRandomArray(MIN_NUMBER, MAX_NUMBER);
const arrayForUrl = getRandomArray(MIN_NUMBER, MAX_NUMBER);

const createComments = (index = 0) => {
  const arrayForComments = getRandomArray(MIN_NUMBER, COMMENTS_MAX_NUMBER);

  return {
    id: `1${getRandomNumber(MIN_NUMBER, COMMENTS_MAX_NUMBER)}${arrayForComments[index]}`,
    avatar: `img/avatar-${getRandomNumber(MIN_NUMBER, AVATAR_MAX_NUMBER)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhotoData = (index = 0) => {
  return {
    id: arrayForId[index],
    url: `photos/${arrayForUrl[index]}.jpg`,
    description: getRandomArrayElement(DISCRIPTIONS),
    likes: getRandomNumber(LIKES_MIN_NUMBER, LIKES_MAX_NUMBER),
    comments: createSimilarObjects(getRandomNumber(ZERO, MESSAGES_MAX_NUMBER), createComments),
  };
};

const createSimilarObjects = (amount, createData) => {
  const array = [];

  for ( let i = 0; i < amount; i++) {
    array.push(createData(i));
  }
  return array;
};

const similarDiscriptions = createSimilarObjects(MAX_NUMBER, createPhotoData);

export {similarDiscriptions};
