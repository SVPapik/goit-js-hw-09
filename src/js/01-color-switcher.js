function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const START = document.querySelector('button[data-start]');
const STOP = document.querySelector('button[data-stop]');
const BODY = document.querySelector('body');

let timerId = null;

STOP.disabled = true;

START.addEventListener('click', () => {
  START.disabled = true;
  STOP.disabled = false;

  timerId = setInterval(() => {
    BODY.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

STOP.addEventListener('click', () => {
  clearInterval(timerId);
  START.disabled = false;
  STOP.disabled = true;
});
