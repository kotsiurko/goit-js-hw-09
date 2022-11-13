const formEl = document.querySelector('.form');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

formEl.addEventListener('submit', onSubmitClick);

function onSubmitClick(event) {
  event.preventDefault();

  let { delay, step, amount } = event.currentTarget;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);

  for (let position = 0; position < amount; position += 1) {
    createPromise(position + 1, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
