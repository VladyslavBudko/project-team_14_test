export default function getRefs() {
  return {
    searchForm: document.querySelector('#search-form'),
    // photoListEl: document.querySelector('[type="text"]'),
    submitBtn: document.querySelector('[type="submit"]'),
    moreBtn: document.querySelector('.load-more'),
    sentinel: document.querySelector('#sentinel'),
    articlesContainer: document.querySelector('.js-articles-container'),

    galleryEl: document.querySelector('.gallery'),
  };
}
