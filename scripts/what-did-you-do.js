'strict'

const scoreBoard = document.getElementById('score');
const start = document.getElementById('start');
const playerA = document.querySelector('.player-A');
const playerB = document.querySelector('.player-B');
const weekA = playerA.querySelectorAll('div.day');
const weekB = playerB.querySelectorAll('div.day');
const bagA = fillBag();
const bagB = fillBag();
const imagesA = getImages();
const imagesB = getImages();
const rightAudio = new Audio('./audio/right.mp3');
const wrongAudio = new Audio('./audio/wrong.mp3');
const currentPlayer = 'A';
const timer = { 
  element: document.getElementById('timer'),
  total: 61 * 1000
};

let audioContext;
let score = 0;
let ended = false;


start.addEventListener('click', () => {
  addSpaceListener();
  score = 0;
  scoreBoard.innerText = '00';
  ended = false;
  requestAnimationFrame(initializeTimer);
  start.innerHTML = 'RESET'
});

getImages();
fillWeek(weekA, bagA, imagesA);
fillWeek(weekB, bagB, imagesB);

function handleSpace(e) {
  if (e.code == 'Space') {
    right();
  };
}

function initializeTimer(now) {
  timer.initial = now;
  timer.s = 1000;
  timer.m = timer.s * 60;
  requestAnimationFrame(runTimer);
}

function runTimer(now) {
  const options = {minimumIntegerDigits: 2, useGrouping: false};
  const runtime = now - timer.initial;
  const remaining = timer.total - runtime;
  if(remaining < 0) timesUp();
  else {
    const minutes = Math.floor(remaining/timer.m).toLocaleString('en-US', options);
    const seconds = Math.floor((remaining%timer.m)/timer.s).toLocaleString('en-US', options);
    const display = `${minutes}:${seconds}`
    if(timer.display !== display) {
      timer.element.innerText = display;
      timer.display = display;
    }
    if(!ended) requestAnimationFrame(runTimer);
  }
}

function timesUp() { 
  removeSpaceListener();
  ended = true;
  start.innerHTML = 'START';
}

function fillBag() {
  const array = [];
  for (let i=0; i<20; i++) {
    array[i] = i;
  }
  return array;
}

function getImages() {
  const array = [];
  for (let i=0; i<20; i++) {
    const image = new Image();
    image.src = `./images/${i}.jpg`;
    image.className = 'image';
    array.push(image);
  }
  return array;
}

function fillWeek(week, bag, images) {
  for (let i=0; i<7; i++) {
    const pick = Math.floor(Math.random() * bag.length);
    week[i].appendChild(images[bag[pick]]);
    bag.splice(pick, 1);
  }
}

function right() {
  removeSpaceListener();
  giveFeedback(rightAudio, circle);
  window.setTimeout(() => {
    increaseScore();
    resetFeedback(circle)
    addSpaceListener();
  }, 1000);
}

function giveFeedback(audio, element) {
  playAudio(audio);
  element.classList.add('feedback-animation');
}

function resetFeedback(element) {
  element.classList.remove('feedback-animation');
}

function playAudio(element) {
  element.currentTime = 0;
  element.play();
}

function removeSpaceListener() {
  document.removeEventListener('keydown', handleSpace);
}

function addSpaceListener() {
  document.addEventListener('keydown', handleSpace);
}

function increaseScore() {
  const options = {minimumIntegerDigits: 2, useGrouping: false};
  score++;
  scoreBoard.innerText = score.toLocaleString('en-US', options);
}