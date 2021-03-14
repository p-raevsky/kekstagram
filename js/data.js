import {getRandomNumber, getRandomArrayElement} from './util.js';

const ZERO = 0;
const MIN_NUMBER = 1;
const MAX_NUMBER = 25;
const LIKES_MIN_NUMBER = 15;
const LIKES_MAX_NUMBER = 99;
const AVATAR_MAX_NUMBER = 6;
const MESSAGES_MAX_NUMBER = 5;
const DESCRIPTIONS = [
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

let commentId = 0;

const createComment = () => {
  commentId++;
  const id = commentId;

  return {
    id: id,
    avatar: `img/avatar-${getRandomNumber(MIN_NUMBER, AVATAR_MAX_NUMBER)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhoto = (index = 0) => {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(LIKES_MIN_NUMBER, LIKES_MAX_NUMBER),
    comments: new Array(getRandomNumber(ZERO, MESSAGES_MAX_NUMBER)).fill().map(() => createComment()),
  };
};

const createPhotos = (amount) => {
  const photos = [];

  for ( let i = 0; i < amount; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
};

const photos = createPhotos(MAX_NUMBER);

export {photos};
