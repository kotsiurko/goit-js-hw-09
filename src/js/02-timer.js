import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnEl = document.querySelector('button[data-start]');
let difference;
startBtnEl.disabled = true;
startBtnEl.addEventListener('click', onButtonClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeDifferenceCalc(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function timeDifferenceCalc(data) {
  let currentData = new Date();
  difference = data - currentData;
  if (difference < 0) {
    Notify.info('Please choose a date in the future');
    startBtnEl.disabled = true;
    return;
  }
  startBtnEl.disabled = false;
}

function onButtonClick() {
  renderData(convertMs(difference));
  let intervalID = setInterval(() => {
    difference -= 1000;
    renderData(convertMs(difference));
    if (difference < 0) {
      clearInterval(intervalID);
      renderData(convertMs(0));
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function renderData(timeObject) {
  document.querySelector('span[data-days]').textContent = timeObject.days;
  document.querySelector('span[data-hours]').textContent = addLeadingZero(
    timeObject.hours
  );
  document.querySelector('span[data-minutes]').textContent = addLeadingZero(
    timeObject.minutes
  );
  document.querySelector('span[data-seconds]').textContent = addLeadingZero(
    timeObject.seconds
  );
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
