import { IMAGES } from './constants';
import './style.css';

// Setup
const appElement = document.querySelector('#carousel-container');

const getCarouselTemplate = () => `
  <div id="thepower-carousel">
    <ul class="scrollable-set"></ul>
    <div class="image-preview"></div>
  </div>
`;

appElement.innerHTML += getCarouselTemplate();

// Logic
const scrollableSet = document.querySelector('.scrollable-set');
const imagePrevElement = document.querySelector('.image-preview');
let actualImageIndex = 0;
let imageInterval;

const getScrollableElementTemplate = (image, index) => `
  <li role="button" class="clickable">
    <img id="image-${index}" src="${image.src}" alt="${image.alt}" />
  </li>
`;

const setupScrollableSet = () => {
  IMAGES.forEach((image, index) => {
    const template = getScrollableElementTemplate(image, index);
    scrollableSet.innerHTML += template;
  });
};

const setupCarouselInterval = () => {
  imageInterval = setInterval(() => {
    if (actualImageIndex === IMAGES.length - 1) {
      actualImageIndex = 0;
    } else {
      actualImageIndex += 1;
    }

    setupImagePreview(IMAGES[actualImageIndex].src);
  }, 5000);
};

const resetCarouselPreview = () => {
  clearInterval(imageInterval);
  setupCarouselInterval();
};

const setupImagePreview = (src) => {
  imagePrevElement.style.backgroundImage = `url(${src})`;

  const selectedImage = document.querySelector(`img[src="${src}"]`);
  const imageIndex = Number(selectedImage.id.split('-')[1]);
  actualImageIndex = imageIndex;
  //selectedImage.scrollIntoView({ behavior: 'smooth' });
  const scrollIndex = imageIndex - 1;
  scrollableSet.scrollBy({
    top:
      scrollIndex > 0
        ? scrollIndex * selectedImage.clientHeight
        : -scrollableSet.clientHeight,
    behavior: 'smooth',
  });
  resetCarouselPreview();
};

const handleChangePreview = (event) => {
  const image = event.target.children[0];
  setupImagePreview(image.getAtrribute('src'));
};

const addScrollableListeners = () => {
  const scrollables = document.querySelectorAll('li.clickable');
  scrollables.forEach((scrollable) =>
    scrollable.addEventListener('click', handleChangePreview)
  );
};

setupScrollableSet();
setupImagePreview(IMAGES[0].src);
addScrollableListeners();
setupCarouselInterval();
