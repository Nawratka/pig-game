'use strict';

//Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayerNumber = 0;

const clearCurrent = function () {
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
};

const winner = function (activePlayer) {
  activePlayer.classList.add('player--winner');
  btnRoll.removeEventListener('click', handleBtnRoll);
  btnHold.removeEventListener('click', handleBtnHold);
};

const changePlayer = function () {
  if (activePlayerNumber === 0) {
    player0Section.classList.remove('player--active');
    activePlayerNumber = 1;
    player1Section.classList.add('player--active');
  } else if (activePlayerNumber === 1) {
    player1Section.classList.remove('player--active');
    activePlayerNumber = 0;
    player0Section.classList.add('player--active');
  }
};

// Rolling dice functionality
const handleBtnRoll = function () {
  // 1. Generate random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for roll 1:
  if (dice !== 1) {
    // add dice to current score
    currentScore += dice;
    let activePlayer = document.querySelector('.player--active');
    let activeCurrent = activePlayer.querySelector('.current-score');
    activeCurrent.textContent = currentScore;
  }
  // if true switch to next player
  else if (dice === 1) {
    changePlayer();
    clearCurrent();
  }
};

const handleBtnHold = function () {
  let activePlayer = document.querySelector('.player--active');
  let activePlayerCurrent = activePlayer.querySelector('.current-score');
  let activePlayerScore = activePlayer.querySelector('.score');
  let sum =
    Number(activePlayerScore.textContent) +
    Number(activePlayerCurrent.textContent);
  activePlayerScore.textContent = sum;
  activePlayerCurrent.textContent = 0;
  currentScore = 0;
  sum >= 30 ? winner(activePlayer) : changePlayer();
};

const handleBtnNew = function () {
  [score0El, score1El, current0El, current1El].forEach(el => {
    el.textContent = 0;
  });
  [player0Section, player1Section].forEach(el => {
    el.classList.remove('player--winner');
    el.classList.remove('player--active');
  });
  diceEl.classList.add('hidden');
  btnRoll.addEventListener('click', handleBtnRoll);
  btnHold.addEventListener('click', handleBtnHold);
  player0Section.classList.add('player--active');
  currentScore = 0;
  activePlayerNumber = 0;
};

btnNew.addEventListener('click', handleBtnNew);
btnRoll.addEventListener('click', handleBtnRoll);
btnHold.addEventListener('click', handleBtnHold);
