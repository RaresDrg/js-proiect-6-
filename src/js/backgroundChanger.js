const myBackground = document.querySelector('.global-header');

// setInterval(handleBgChange, 500)
myBackground.addEventListener('click', handleBgChange);

function handleBgChange() {
  if (myBackground.classList.contains('red-bg')) {
    myBackground.classList.replace('red-bg', 'orange-bg');
    return;
  }

  if (myBackground.classList.contains('orange-bg')) {
    myBackground.classList.replace('orange-bg', 'yellow-bg');
    return;
  }

  if (myBackground.classList.contains('yellow-bg')) {
    myBackground.classList.replace('yellow-bg', 'red-bg');
    return;
  }
}
