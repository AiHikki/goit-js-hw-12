import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('#gallery a', {
  overlayOpacity: 0.5,
  showCounter: false,
});

export default lightbox;
