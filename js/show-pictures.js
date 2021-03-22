const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureTemplate = (element) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImage = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');

  pictureElement.dataset.id = element.id;
  pictureImage.src = element.url;
  pictureLikes.textContent = element.likes;
  pictureComments.textContent = element.comments.length;

  return pictureElement;
};

const showPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach(photo => {
    const picture = createPictureTemplate(photo);

    fragment.appendChild(picture);
  });

  picturesList.appendChild(fragment);
};

export {
  picturesList,
  showPictures
};
