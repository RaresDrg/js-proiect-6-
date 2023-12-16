const movieImg = document.querySelector('.movie-img');
const movieTitle = document.querySelector('.movie-title');
const movieScore = document.querySelector('.movie-score');
const movieVotes = document.querySelector('.movie-votes');
const moviePopularity = document.querySelector('.movie-popularity');
const movieOriginalTitle = document.querySelector('.original-title');
const movieGenre = document.querySelector('.movie-genre');
const movieOverview = document.querySelector('.movie-overview');

export default function createModalMarkup(data) {
  movieImg.src = `https://image.tmdb.org/t/p/w342${data.poster_path}`;
  movieTitle.innerHTML = data.title;
  movieScore.innerHTML = calcFixedValue(data.vote_average);
  movieVotes.innerHTML = data.vote_count;
  moviePopularity.innerHTML = calcFixedValue(data.popularity);
  movieOriginalTitle.innerHTML = data.original_title;
  movieGenre.innerHTML = getMovieGenres(data.genres);
  movieOverview.innerHTML = data.overview;
}

function calcFixedValue(data) {
  return Number(data.toFixed(1));
}

function getMovieGenres(movieGenreIds) {
  debugger;
  const movieGenres = movieGenreIds.map(genre => genre.name);

  return movieGenres.join(', ');
}
