import {openModalPicture} from './modal-picture.js';
import {isEnterEvent} from './util.js';

const pictures = document.querySelector('.pictures');

const showPictureTemplate = (element) => {
  const pictureTemplate = document.querySelector('#picture ').content.querySelector('.picture');
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImage = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');

  pictureImage.src = element.url;
  pictureLikes.textContent = element.likes;
  pictureComments.textContent = element.comments.length;

  return pictureElement;
};

const showPictures = (elements) => {
  const fragment = document.createDocumentFragment();

  elements.forEach(element => {
    const picture = showPictureTemplate(element);
    picture.addEventListener('click', () => openModalPicture(element));
    picture.addEventListener('keydown', (evt) => {
      if (isEnterEvent(evt)) {
        openModalPicture(element);
      }
    });
    fragment.appendChild(picture);
  });


  return pictures.appendChild(fragment);
};

export {showPictures};
