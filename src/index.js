// import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import Notiflix from 'notiflix';
import { FetchPhoto, onFetchError } from './js/fetchPhoto';
import getRefs from './js/get-refs';
import articlesTpl from './js/articles';

const refs = getRefs();
const fetchPhoto = new FetchPhoto();

refs.submitBtn.classList.add('button');
refs.moreBtn.classList.add('button', 'is-hidden');

// Пoвернення до початку сторінки
refs.moreBtn.addEventListener('click', topFunction);

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  fetchPhoto.query = form.elements.searchQuery.value.trim();

  if (fetchPhoto.query === '') {
    return Notiflix.Notify.info(`Enter search data, please`);
  }

  fetchPhoto.resetPage();
  form.reset();
  try {
    fetchPhoto.fetchArticles().then(hits => {
      if (hits.data.total === 0) {
        return onFetchError();
      }
      appendArticlesMarkup(hits.data.hits);
      fetchPhoto.incrementPage();
    });
  } catch {
   return onFetch400();
  }
  clearArticlesContainer();
}

function appendArticlesMarkup(hits) {
  refs.galleryEl.insertAdjacentHTML('beforeend', articlesTpl(hits));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

const onEntry = entries => {
  try {
    entries.forEach(entry => {
      if (entry.isIntersecting && fetchPhoto.query !== '') {
        fetchPhoto.fetchArticles().then(hits => {
        
          appendArticlesMarkup(hits.data.hits);
          fetchPhoto.incrementPage();
        });
      }
    });
  } catch {
    onFetch400();
  }
};

function onFetch400() {
  Notiflix.Notify.info(
    `We're sorry, but you've reached the end of search results images`
  );
}

// Бесконечній скролл
const observer = new IntersectionObserver(onEntry, {
  rootMargin: '300px',
});
observer.observe(refs.sentinel);

// SimpleLightbox
refs.galleryEl.addEventListener('click', onClickGalleryItem);

function onClickGalleryItem(event) {
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  event.preventDefault();
  //   console.log(event.target);
  showModalImgSimpleLightbox();
}

function showModalImgSimpleLightbox() {
  let lightbox = new SimpleLightbox('.gallery a', {
    nav: true,
    caption: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });

  lightbox.refresh();
}

// Плавный скролл
// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
