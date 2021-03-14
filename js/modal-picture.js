import {
  isEscEvent,
  isEnterEvent
} from './util.js';

const LI_CLASS_NAME = 'social__comment';
const COMMENT_AVATAR_SIZE = 35;

const body = document.querySelector('body');
const modalPicture = document.querySelector('.big-picture');
const bigPicture = modalPicture.querySelector('.big-picture__img img');
const likesCount = modalPicture.querySelector('.likes-count');
const commentsCount = modalPicture.querySelector('.comments-count');
const socialCaption = modalPicture.querySelector('.social__caption');
const socialComments = modalPicture.querySelector('.social__comments');
const socialCommentCount = modalPicture.querySelector('.social__comment-count');
const commentsLoader = modalPicture.querySelector('.comments-loader');
const cancelButton = modalPicture.querySelector('.big-picture__cancel');

const createComment = (obj) => {
  socialComments.innerHTML = '';

  if (obj.comments) {
    obj.comments.forEach(element => {
      const newLi = document.createElement('li');
      newLi.className = LI_CLASS_NAME;
      newLi.innerHTML = `<img
          class="social__picture"
          src="${element.avatar}"
          alt="${element.name}"
          width="${COMMENT_AVATAR_SIZE}" height="${COMMENT_AVATAR_SIZE}">
        <p class="social__text">${element.message}</p>`;
      socialComments.appendChild(newLi);
    });
  }
};

const openModalPicture = (obj) => {
  body.classList.add('modal-open');
  modalPicture.classList.remove('hidden');

  bigPicture.src = obj.url;
  likesCount.textContent = obj.likes;
  commentsCount.textContent = obj.comments.length;
  socialCaption.textContent = obj.description;

  createComment(obj);

  socialCommentCount.setAttribute('hidden', '');
  commentsLoader.setAttribute('hidden', '');

  document.addEventListener('keydown', onEscKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
  cancelButton.addEventListener('keydown', onEnterKeydown);
};

const closeModalPicture = () => {
  modalPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  cancelButton.removeEventListener('keydown', onEnterKeydown);
};

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModalPicture();
  }
};

const onEnterKeydown = (evt) => {
  if (isEnterEvent(evt)) {
    evt.preventDefault();
    closeModalPicture();
  }
};

const onCancelButtonClick = () => closeModalPicture();

export {openModalPicture};
