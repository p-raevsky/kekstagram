import {isEscEvent} from './util.js';

const LI_CLASS_NAME = 'social__comment';
const IMG_CLASS_NAME = 'social__picture';
const PAR_CLASS_NAME = 'social__text';
const COMMENT_AVATAR_SIZE = 35;
const COMMENTS_AMOUNT = 5;

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
      const newImg = document.createElement('img');
      const newPar = document.createElement('p');

      newLi.className = LI_CLASS_NAME;
      newImg.className = IMG_CLASS_NAME;
      newImg.src = comment.avatar;
      newImg.alt = comment.name;
      newImg.width = COMMENT_AVATAR_SIZE;
      newImg.height = COMMENT_AVATAR_SIZE;
      newPar.className = PAR_CLASS_NAME;
      newPar.textContent = comment.message;

      newLi.appendChild(newImg);
      newLi.appendChild(newPar);
      socialComments.appendChild(newLi);
    });
  }

  if (comments.length >= COMMENTS_AMOUNT) {
    const commentsList = socialComments.querySelectorAll('.social__comment');
    socialCommentCount.hidden = false;
    socialCommentCount.textContent = `${COMMENTS_AMOUNT} из ${commentsList.length} комментариев`;

    for (let i = 0; i < comments.length; i++) {
      if (i >= COMMENTS_AMOUNT) {
        commentsList[i].classList.add('hidden');
        commentsLoader.hidden = false;
      }
    }
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
  socialCommentCount.hidden = true;
  commentsLoader.hidden = true;

  createComments(photo.comments);

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
  commentsLoader.addEventListener('click', onСommentsLoaderClick);
};

const closeModalPicture = () => {
  modalPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  commentsLoader.removeEventListener('click', onСommentsLoaderClick);
};

const onСommentsLoaderClick = () => {
  const hiddenComments = socialComments.querySelectorAll('.social__comment.hidden');
  const commentsList = socialComments.querySelectorAll('.social__comment');

  socialCommentCount.textContent = `${commentsList.length - hiddenComments.length + COMMENTS_AMOUNT} из ${commentsList.length} комментариев`;

  if (hiddenComments.length <= COMMENTS_AMOUNT) {
    commentsLoader.hidden = true;
    socialCommentCount.textContent = `${commentsList.length} из ${commentsList.length} комментариев`;
  }

  for (let i = 0; i < COMMENTS_AMOUNT; i++) {
    if (hiddenComments[i]) {
      hiddenComments[i].classList.remove('hidden');
    }
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModalPicture();
  }
};

const onCancelButtonClick = () => closeModalPicture();

export {openModalPicture};
