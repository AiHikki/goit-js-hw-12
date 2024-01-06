import axios from 'axios';

import showMessage from './scripts/iziToast.js';
import { lightbox } from './scripts/lightbox.js';

const form = document.querySelector('#form'),
  searchInput = document.querySelector('#searchInput'),
  gallery = document.querySelector('#gallery'),
  loadImagesBtn = document.querySelector('#loadBtn'),
  loader = document.querySelector('.loader');

let windowScroll = innerHeight;
let page = 1;
const per_page = 40;
let userSearchRequest;

window.scrollBy(0, windowScroll);

form.addEventListener('submit', fetchImages);
loadImagesBtn.addEventListener('click', loadImages);

async function fetchImages(e) {
  e.preventDefault();
  page = 1;
  loader.classList.remove('hide');
  loadImagesBtn.classList.add('hide');
  gallery.innerHTML = '';

  axios.defaults.baseURL = 'https://pixabay.com/api/';
  userSearchRequest = searchInput.value;

  try {
    const response = await axios.get('', {
      params: {
        key: '41474300-2fa05bee877be877b8dc1781f',
        q: userSearchRequest,
        orientation: 'horizontal',
        image_type: 'photo',
        safesearch: true,
        page,
        per_page,
      },
    });
    const images = response.data;
    if (images.hits.length === 0) {
      return showMessage(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
    setTimeout(() => {
      renderImages(images.hits);
    }, 2000);
  } catch (error) {
    showMessage('Oops... Something went wrong');
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
  windowScroll = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;

  loader.classList.add('hide');
  loadImagesBtn.classList.remove('hide');
  lightbox.refresh();
}

async function loadImages() {
  loader.classList.remove('hide');
  loadImagesBtn.classList.add('hide');
  const response = await axios.get('', {
    params: {
      key: '41474300-2fa05bee877be877b8dc1781f',
      q: userSearchRequest,
      orientation: 'horizontal',
      image_type: 'photo',
      safesearch: true,
      page,
      per_page,
    },
  });
  const images = response.data;
  const totalPages = Math.ceil(images.totalHits / per_page);

  renderImages(images.hits);

  if (page > totalPages) {
    loadImagesBtn.classList.add('hide');
    loader.classList.add('hide');
    showMessage("We're sorry, but you've reached the end of search results.");
    return;
  }
}
