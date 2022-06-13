/********* Modal *********/
const modalOverlay = document.querySelector('.modal-overlay');
const modalUser = document.querySelector('.modal--user');
const modalRules = document.querySelector('.modal--rules');
const modalUserBtn = document.querySelector('#user-btn');
const modalRulesBtn = document.querySelector('#rules-btn');
const ruleBtn = document.querySelector('.btn-rule')
const playersNameOne = document.querySelector('.first-player');
const playersNameTwo = document.querySelector('.second-player');
let playersNameEL0 = document.querySelector('.player__name--0');
let playersNameEL1 = document.querySelector('.player__name--1');

/*** Player's name and Total points ***/
let playersName0;
let playersName1;


const storeData = function() {
  /*** Store player's name and points ***/
  playersName0 = playersNameOne.value;
  playersName1 = playersNameTwo.value;

  /*** Show players name on UI ***/
  playersNameEL0.textContent = playersName0;
  playersNameEL1.textContent = playersName1;
}

/*** checkUserInput function ***/
const checkUserInput = function() {
  // Check weather inputs are empty or not
  if (playersNameOne.value !== '' && playersNameTwo.value !== '') {
    modalUserBtn.classList.add('show');
  } else {
    modalUserBtn.classList.remove('show');
  }
}

playersNameOne.addEventListener("input", checkUserInput);
playersNameTwo.addEventListener("input", checkUserInput);

/*** User modal ***/
const hideUserModal = function() {
  /*** Hide Modal ***/
  modalOverlay.classList.add('modal-overlay--hidden');
  modalUser.classList.add('hidden');
}
const showUserModal = function() {
  modalOverlay.classList.remove('modal-overlay--hidden');
  modalUser.classList.remove('hidden');
}


modalUserBtn.addEventListener("click", storeData);
modalUserBtn.addEventListener("click", hideUserModal);

/*** Rules Modal ***/
const showRulesModal = function() {
  modalOverlay.classList.remove('modal-overlay--hidden');
  modalRules.classList.remove('hidden');
}
const hideRulesModal = function() {
  modalOverlay.classList.add('modal-overlay--hidden');
  if (!modalRules.classList.contains('hidden')) {
    modalRules.classList.add('hidden');
  }
}
ruleBtn.addEventListener("click", showRulesModal);
modalRulesBtn.addEventListener("click", hideRulesModal);

/****** Rolling Dice ******/
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const players = document.querySelectorAll('.player');
const playerScoreOne = document.querySelector('.player__score--0');
const playerScoreTwo = document.querySelector('.player__score--1');
const dice = document.querySelector('.dice__img');
const diceText = document.querySelector('.dice__text');
const currentScoreOne = document.querySelector('.current__score--0');
const currentScoreTwo = document.querySelector('.current__score--1');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const btnReset = document.querySelector('.btn--reset');
let activePlayer;
let currentScore;
let totalScore;
let isPlaying;
let totalPoints;
/****** New game function ******/
const newGame = function() {
  activePlayer = 0;
  currentScore = 0;
  totalScore = 0;
  scores = [0,
    0];
  isPlaying = true;
  totalPoints = Number(prompt('Enter points to play'));
  /*** enable btns ***/
  btnRoll.disabled = false;
  btnHold.disabled = false;
  btnRoll.classList.remove('disable');
  btnHold.classList.remove('disable');
  /*** change bg color of current ***/
  document.querySelector(`.current--${activePlayer}`).classList.remove('change--bg');

  document.querySelector(`.current__score--${activePlayer}`).textContent = 0;
  /*** Hide the 🆚 and show the 🎲 ***/
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
  diceText.classList.remove('hidden');
  dice.classList.add('hidden');
  playerScoreOne.textContent = 0;
  playerScoreTwo.textContent = 0;
  currentScoreOne.textContent = 0;
  currentScoreTwo.textContent = 0;
  playersNameEL0.textContent = playersName0;
  playersNameEL1.textContent = playersName1;
  storeData();
  playersNameOne.value = '';
  playersNameTwo.value = '';
  document.querySelector(`.current--${0}`).classList.remove('change--bg');
  document.querySelector(`.current--${1}`).classList.remove('change--bg');
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
}
newGame();
/*** Switch Player Function ***/

const switchPlayer = function() {
  document.querySelector(`.current__score--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1: 0;

  for (let player of players) {
    if (player.classList.contains('player--active')) {
      player.classList.remove('player--active');
    } else {
      player.classList.add('player--active');
    }
  }
  
}
/*** Add Event Lisener on Roll btn ***/
const rollDice = function() {
  /*** Hide the 🆚 and show the 🎲 ***/
  diceText.classList.add('hidden');
  dice.classList.remove('hidden');
  /*** Generate a random number ***/
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  /*** Change the 🎲 ***/
  dice.src = `images/dice-${
  randomNumber}.png`;
  /*** Rotate the 🎲 ***/
  dice.classList.toggle('rotate');
  /*** Check if it's a 1 if yes > switch the players else add dice roll to current score ***/
  if (randomNumber !== 1) {
    /*** add dice roll to current score ***/
    currentScore += randomNumber;
    document.querySelector(`.current__score--${activePlayer}`).textContent = currentScore;

  } else {
    /*** Switch Player ***/
    switchPlayer();
  }
}
btnRoll.addEventListener("click", rollDice);

/****** Hold Function ******/
const holdDice = function() {
  /*** Add current score to total score ***/
  scores[activePlayer] += currentScore;
  document.querySelector(`.player__score--${activePlayer}`).textContent = scores[activePlayer];

  if (scores[activePlayer] >= totalPoints) {
    document.querySelector(`.player__name--${activePlayer}`).textContent = 'Winner!!'
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    /*** disable btns ***/
    btnRoll.disabled = true;
    btnHold.disabled = true;
    btnRoll.classList.add('disable');
    btnHold.classList.add('disable');
    /*** change bg color of current ***/
    document.querySelector(`.current--${activePlayer}`).classList.add('change--bg');

  } else {
    switchPlayer();
  }
}
btnHold.addEventListener('click', holdDice);

/*** Reset button ***/
btnReset.addEventListener("click", newGame);