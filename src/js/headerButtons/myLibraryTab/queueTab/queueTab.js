import Notiflix from 'notiflix';
import { load } from '../../../localStorage/localStorage.js';
import createMarkup from '../../../moviesList/moviesListMarkup.js';
import setTuiQueuePagination from './queuePagination.js';

const queueTabBtn = document.querySelector('.queue-tab-btn');
const watchedTabBtn = document.querySelector('.watched-tab-btn');
const moviesList = document.getElementById('movies-list');
const paginationEl = document.querySelector('.tui-pagination');
const errorEl = document.querySelector('.search-error');
const loadingSpinner = document.querySelector('.loader');

queueTabBtn.addEventListener('click', fillQueueMoviesList);

function fillQueueMoviesList() {
  debugger;
  queueTabBtn.disabled = true;
  watchedTabBtn.disabled = false;

  clear();
  loadingSpinner.classList.remove('hidden');
  loadQueueMoviesList();
}

function loadQueueMoviesList() {
  const data = load('queue-list');

  if (!data) {
    onError('There is no movie saved in your queue list');
    return;
  }

  const dataForMarkup = data.slice(0, 12);
  const markup = createMarkup(dataForMarkup);

  loadingSpinner.classList.add('hidden');

  printMovicesList(markup);

  if (data.length > 12) {
    const myPagination = setTuiQueuePagination(data.length);
    paginationEl.classList.remove('isHidden');
  }

  Notiflix.Notify.success(
    `There is ${data.length} movies saved in you queque list`
  );
}

function clear() {
  moviesList.innerHTML = '';
  paginationEl.classList.add('isHidden');
  errorEl.classList.add('isHidden');
}

function printMovicesList(markup) {
  moviesList.innerHTML = markup;
}

function onError(error) {
  Notiflix.Notify.warning(error);
  loadingSpinner.classList.add('hidden');
  moviesList.innerHTML = `<p class="local-error">${error}</p>`;
}
