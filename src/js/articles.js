export default function articlesTpl(videoData) {
  return videoData
    .map(({ poster_path, release_date, original_title, popularity }) => {
      let webformatURL = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      let largeImageURL = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      return `
      <div class='photo-card'>
      <a href='${largeImageURL}'><img class="gallery__image" src='${webformatURL}' alt=${original_title}' loading='lazy'/></a>
      <div class='info'>
        <p class='info-item'>
          <b>original_title: ${original_title}</b>
        </p>
        <p class='info-item'>
          <b>release_date: ${release_date}</b>
        </p>
        <p class='info-item'>
          <b>popularity: ${popularity}</b>
        </p>
      </div>
    </div>`;
    })
    .join('');
}
