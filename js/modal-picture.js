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

const createComments = (comments) => {
  socialComments.innerHTML = '';

  if (comments) {
    comments.forEach(comment => {
      const newLi = document.createElement('li');

      newLi.className = LI_CLASS_NAME;
      newLi.innerHTML = `<img
          class="social__picture"
          src="${comment.avatar}"
          alt="${comment.name}"
          width="${COMMENT_AVATAR_SIZE}" height="${COMMENT_AVATAR_SIZE}">
        <p class="social__text">${comment.message}</p>`;

      socialComments.appendChild(newLi);
    });
  }
};

const openModalPicture = (photo) => {
  body.classList.add('modal-open');
  modalPicture.classList.remove('hidden');

  bigPicture.src = photo.url;
  bigPicture.alt = '';
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  createComments(photo.comments);

  socialCommentCount.setAttribute('hidden', '');
  commentsLoader.setAttribute('hidden', '');

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
  cancelButton.addEventListener('keydown', onCancelButtonKeydown);
};

const closeModalPicture = () => {
  modalPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  cancelButton.removeEventListener('keydown', onCancelButtonKeydown);
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModalPicture();
  }
};

const onCancelButtonKeydown = (evt) => {
  if (isEnterEvent(evt)) {
    evt.preventDefault();
    closeModalPicture();
  }
};

const onCancelButtonClick = () => closeModalPicture();

export {openModalPicture};
