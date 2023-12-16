import Notiflix from 'notiflix';
import TmdbApi from '../../API/TMDB_API.js';
import createMarkup from '../moviesListMarkup.js';
import setTuiPagination from '../moviesListInitial/pagination/TuiPagination.js';

const API = new TmdbApi();

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const moviesList = document.getElementById('movies-list');
const loadingSpinner = document.querySelector('.loader');

searchForm.addEventListener('submit', fillMoviesListOnSearch);

function fillMoviesListOnSearch(event) {
  event.preventDefault();

  const inputValue = searchInput.value.trim();

  if (inputValue.length === 0) {
    onError('Please, write a movie name');
    return;
  }

  clear(); // curata aici
  loadingSpinner.classList.remove('hidden');

  loadMoviesOnSearch(inputValue);
}

async function loadMoviesOnSearch(searchedTerm) {
  try {
    const data = await API.getSearchedMovie(searchedTerm);

    if (data.results.length === 0) {
      onError('Search result not successful. Enter the correct movie name');
      return;
    }

    const dataForMarkup = [...data.results].splice(0, 12);
    const markup = createMarkup(dataForMarkup);

    loadingSpinner.classList.add('hidden');

    printMoviesList(markup);

    if (data.results.length > 12) {
      showPagination(data.total_results);
    }
  } catch (error) {
    onError(error.message);
  }
}

function clear() {
  moviesList.innerHTML = '';
  searchForm.reset();
  // destroy pagination //
}

function printMoviesList(markup) {
  moviesList.innerHTML = markup;
}

function showPagination(totalItems) {
  const myPagination = setTuiPagination(totalItems);
  // update aici //
}

function onError(error) {
  loadingSpinner.classList.add('hidden');
  // moviesList.innerHTML = `<p class="search-error">Search result not successful. Enter the correct movie name.</p>`;
  Notiflix.Notify.failure(error);
}
