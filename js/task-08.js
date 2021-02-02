import galleryItems from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const modalWindowRef = document.querySelector('.lightbox');
const modalCloseBtnRef = modalWindowRef.querySelector(
  'button[data-action="close-lightbox"]'
);
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
let currentIndex;

function onRenderGallery(galleryItems) {
  const imagesArray = galleryItems.map((element, index) => {
    return `<li class="gallery_item"><a class="gallery_link" href="${element.original}">
            <img
                class="gallery__image" src="${element.preview}"
                data-source="${element.original}"
                data-index="${index}"
                alt="${element.description}"
            />
        </a>
    </li>`;
  });
  galleryRef.insertAdjacentHTML('beforeend', imagesArray.join(''));
}

function onOpenLightbox(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const imageRef = event.target;
  const imageSrc = imageRef.dataset.source;
  const imageAlt = imageRef.alt;

  currentIndex = Number(imageRef.dataset.index);

  modalWindowRef.classList.add('is-open');

  lightboxImageRef.src = imageSrc;
  lightboxImageRef.alt = imageAlt;
  lightboxImageRef.dataset.index = currentIndex;

  window.addEventListener('keydown', onKeypressLightbox);
}

function onCloseLightbox(event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  window.removeEventListener('keydown', onKeypressLightbox);
  modalWindowRef.classList.remove('is-open');

  lightboxImageRef.src = '';
}

function onClickArrow(changeIndex) {
  const nextImageIndex = currentIndex + changeIndex;
  console.log(nextImageIndex);

  if (nextImageIndex !== -1 && nextImageIndex < galleryItems.length) {
    const nextImage = galleryItems[nextImageIndex];
    lightboxImageRef.src = nextImage.original;
    lightboxImageRef.alt = nextImage.description;
    currentIndex = nextImageIndex;
  }
}

function onKeypressLightbox(event) {
  const key = event.code;
  switch (key) {
    case 'Escape':
      onCloseLightbox();
      break;
    case 'ArrowRight':
      onClickArrow(1);
      break;
    case 'ArrowLeft':
      onClickArrow(-1);
      break;
    default:
      return;
  }
}

onRenderGallery(galleryItems);

galleryRef.addEventListener('click', onOpenLightbox);
lightboxOverlayRef.addEventListener('click', onCloseLightbox);
modalCloseBtnRef.addEventListener('click', onCloseLightbox);
