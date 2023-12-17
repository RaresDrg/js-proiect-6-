import stackedData from '../modal.js';
import { saveToQueue } from '../../localStorage/localStorage.js';
import Notiflix from 'notiflix';

const addQueueBtn = document.querySelector('.add-to-queue');

addQueueBtn.addEventListener('click', addToQueueListLocal);

function addToQueueListLocal() {
  saveToQueue('queue-list', stackedData.dataStacked);
  Notiflix.Notify.success(
    `Movie "${stackedData.dataStacked.title}" added to your "queue-list"`
  );
  addQueueBtn.disabled = true;
}
