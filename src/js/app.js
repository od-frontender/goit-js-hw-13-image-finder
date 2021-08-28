import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import FetchImageApi from './apiService';
import imageCardTemplate from '../templates/card-markup.hbs';
import appendModalImage from './basicLightBox';
import refs from './refs';
import {
  noticeError,
  noticeSuccess,
  noticeInfo,
  setDefaultsDelay,
  noticeFetchTrouble,
} from './notifications';

refs.search.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', openModal);

setDefaultsDelay(2000);
const imgSearch = new FetchImageApi();

function onSearch(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.query.value;
  imgSearch.query = query;
  if (query === '') {
    noticeError();
    return;
  }
  imgSearch.resetPage();
  refs.gallery.innerHTML = '';
  fetchImages();
}
async function fetchImages() {
  try {
    const fetchResult = await imgSearch.fetchImage();
    imagesMarkUp(fetchResult);
    lazyLoad();
    noticeSuccess();
    observer.observe(refs.observer);
  } catch (error) {
    noticeFetchTrouble();
  }
}
function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && imgSearch.query !== '') {
      imgSearch
        .fetchImage()
        .then(images => {
          if (images.length < 1) {
            noticeInfo();
            observer.unobserve(refs.observer);
            return;
          }
          imagesMarkUp(images);
          lazyLoad();
        })
        .catch(noticeFetchTrouble);
    }
  });
}
function imagesMarkUp(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imageCardTemplate(images));
}
function openModal(e) {
  const target = e.target.tagName;
  const modalImage = e.target.dataset.source;
  if (target !== 'IMG') {
    return;
  }
  appendModalImage(modalImage);
}
function lazyLoad() {
  const cardImages = document.querySelectorAll('.fetch');
  cardImages.forEach(image => {
    image.src = image.dataset.src;
    image.classList.remove('fetch');

    image.addEventListener('load', () => {
      image.classList.add('is-loaded');
    });
  });
}
const observer = new IntersectionObserver(onEntry, {
  rootMargin: '250px',
});
