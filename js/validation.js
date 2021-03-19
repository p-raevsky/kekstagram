const COMMENT_MAX_LENGTH = 140;
const HASHTAG__MAX_LENGTH = 20;
const HASHTAG_AMOUNT = 5;
const BORDER_STYLE_INVALID = 'inset 0 0 0 3px red';
const BORDER_STYLE_NONE = '';
const FIRST_SYMBOL_REGULAR = /^#{1,19}/g;
const REGULAR = /^#[a-zA-Zа-яА-ЯёЁ\d]{1,100}\s?$/g;

const messages = {
  none: '',
  missingHashtag: 'Хэш-тег начинается с символа #',
  otherSymbols: 'Хэш-тег должен состоять из букв и чисел, не может содержать спецсимволы, символы пунктуации, эмодзи',
  extraSymbolsInHashtag: 'В одном хеш-теге допускается только 20 символов, включая решетку',
  manyHashtags: 'Допускается только 5 уникальных хеш-тегов',
  extraSymbolsInComment: 'В одном комментарии допускается только 140 символов',
};

const hashtagElement = document.querySelector('.text__hashtags');
const commentElement = document.querySelector('.text__description');

const showMsg = (element, msg, style) => {
  element.setCustomValidity(msg);
  element.style.boxShadow = style;
};

const createValidatedHashtags = (inputValue) => {

  if (inputValue === '') {
    showMsg(hashtagElement, messages.none, BORDER_STYLE_NONE);

    return;
  }

  let hashtags = [];
  hashtags = inputValue.trim().toLowerCase().split(/ +/g);

  hashtags.forEach((element, index) => {
    if (!element.match(FIRST_SYMBOL_REGULAR)) {
      showMsg(hashtagElement, messages.missingHashtag, BORDER_STYLE_INVALID);
      hashtags.splice(index);

    } else if (!element.match(REGULAR)) {
      showMsg(hashtagElement, messages.otherSymbols, BORDER_STYLE_INVALID);
      hashtags.splice(index);

    } else if (element.length > HASHTAG__MAX_LENGTH) {
      showMsg(hashtagElement, messages.extraSymbolsInHashtag, BORDER_STYLE_INVALID);

    } else {
      hashtags.push(element);
      hashtags = Array.from(new Set(hashtags));

      showMsg(hashtagElement, messages.none, BORDER_STYLE_NONE);
    }

    hashtagElement.reportValidity();
  });

  if (hashtags.length > HASHTAG_AMOUNT) {
    showMsg(hashtagElement, messages.manyHashtags, BORDER_STYLE_INVALID);
  }

  hashtagElement.value = `${hashtags.join(' ')} `;
  hashtagElement.reportValidity();

  return hashtags;
}

const validateComments = (length) => {
  if (length > COMMENT_MAX_LENGTH) {
    showMsg(commentElement, messages.extraSymbolsInComment, BORDER_STYLE_INVALID);
  } else {
    showMsg(commentElement, messages.none, BORDER_STYLE_NONE);
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
