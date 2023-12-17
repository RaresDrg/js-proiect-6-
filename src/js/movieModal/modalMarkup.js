import { load } from '../localStorage/localStorage.js';

const movieImg = document.querySelector('.movie-img');
const movieTitle = document.querySelector('.movie-title');
const movieScore = document.querySelector('.movie-score');
const movieVotes = document.querySelector('.movie-votes');
const moviePopularity = document.querySelector('.movie-popularity');
const movieOriginalTitle = document.querySelector('.original-title');
const movieGenre = document.querySelector('.movie-genre');
const movieOverview = document.querySelector('.movie-overview');

const addWatchedBtn = document.querySelector('.add-to-watched');
const addQueueBtn = document.querySelector('.add-to-queue');

export default function createModalMarkup(data) {
  movieImg.src = `https://image.tmdb.org/t/p/w342${data.poster_path}`;
  movieTitle.innerHTML = data.title;
  movieScore.innerHTML = calcFixedValue(data.vote_average);
  movieVotes.innerHTML = data.vote_count;
  moviePopularity.innerHTML = calcFixedValue(data.popularity);
  movieOriginalTitle.innerHTML = data.original_title;
  movieGenre.innerHTML = getMovieGenres(data.genres);
  movieOverview.innerHTML = data.overview;

  checkAddToWatchedBtn(data.id);
  checkAddtoQueueBtn(data.id);
}

function checkAddToWatchedBtn(id) {
  const moviesWatched = load('watched-list');

  if (moviesWatched) {
    if (moviesWatched.find(movie => movie.id === id)) {
      addWatchedBtn.disabled = true;
      return;
    }
  }

  addWatchedBtn.disabled = false;
}

function checkAddtoQueueBtn(id) {
  const moviesQueue = load('queue-list');

  if (moviesQueue) {
    if (moviesQueue.find(movie => movie.id === id)) {
      addQueueBtn.disabled = true;
      return;
    }
  }

  addQueueBtn.disabled = false;
}

function calcFixedValue(data) {
  return Number(data.toFixed(1));
}

function getMovieGenres(movieGenreIds) {
  const movieGenres = movieGenreIds.map(genre => genre.name);
  return movieGenres.join(', ');
}
