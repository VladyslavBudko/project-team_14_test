import Notiflix from 'notiflix';
import axios from 'axios';
import getRefs from './get-refs';
export { FetchPhoto, onFetchError };

const refs = getRefs();

// https://pixabay.com/api/?key=30279426-ce0edf6a31bb607e668c5bb01&q=yellow+flowers&image_type=photo
const MAIN_URL = 'https://pixabay.com/api/';
const API_KEY = '?key=30279426-ce0edf6a31bb607e668c5bb01&';
const URL = MAIN_URL + API_KEY;

class FetchPhoto {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
    this.totalHits = 0;
  }

  async fetchArticles() {
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      per_page: this.per_page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
    });

    
    try {
      const url = `${URL}${searchParams}`;
      const response = await axios.get(url);
      
      // console.log(response);
      
      let counterPhoto = this.page * this.per_page;
      this.totalHits = response.data.totalHits;

      if (this.page === 1 && this.totalHits !== 0) {
        Notiflix.Notify.success(
          `Hooray! We found ${this.totalHits} images.`
        );
      }

      // if (
      //   counterPhoto > this.totalHits &&
      //   this.totalHits !== 0 &&
      //   this.page !== 1
      // ) {
      //   onFetchInfo(this.totalHits);
      // }

      return response;
    } catch (error) {
      onFetchInfo(this.totalHits);
      // console.error('error in async:', error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

function onFetchError(error) {
  refs.articlesContainer.innerHTML = '';
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function onFetchInfo(totalPhotos) {
  // console.log('onFetchInfo', totalPhotos);
  Notiflix.Notify.info(
    `We're sorry, but you've reached the end of search results ${totalPhotos} images`
  );
  refs.moreBtn.classList.remove('is-hidden');
}
