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

const showMsg = (element, msg, style) => {
  element.setCustomValidity(msg);
  element.style.boxShadow = style;
};

const createValidatedHashtags = (inputElement ,inputValue) => {
  if (inputValue === '') {
    showMsg(inputElement, messages.none, BORDER_STYLE_NONE);

    return;
  }

  let hashtags = inputValue.trim().toLowerCase().split(/ +/g);

  hashtags.forEach((element, index) => {
    if (!element.match(FIRST_SYMBOL_REGULAR)) {
      showMsg(inputElement, messages.missingHashtag, BORDER_STYLE_INVALID);
      hashtags.splice(index);

    } else if (!element.match(REGULAR)) {
      showMsg(inputElement, messages.otherSymbols, BORDER_STYLE_INVALID);
      hashtags.splice(index);

    } else if (element.length > HASHTAG__MAX_LENGTH) {
      showMsg(inputElement, messages.extraSymbolsInHashtag, BORDER_STYLE_INVALID);

    } else {
      hashtags.push(element);
      hashtags = Array.from(new Set(hashtags));

      showMsg(inputElement, messages.none, BORDER_STYLE_NONE);
    }

    inputElement.reportValidity();
  });

  if (hashtags.length > HASHTAG_AMOUNT) {
    showMsg(inputElement, messages.manyHashtags, BORDER_STYLE_INVALID);
  }

  inputElement.value = hashtags.join(' ');
  inputElement.reportValidity();

  return hashtags;
}

const validateComments = (inputElement, length) => {
  if (length > COMMENT_MAX_LENGTH) {
    showMsg(inputElement, messages.extraSymbolsInComment, BORDER_STYLE_INVALID);
  } else {
    showMsg(inputElement, messages.none, BORDER_STYLE_NONE);
  }

  inputElement.reportValidity();
};

export {
  createValidatedHashtags,
  validateComments
}
