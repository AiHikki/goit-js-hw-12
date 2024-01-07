import axios from 'axios';
import showMessage from './scripts/iziToast.js';
import lightbox from './scripts/lightbox.js';

const API_KEY = '41474300-2fa05bee877be877b8dc1781f';
const API_BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = API_BASE_URL;

const form = document.querySelector('#form'),
  searchInput = document.querySelector('#searchInput'),
  gallery = document.querySelector('#gallery'),
  loadImagesBtn = document.querySelector('#loadBtn'),
  loader = document.querySelector('.loader');

let scrollOffset = innerHeight;
let page = 1;
const per_page = 40;
let userSearchRequest;

window.scrollBy(0, scrollOffset);

form.addEventListener('submit', handleFormSubmit);
loadImagesBtn.addEventListener('click', loadMoreImages);

async function handleFormSubmit(e) {
  e.preventDefault();
  resetGallery();
  userSearchRequest = searchInput.value;
  await fetchAndRenderImages();
}

async function fetchAndRenderImages() {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: getAPIParams(),
    });
    const images = response.data;
    if (images.hits.length === 0) {
      return showMessage(
        'Sorry, no images match your search query. Please try again!'
      );
    }
    renderImages(images.hits);
    handleLoadMoreButton(images.totalHits);
  } catch (error) {
    handleAPIError();
  } finally {
    loader.classList.add('hide');
  }
}

function renderImages(images) {
  page += 1;

  const markup = images.reduce(
    (
      html,
      { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    ) =>
      html +
      `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="image-desc">
          <div class="image-desc-item">
            <div class="image-desc-label">Likes</div>
            <div>${likes}</div>
          </div>
          <div class="image-desc-item">
             <div class="image-desc-label">Views</div>
             <div>${views}</div>
          </div>
          <div class="image-desc-item">
            <div class="image-desc-label">Comments</div>
            <div>${comments}</div>
          </div>
          <div class="image-desc-item">
            <div class="image-desc-label">Downloads</div>
            <div>${downloads}</div>
          </div>
        </div>
      </li>
      `,
    ''
  );

  gallery.insertAdjacentHTML('beforeend', markup);
  scrollOffset = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;

  lightbox.refresh();
}

async function loadMoreImages() {
  loadImagesBtn.classList.add('hide');
  loader.classList.remove('hide');
  await fetchAndRenderImages();
  // loadImagesBtn.classList.add('hide');
}

function resetGallery() {
  loadImagesBtn.classList.add('hide');
  loader.classList.remove('hide');
  page = 1;
  gallery.innerHTML = '';
}

function getAPIParams() {
  return {
    key: API_KEY,
    q: userSearchRequest,
    orientation: 'horizontal',
    image_type: 'photo',
    safesearch: true,
    page,
    per_page,
  };
}

function handleLoadMoreButton(totalHits) {
  const totalPages = Math.ceil(totalHits / per_page);
  if (page > totalPages) {
    showMessage("We're sorry, but you've reached the end of search results.");
  } else {
    loadImagesBtn.classList.remove('hide');
  }
}

function handleAPIError() {
  showMessage('Oops... Something went wrong');
}
