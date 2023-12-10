import { fetchMovies } from './api.js';
import { initializeTuiPagination, currentPage } from './pagination.js';
import { scrollToTop } from './scroll.js';

const moviesList = document.getElementById('movies-list');
const itemsPerPage = 12;
let currentPage = 1;
let allMovies = [];

async function initialize() {
  try {
    const moviesResponse = await fetchMovies(currentPage, itemsPerPage);
    totalMoviesCount = moviesResponse.total_results;
    initializeTuiPagination(totalMoviesCount, itemsPerPage, loadMoviesForPage);
    await loadMovies(currentPage);
  } catch (error) {
    console.error('Error initializing movies:', error);
  }
}

async function loadMovies(page) {
  try {
    const moviesResponse = await fetchMovies(page, itemsPerPage);
    const totalMoviesCount = moviesResponse.total_results;
    if (moviesResponse.results.length === 0) {
      console.log(`Empty results array for page ${page}`);
      return;
    }
    allMovies = [...allMovies, ...moviesResponse.results];
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalMoviesCount);
    const moviesToDisplay = allMovies.slice(startIndex, endIndex);
    displayMovies(moviesToDisplay);
    scrollToTop(1000);
  } catch (error) {
    console.error('Error loading movies:', error);
  }
}

function displayMovies(movies) {
  moviesList.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    moviesList.appendChild(movieCard);
  });
}

function createMovieCard(movie) {
  const card = document.createElement('li');
  card.classList.add('movie-card');

  const posterUrl = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
  const poster = createImageElement(posterUrl, movie.original_title);

  const title = document.createElement('h2');
  title.textContent = movie.original_title;

  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('movie-details');

  const genre = document.createElement('span');
  genre.textContent = `${getGenreNames(movie.genre_ids).join(', ')}`;

  const releaseYear = document.createElement('span');
  releaseYear.textContent = ` ${getReleaseYear(movie.release_date)}`;

  const voteAverage = document.createElement('span');
  voteAverage.textContent = ` ${movie.vote_average}`;

  detailsContainer.appendChild(genre);
  detailsContainer.appendChild(releaseYear);
  detailsContainer.appendChild(voteAverage);

  card.append(poster, title, detailsContainer);
  return card;
}

function createImageElement(src, alt) {
  const image = document.createElement('img');
  image.src = src;
  image.alt = alt;
  return image;
}

function getGenreNames(genreIds) {
  if (Array.isArray(genreIds)) {
    const genreMap = {
      28: 'Action',
      12: 'Adventure',
      16: 'Animation',
      35: 'Comedy',
      80: 'Crime',
      99: 'Documentary',
      18: 'Drama',
      10751: 'Family',
      14: 'Fantasy',
      36: 'History',
      27: 'Horror',
      10402: 'Music',
      9648: 'Mystery',
      10749: 'Romance',
      878: 'Sci-Fi',
      10770: 'TV Movie',
      53: 'Thriller',
      10752: 'War',
      37: 'Western',
    };
    const genreNames = genreIds.map(id => genreMap[id] || 'Unknown');
    return genreNames.slice(0, 2);
  }
  return ['Unknown'];
}

function getReleaseYear(releaseDate) {
  if (releaseDate) {
    return new Date(releaseDate).getFullYear();
  }
  return 'Unknown';
}
async function loadMoviesForPage(page) {
  try {
    await loadMovies(page);
  } catch (error) {
    console.error('Error loading movies for page:', error);
  }
}

initialize();
