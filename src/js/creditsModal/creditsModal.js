import Typed from 'typed.js';

const creditsModal = document.getElementById('modal-container');
const creditsModalBg = document.querySelector('.modal-background');
const creditsModalOpenBtn = document.querySelector('.students');
const typedEL = document.querySelector('.typewriter');

creditsModalOpenBtn.addEventListener('click', openCreditsModal);

function openCreditsModal() {
  creditsModal.classList.remove('isClose');
  creditsModal.classList.add('isOpen');
  startTypingAnimation();
  addCloseEvents();
}

function startTypingAnimation() {
  const typed = new Typed('.typewriter', {
    strings: [
      '... written with passion by :',
      '<p>Daria Calin</p>',
      '<p>Viorel Breban</p>',
      '<p>Monica</p>',
      '<p>Liliana</p>',
      '<p>Rares Dragan</p>',
      '<span><b>x</b>Treme team</span>',
    ],
    smartBackspace: true,
    typeSpeed: 50,
    startDelay: 1500,
    backSpeed: 35,
    backDelay: 700,
    loop: false,
    showCursor: false,
    onComplete: () => {
      const timerId = setTimeout(closeModal, 1500);
    },
  });
}

function addCloseEvents() {
  window.addEventListener('keydown', closeOnEsc);
  creditsModal.addEventListener('click', closeOnClickOutside);
}

function closeOnEsc(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function closeOnClickOutside(event) {
  if (event.target === creditsModalBg) {
    closeModal();
  }
}

function closeModal() {
  creditsModal.classList.add('isClose');
  window.removeEventListener('keydown', closeOnEsc);
  creditsModal.removeEventListener('click', closeOnClickOutside);
  typedEL.textContent = '';
}
