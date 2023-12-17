import stackedData from '../modal.js';
import { saveToWatched } from '../../localStorage/localStorage.js';
import Notiflix from 'notiflix';

const addWatchedBtn = document.querySelector('.add-to-watched');

addWatchedBtn.addEventListener('click', addToWatchedListLocal);

function addToWatchedListLocal() {
  saveToWatched('watched-list', stackedData.dataStacked);
  Notiflix.Notify.success(
    `Movie "${stackedData.dataStacked.title}" added to your "watched-list"`
  );
  addWatchedBtn.disabled = true;
}
