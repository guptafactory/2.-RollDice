'use strict';
//variable
let player0_CurrScore = 0,
  player0_HighScore = 0,
  player1_CurrScore = 0,
  player1_HighScore = 0,
  player = 0,
  diceValue = 0,
  gamePlaying = 1,
  diceElement = document.querySelector('#dice');
//functions
function setValues() {
  document.querySelector('#current--0').textContent = player0_CurrScore;
  document.querySelector('#score--0').textContent = player0_HighScore;
  document.querySelector('#current--1').textContent = player1_CurrScore;
  document.querySelector('#score--1').textContent = player1_HighScore;
}
function initialise() {
  player0_CurrScore = 0;
  player0_HighScore = 0;
  player1_CurrScore = 0;
  player1_HighScore = 0;
  player = 0;
  diceValue = 0;
  gamePlaying = 1;
  setValues();
  document.querySelector('.dice').classList.add('hidden');

  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
}
function diceRoll() {
  document.querySelector('.dice').classList.remove('hidden');
  diceValue = Math.trunc(Math.random() * 6) + 1;
  diceElement.src = `dice-${diceValue}.png`;
}
function changePlayer() {
  if (player === 0) {
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');
    player++;
  } else {
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    player--;
  }
}
// Issue in Winner function
function checkWinner() {
  if (player0_HighScore >= 10) {
    document.querySelector('.player--0').classList.add('player--winner');
    gamePlaying = 0;
  } else if (player1_HighScore >= 10) {
    document.querySelector('.player--1').classList.add('player--winner');
    gamePlaying = 0;
  } else {
  }
}

function roll() {
  if (gamePlaying === 1) {
    checkWinner();
    diceRoll();
    if (player === 0) {
      if (diceValue === 1) {
        player0_CurrScore = 0;
        setValues();
        changePlayer();
      } else {
        player0_CurrScore += diceValue;
        setValues();
      }
    } else {
      if (diceValue === 1) {
        player1_CurrScore = 0;
        setValues();
        changePlayer();
      } else {
        player1_CurrScore += diceValue;
        setValues();
      }
    }
  }
}

function hold() {
  if (gamePlaying === 1) {
    document.querySelector('.dice').classList.add('hidden');
    if (player == 0) {
      player0_HighScore += player0_CurrScore;
      player0_CurrScore = 0;
      setValues();
      checkWinner();
    } else {
      player1_HighScore += player1_CurrScore;
      player1_CurrScore = 0;
      setValues();
      checkWinner();
    }
    changePlayer();
  }
}
function newGame() {
  initialise();
}

//CODE
initialise();

setValues();

document.querySelector('.btn--roll').addEventListener('click', roll);
document.querySelector('.btn--hold').addEventListener('click', hold);
document.querySelector('.btn--new').addEventListener('click', newGame);
