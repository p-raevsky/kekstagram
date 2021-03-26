const COMMENT_MAX_LENGTH = 140;
const HASHTAG__MAX_LENGTH = 20;
const HASHTAG_AMOUNT = 5;
const BORDER_STYLE_INVALID = 'inset 0 0 0 3px red';
const BORDER_STYLE_NONE = '';
const REGULAR = /^#[a-zA-Zа-яА-ЯёЁ\d]{1,100}\s?$/g;

const messages = {
  none: '',
  otherSymbols: 'Хэш-тег начинается с символа # должен состоять из букв и чисел, не может содержать спецсимволы, символы пунктуации, эмодзи',
  extraSymbolsInHashtag: 'В одном хеш-теге допускается только 20 символов, включая решетку',
  manyHashtags: 'Допускается только 5 уникальных хеш-тегов',
  sameHashtag: 'Один и тот же хэш-тег не может быть использован дважды',
  extraSymbolsInComment: 'В одном комментарии допускается только 140 символов',
};

const showMsg = (element, msg, style) => {
  element.setCustomValidity(msg);
  element.style.boxShadow = style;

  element.reportValidity();
};

const addInvalidity = (message) => {
  invalidities.push(message);
};

const getInvalidities = () => {
  return invalidities.join('. \n');
};

let invalidities = [];

const getInvaliditiesArray = (input) => {
  invalidities = [];

  let elementValue = input.value.trim().toLowerCase().split(/ +/g);

  elementValue.forEach((element) => {
    if (!element.match(REGULAR)) {
      addInvalidity(messages.otherSymbols);
    }

    if (element.length > HASHTAG__MAX_LENGTH) {
      addInvalidity(messages.extraSymbolsInHashtag);
    }

    if (elementValue.indexOf(element) !== elementValue.lastIndexOf(element)) {
      addInvalidity(messages.sameHashtag);
    }
  });

  if (elementValue.length > HASHTAG_AMOUNT) {
    addInvalidity(messages.manyHashtags);
  }

  invalidities = Array.from(new Set(invalidities));

  return invalidities;
};

const validateHashtags = (input) => {
  getInvaliditiesArray(input);

  if (!input.value.trim()) {
    showMsg(input, messages.none, BORDER_STYLE_NONE);
    invalidities = [];

    return;
  }

  if (invalidities.length) {
    const customMessage = getInvalidities();

    showMsg(input, customMessage, BORDER_STYLE_INVALID);
  } else {
    showMsg(input, messages.none, BORDER_STYLE_NONE);
  }
};

const validateComments = (inputElement, length) => {
  if (!inputElement.value) {
    showMsg(inputElement, messages.none, BORDER_STYLE_NONE);

    return;
  }

  if (length > COMMENT_MAX_LENGTH) {
    showMsg(inputElement, messages.extraSymbolsInComment, BORDER_STYLE_INVALID);
  } else {
    showMsg(inputElement, messages.none, BORDER_STYLE_NONE);
  }
};

export {
  validateHashtags,
  validateComments
}
