import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
};

refs.formEl.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(evt) {
  evt.preventDefault();
  if (!evt.target.tagName === 'BUTTON') return;

  let firstDelay = Number(refs.delayEl.value);
  let delayStep = Number(refs.stepEl.value);
  let amount = Number(refs.amountEl.value);

  for (let i = 1; i <= amount; i += 1, i > 0) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += delayStep;
  }
  evt.currentTarget.reset();
}
