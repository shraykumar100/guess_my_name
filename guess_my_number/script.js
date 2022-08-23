'use strict';
let secret_number = Math.trunc(Math.random() * 20 + 1);
let high_score = 0;
// console.log(secret_number);

const check = document.querySelector('.check');
const message = document.querySelector('.message');
const act_score = document.querySelector('.score');
const body = document.querySelector('body');
const number = document.querySelector('.number');
const replay = document.querySelector('.again');
const guess_input = document.querySelector('.guess');
let score = 20;

check.addEventListener('click', function () {
  const guess = Number(guess_input.value);

  if (guess < 1 || guess > 20) {
    message.textContent = '❌ Invalid number!';
  } else if (guess !== secret_number) {
    if (score > 1) {
      message.textContent =
        guess > secret_number ? '📈 Too high!' : '📉 Too low!';
      score--;
      act_score.textContent = score;
    } else {
      message.textContent = '🤯 You lost the game!';
      act_score.textContent = 0;
      body.style.backgroundColor = 'red';
      check.disabled = true;
      check.style.cursor = 'not-allowed';
    }
  } else if (guess === secret_number) {
    message.textContent = '🥳 Bravo, You found correct number!';
    body.style.backgroundColor = '#0DC143';
    number.style.width = '30rem';
    check.disabled = true;
    check.style.cursor = 'not-allowed';
    number.textContent = secret_number;

    if (score > high_score) {
      high_score = score;
      document.querySelector('.highscore').textContent = high_score;
    }
  }
});

replay.addEventListener('click', function () {
  number.textContent = '?';
  secret_number = Math.trunc(Math.random() * 20 + 1);
  message.textContent = 'Start guessing...';
  score = 20;
  act_score.textContent = score;
  body.style.backgroundColor = '#222';
  check.disabled = false;
  check.style.cursor = 'auto';
  guess_input.value = '';
  number.style.width = '15rem';
});
