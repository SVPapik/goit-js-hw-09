import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  inputDate: document.querySelector('#datetime-picker'),
};

let timerId = null;

refs.startBtn.disabled = true;
while (refs.startBtn.disabled === false) {
  refs.startBtn.style.cssText = `
      color: #569ff7;
  border-color: #569ff7;
  background-color: yellow;`;
}
refs.startBtn.addEventListener('click', onStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

flatpickr(refs.inputDate, options);

const addLeadingZero = value => String(value).padStart(2, 0);

function onStartClick() {
  timerId = setInterval(() => {
    refs.startBtn.disabled = true;
    const countTime = new Date(refs.inputDate.value) - new Date();
    const { days, hours, minutes, seconds } = convertMs(countTime);

    if (countTime > 0) {
      refs.daysEl.textContent = addLeadingZero(days);
      refs.hoursEl.textContent = addLeadingZero(hours);
      refs.minutesEl.textContent = addLeadingZero(minutes);
      refs.secondsEl.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(timerId);
      Notify.success('Your time has come!');
      return;
    }
  }, 1000);
}
