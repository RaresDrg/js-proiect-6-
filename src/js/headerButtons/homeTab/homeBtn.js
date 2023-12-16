import fillInitialMoviesList from '../../moviesList/moviesListInitial/moviesListInitial.js';

const homeBtn = document.querySelector('.home-btn');

homeBtn.addEventListener('click', onHomeBtnClick);

function onHomeBtnClick() {
  homeBtn.disabled = true;
  fillInitialMoviesList();
}
