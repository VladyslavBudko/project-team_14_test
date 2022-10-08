import Notiflix from 'notiflix';
import axios from 'axios';
import getRefs from './get-refs';
export { FetchPhoto, onFetchError };

const refs = getRefs();


// https://api.themoviedb.org/3/search/movie?api_key=0dd125b83baab4c44161e46f210352be&language=en-US&query=cat&page=1&include_adult=false
const MAIN_URL = 'https://api.themoviedb.org/3/search/movie?';
const API_KEY = 'api_key=0dd125b83baab4c44161e46f210352be';
const URL = MAIN_URL + API_KEY;

class FetchPhoto {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 20;
    this.totalHits = 0;
  }

  async fetchArticles() {
    //     GET /search/movie
    const searchParams = new URLSearchParams({
      query: this.searchQuery,
      include_adult: false,
      page: this.page,

      // /trending/{media_type}/{time_window}

      // q: this.searchQuery,
      // per_page: this.per_page,
      // image_type: 'photo',
      // orientation: 'horizontal',
      // safesearch: true,
      // page: this.page,
    });

    try {
      const url = `${URL}&${searchParams}`;
      const response = await axios.get(url);

      let counterPhoto = this.page * this.per_page;
      this.totalHits = response.data.total_results;
      let total_pages = response.data.total_pages;



      if (this.page === 1 && this.totalHits !== 0) {
        Notiflix.Notify.success(`Hooray! We found ${this.totalHits} movie in ${total_pages} pages.`);
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
    `We're sorry, but you've reached the end of search results ${totalPhotos} movie in ${total_pages} pages`
  );
  refs.moreBtn.classList.remove('is-hidden');
}
