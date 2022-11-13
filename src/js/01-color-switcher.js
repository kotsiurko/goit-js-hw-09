const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let timerId;

startBtnEl.addEventListener('click', onButtonStart);
stopBtnEl.addEventListener('click', onButtonStop);

stopBtnEl.disabled = true;

function onButtonStart() {
  bodyEl.style.backgroundColor = getRandomHexColor();
  stopBtnEl.disabled = false;
  startBtnEl.disabled = true;
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onButtonStop() {
  clearInterval(timerId);
  stopBtnEl.disabled = true;
  startBtnEl.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
