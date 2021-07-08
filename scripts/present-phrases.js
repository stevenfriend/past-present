'use strict'

const eng = [
	`<span class="phrase"><span class="verb">do</span> the laundary</span>`,
	`<span class="phrase"><span class="verb">have</span> a picnic</span>`,
	`<span class="phrase"><span class="verb">go</span> to the store</span>`,
	`<span class="phrase"><span class="verb">play</span> a board game</span>`,
	`<span class="phrase"><span class="verb">cook</span> dinner</span>`,
	`<span class="phrase"><span class="verb">watch</span> a movie</span>`,
	`<span class="phrase"><span class="verb">read</span> a novel</span>`,
	`<span class="phrase"><span class="verb">make</span> a bracelet</span>`,
	`<span class="phrase"><span class="verb">study</span> English</span>`,
	`<span class="phrase"><span class="verb">wash</span> the car</span>`,
	`<span class="phrase"><span class="verb">take</span> a test</span>`,
	`<span class="phrase"><span class="verb">get</span> a present</span>`,
	`<span class="phrase"><span class="verb">fly</span> a kite</span>`,
	`<span class="phrase"><span class="verb">walk</span> the dog</span>`,
	`<span class="phrase"><span class="verb">listen</span> to music</span>`,
	`<span class="phrase"><span class="verb">clean</span> my desk</span>`,
	`<span class="phrase"><span class="verb">practice</span> the violin</span>`,
	`<span class="phrase"><span class="verb">win</span> a race</span>`,
	`<span class="phrase"><span class="verb">build</span> a sandcastle</span>`,
	`<span class="phrase"><span class="verb">visit</span> my grandparents</span>`
];
const jpn = ["洗濯をする", "ピクニックをする", "店に行く", "ボードゲームをする", "夕食を作る", "映画を見る", "小説を読む", "ブレスレットを作る", "英語を勉強する", "車を洗う", "試験を受ける", "プレゼントをもらう", "たこを揚げる", "犬の散歩する", "音楽を聴く", "私の机を掃除する", "バイオリンを練習する", "レースに勝つ", "砂の城を建てる", "私の祖父母を訪ねる"];
const images = [];
const imagePhrase = document.querySelector('.image-phrase');
const navLeft = document.querySelector(".nav-left");
const navRight = document.querySelector(".nav-right");
const jpnPhrase = document.querySelector('.jpn-phrase');
const engPhrase = document.querySelector('.eng-phrase');
const verbButton = document.querySelector('.verb-button');
const phraseButton = document.querySelector('.phrase-button');
const state = { hideVerb: false, hidePhrase: false };

let counter = 0;

getImages();
addListeners();
display();
 
function getImages() {
  for (const index in eng) {
    const image = new Image();
    image.src = `./images/${index}.jpg`;
    image.className = 'image';
    images.push(image);
  }
	imagePhrase.appendChild(images[counter]);
}

function addListeners() {
	navLeft.addEventListener('click', () => {
		decreaseCounter();
		display();
	});
	navRight.addEventListener('click', () => {
		increaseCounter();
		display();
	});
	verbButton.addEventListener('click', e => {
		e.target.classList.toggle('disabled');
		if (phraseButton.classList.contains('disabled')) {
			phraseButton.classList.toggle('disabled');
			state.hidePhrase = false;
		}
		state.hideVerb = state.hideVerb ? false : true;
		hideText();
	});
	phraseButton.addEventListener('click', e => {
		e.target.classList.toggle('disabled');
		if (verbButton.classList.contains('disabled')) {
			verbButton.classList.toggle('disabled');
			state.hideVerb = false;
		}
		state.hidePhrase = state.hidePhrase ? false : true;
		hideText();
	});
}

function decreaseCounter() {
	if (counter == 0) {
		counter = 19;
	} else {
		counter--;
	}
}

function increaseCounter() {
	if (counter == (eng.length-1)) {
		counter = 0;
	} else {
		counter++;
	}
}

function display() {
	imagePhrase.replaceChild(images[counter], imagePhrase.firstChild);
	jpnPhrase.innerHTML = jpn[counter];
	engPhrase.innerHTML = eng[counter];
	// enableHide();
	hideText(state.hideVerb, document.querySelector('.verb'));
	hideText(state.hidePhrase, document.querySelector('.phrase'));
}

function enableHide() {
	document.querySelector(".phrase").addEventListener('click', e => {
		e.target.classList.toggle('hidden');
	});
	document.querySelector(".verb").addEventListener('click', e => {
		e.target.classList.toggle('hidden');
	});
}

function hideText() {
	const verb = document.querySelector('.verb').classList;
	const phrase = document.querySelector('.phrase').classList;
	if (state.hideVerb) {
		if (!verb.contains('hidden')) {
			verb.add('hidden');
		};
		if (phrase.contains('hidden')) {
			phrase.remove('hidden');
		};
	} else {
		verb.remove('hidden');
	}
	if (state.hidePhrase) {
		if (!phrase.contains('hidden')) {
			phrase.add('hidden');
		};
		if (verb.contains('hidden')) {
			verb.remove('hidden');
		};
	} else {
		phrase.remove('hidden');
	}
}

// function hideText(state, text) {
// 	if (state) {
// 		if (!text.classList.contains('hidden')) {
// 			text.classList.add('hidden');
// 		};
// 	} else {
// 		if (text.classList.contains('hidden')) {
// 			text.classList.remove('hidden');
// 		};
// 	}
// }
