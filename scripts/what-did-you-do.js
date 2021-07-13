'strict'

const playerA = document.querySelector('.player-A');
const playerB = document.querySelector('.player-B');
const weekA = playerA.querySelectorAll('div.day');
const weekB = playerB.querySelectorAll('div.day');
const bagA = fillBag();
const bagB = fillBag();
const imagesA = getImages();
const imagesB = getImages();

getImages();
fillWeek(weekA, bagA, imagesA);
fillWeek(weekB, bagB, imagesB);

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
  console.log(bag);
}
