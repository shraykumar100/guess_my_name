'use strict';

// Selecting elements
const player0_Elem = document.querySelector('.player--0');
const player1_Elem = document.querySelector('.player--1');
const score0_Elem = document.getElementById('score--0');
const current0_Elem = document.getElementById('current--0');
const score1_Elem = document.getElementById('score--1');
const current1_Elem = document.getElementById('current--1');
const dice_Elem = document.querySelector('.dice');
const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');
let scores, current_score, active_player, playing;

// Start Game Function
const init = function () {
  scores = [0, 0];
  current_score = 0;
  active_player = 0;
  playing = true;

  score0_Elem.textContent = 0;
  score1_Elem.textContent = 0;
  current0_Elem.textContent = 0;
  current1_Elem.textContent = 0;

  dice_Elem.classList.add('hidden');
  player0_Elem.classList.remove('player--winner');
  player1_Elem.classList.remove('player--winner');
  player0_Elem.classList.add('player--active');
  player1_Elem.classList.remove('player--active');
};

// Start Game initially
init();

// Functions
const switchPlayer = () => {
  document.getElementById(`current--${active_player}`).textContent = '0';
  current_score = 0;
  active_player = active_player === 0 ? 1 : 0;
  player0_Elem.classList.toggle('player--active');
  player1_Elem.classList.toggle('player--active');
};

// Starting conditions
score0_Elem.textContent = '0';
score1_Elem.textContent = '0';
dice_Elem.classList.add('hidden');

// Rolling dice functionality
btn_roll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display the dice
    dice_Elem.classList.remove('hidden');
    dice_Elem.src = `dice-${dice}.png`;

    // 3. Check for rolled
    if (dice !== 1) {
      //   Add dice to the current score
      current_score += dice;
      document.getElementById(`current--${active_player}`).textContent =
        current_score;
    } else {
      // if true, swith to next player
      switchPlayer();
    }
  }
});

// Hold button functionality
btn_hold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[active_player] += current_score;
    document.getElementById(`score--${active_player}`).textContent =
      scores[active_player];

    // 2. Check if player's score is >=100, finish the game
    if (scores[active_player] >= 100) {
      // Finish game
      document
        .querySelector(`.player--${active_player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active_player}`)
        .classList.remove('player--active');
      playing = false;
      dice_Elem.classList.add('hidden');
    } else {
      // 3. if not Switcth to next player
      switchPlayer();
    }
  }
});

// New Game
btn_new.addEventListener('click', init);
