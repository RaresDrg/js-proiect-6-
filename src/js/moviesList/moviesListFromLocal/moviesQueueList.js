const queueTabBtn = document.querySelector('.queue-tab-btn');

queueTabBtn.addEventListener('click', fillQueueMoviesList);

function fillQueueMoviesList() {
  queueTabBtn.disabled = true;
}
