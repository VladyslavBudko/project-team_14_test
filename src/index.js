// import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import Notiflix from 'notiflix';
import { FetchPhoto, onFetchError } from './js/fetchPhoto';
import getRefs from './js/get-refs';
import articlesTpl from './js/articles';

import BgColorExportData from './js/bg-color';
import ScrollPaginationExportData from './js/scroll-pagination';

const refs = getRefs();
const fetchPhoto = new FetchPhoto();

// Пагинация
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const container = document.getElementById('tui-pagination-container');
const paginationResult = new Pagination(container, {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
  centerAlign: true,
  // template: {
  //   page: '<a href="#" class="tui-page-btn">{{page}}</a>',
  //   currentPage:
  //     '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
  //   moveButton:
  //     '<a href="#" class="tui-page-btn tui-{{type}}">' +
  //     '<span class="tui-ico-{{type}}">{{type}}</span>' +
  //     '</a>',
  //   disabledMoveButton:
  //     '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
  //     '<span class="tui-ico-{{type}}">{{type}}</span>' +
  //     '</span>',
  //   moreButton:
  //     '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
  //     '<span class="tui-ico-ellip">...</span>' +
  //     '</a>',
  // },
});

paginationResult.getCurrentPage(3);
// !!!!!!!!!!!!!!!!!

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

      // !!!!!!!!!!!!!!!!!!!!!!!
      console.log(hits);

      appendArticlesMarkup(hits.data.results);
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
          appendArticlesMarkup(hits.data.results);
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
// const observer = new IntersectionObserver(onEntry, {
//   rootMargin: '300px',
// });
// observer.observe(refs.sentinel);

SimpleLightbox;
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

// переключение фона
const bgColorExportData = new BgColorExportData();

bgColorExportData.populateData();

refs.changeBgColorBtn.forEach(radio => {
  radio.addEventListener('change', () => {
    bgColorExportData.onBgColorBtnClick(radio);
  });
});

bgColorExportData.populateData();

// переключение скролла/пагинации
const scrollPafinationExportData = new ScrollPaginationExportData();

scrollPafinationExportData.populateData();

refs.scrollPagination.forEach(radio => {
  radio.addEventListener('change', () => {
    scrollPafinationExportData.onBgColorBtnClick(radio);
  });
});

scrollPafinationExportData.populateData();
