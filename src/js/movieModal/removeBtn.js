import { localStorage } from './modalMarkup';
import fillWatchedMoviesList from '../myLibraryTab/watchedTab/watchedTab.js';
import Notiflix from 'notiflix';
import fillQueueMoviesList from '../myLibraryTab/queueTab/queueTab.js';

const myModal = document.querySelector('.modal-window');
const removeBtn = document.querySelector('.remove-btn');

removeBtn.addEventListener('click', removeMovie);

function removeMovie({ target }) {
  const id = Number(target.offsetParent.id);
  debugger;
  if (removeBtn.textContent === 'Remove from watched') {
    removeMovieFromWatchedList(id);
    return;
  }

  if (removeBtn.textContent === 'Remove from queue') {
    removeMovieFromQueueList(id);
    return;
  }
}

function removeMovieFromQueueList(id) {
  const data = localStorage.load('queue-list');
  const index = data.findIndex(movie => movie.id === id);

  if (index === -1) {
    return;
  }

  const movieDeleted = data.splice(index, 1);

  localStorage.remove('queue-list');
  localStorage.moviesQueue = [];
  data.reverse().forEach(element => {
    localStorage.saveToQueue('queue-list', element);
  });

  myModal.classList.add('isHidden');
  Notiflix.Notify.success(
    `"${movieDeleted[0].title}" deleted with succes from your "queue" list"`
  );

  fillQueueMoviesList();
}

function removeMovieFromWatchedList(id) {
  const data = localStorage.load('watched-list');
  const index = data.findIndex(movie => movie.id === id);

  if (index === -1) {
    return;
  }

  const movieDeleted = data.splice(index, 1);

  localStorage.remove('watched-list');
  localStorage.moviesWatched = [];
  data.reverse().forEach(element => {
    localStorage.saveToWatched('watched-list', element);
  });

  myModal.classList.add('isHidden');
  Notiflix.Notify.success(
    `"${movieDeleted[0].title}" deleted with succes from your "watched list"`
  );

  fillWatchedMoviesList();
}
