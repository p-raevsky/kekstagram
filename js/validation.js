const COMMENT_MAX_LENGTH = 140;
const HASHTAG__MAX_LENGTH = 20;
const HASHTAG_AMOUNT = 5;
const BORDER_STYLE_INVALID = 'inset 0 0 0 3px red';
const FIRST_SYMBOL_REGULAR = /^#{1,19}/g;
const REGULAR = /^#[a-zA-Zа-яА-ЯёЁ\d]{1,100}\s?$/g;

const hashtagElement = document.querySelector('.text__hashtags');
const commentElement = document.querySelector('.text__description');

const createValidatedHashtags = (inputValue) => {

  if (inputValue === '') {
    hashtagElement.setCustomValidity('');
    hashtagElement.style.boxShadow = '';

    return;
  }

  let hashtags = [];
  hashtags = inputValue.trim().toLowerCase().split(/ +/g);

  hashtags.forEach((element, index) => {
    if (!element.match(FIRST_SYMBOL_REGULAR)) {
      hashtagElement.setCustomValidity('Хэш-тег начинается с символа #');
      hashtagElement.style.boxShadow = BORDER_STYLE_INVALID;
      hashtags.splice(index);

    } else if (!element.match(REGULAR)) {
      hashtagElement.setCustomValidity('Хэш-тег должен состоять из букв и чисел, не может содержать спецсимволы, символы пунктуации, эмодзи');
      hashtagElement.style.boxShadow = BORDER_STYLE_INVALID;
      hashtags.splice(index);

    } else if (element.length > HASHTAG__MAX_LENGTH) {
      hashtagElement.setCustomValidity(`Удалите лишние ${element.length - HASHTAG__MAX_LENGTH} симв.`);
      hashtagElement.style.boxShadow = BORDER_STYLE_INVALID;

    } else {
      hashtags.push(element);
      hashtags = Array.from(new Set(hashtags));

      hashtagElement.setCustomValidity('');
      hashtagElement.style.boxShadow = '';
    }

    hashtagElement.reportValidity();
  });

  if (hashtags.length > HASHTAG_AMOUNT) {
    hashtagElement.setCustomValidity(`Допускается только ${HASHTAG_AMOUNT} уникальных хеш-тегов`);
    hashtagElement.style.boxShadow = BORDER_STYLE_INVALID;
  }

  hashtagElement.value = hashtags.join(' ');
  hashtagElement.reportValidity();

  return hashtags;
}

const validateComments = (length) => {
  if (length > COMMENT_MAX_LENGTH) {
    commentElement.setCustomValidity(`Удалите лишние ${length - COMMENT_MAX_LENGTH} симв.`);
    commentElement.style.boxShadow = BORDER_STYLE_INVALID;
  } else {
    commentElement.setCustomValidity('');
    commentElement.style.boxShadow = '';
  }

  commentElement.reportValidity();
};

const onHashtagElementChange = (evt) => {
  const value = evt.target.value;
  createValidatedHashtags(value);
};

const onCommentElementInput = (evt) => {
  const valueLength = evt.target.value.length;
  validateComments(valueLength);
};

export {
  hashtagElement,
  commentElement,
  onHashtagElementChange,
  onCommentElementInput
}
