//selecting the elements
const overlay = document.getElementById("overlay");
const startBtn = document.querySelector(".start-btn");
const startImg = document.getElementById("start-img");
const technologiesUsed = document.getElementById("technologies-used");
const easyBtn = document.getElementById("easy-btn");
const midBtn = document.getElementById("mid-btn");
const impossibleBtn = document.getElementById("impossible-btn");
const gameScreen = document.getElementById("game-screen");
const squares = document.querySelectorAll(".square");
const square1 = document.getElementById("square-1");
const square2 = document.getElementById("square-2");
const square3 = document.getElementById("square-3");
const square4 = document.getElementById("square-4");
const square5 = document.getElementById("square-5");
const square6 = document.getElementById("square-6");
const square7 = document.getElementById("square-7");
const square8 = document.getElementById("square-8");
const square9 = document.getElementById("square-9");
const winScreen = document.getElementById("win-screen");
const loseScreen = document.getElementById("lose-screen");
const drawScreen = document.getElementById("draw-screen");
const mutePNG = document.querySelector(".mute-png");
const icons = document.querySelectorAll(".icons");
const htmlIcon = document.querySelector(".devicon-html5-plain");
const cssIcon = document.querySelector(".devicon-css3-plain");
const javascriptIcon = document.querySelector(".devicon-javascript-plain");
const chooseDifficultyScreen = document.querySelector("#choose-difficulty-screen");
const chooseText = document.querySelector("#choose-text");
const difficultyBtns = document.querySelectorAll(".difficulty-btns");
const choicesPNGs = document.querySelectorAll(".choices-pngs");
const difficultySettings = document.querySelector("#difficulty-settings");
const endScreens = document.querySelectorAll(".end-screens");
const winText = document.querySelector("#win-screen p");
const winImg = document.querySelector("#win-screen .end-img");
const loseText = document.querySelector("#lose-screen p");
const loseImg = document.querySelector("#lose-screen .end-img");
const drawText = document.querySelector("#draw-screen p");
const drawImg = document.querySelector("#draw-screen .end-img");
const transitionAudio = document.getElementById("transition");
const dangerAudio = document.getElementById("danger");
const warmupAudio = document.getElementById("warm-up");
const standardAudio = document.getElementById("standard");
const pvpAudio = document.getElementById("pvp-audio");
const bonesAudio = document.getElementById("bones")
const pvpBtn = document.getElementById("pvp");

//screen transition
function transitionScreen(current, next)
{
  if(next == overlay || next == chooseDifficultyScreen || next == gameScreen)
  {
  current.style.display = 'none';
  next.style.display = 'grid';
  }
  else{
  current.style.display = 'none';
  next.style.display = 'flex';
  }
}

startBtn.addEventListener('click', function() {
  transitionScreen(overlay, chooseDifficultyScreen);
  transitionAudio.play()
});
easyBtn.addEventListener('click', function() {
  transitionScreen(chooseDifficultyScreen, gameScreen);
  transitionAudio.play();
  muteButton.style.display = 'none';
  turnPlayer = player;
});
midBtn.addEventListener('click', function() {
  transitionScreen(chooseDifficultyScreen, gameScreen);
  transitionAudio.play();
  muteButton.style.display = 'none';
});
impossibleBtn.addEventListener('click', function() {
  transitionScreen(chooseDifficultyScreen, gameScreen);
  transitionAudio.play();
  muteButton.style.display = 'none';
  turnPlayer = computer;
});
pvpBtn.addEventListener('click', function() {
  transitionScreen(chooseDifficultyScreen, gameScreen);
  pvpAudio.play();
  muteButton.style.display = 'none';
});

//difficulty hover sounds

impossibleBtn.addEventListener('mouseover', function(){
  dangerAudio.play();
});
easyBtn.addEventListener('mouseover', function(){
  warmupAudio.play();
});
midBtn.addEventListener('mouseover', function(){
  standardAudio.play();
});
startBtn.addEventListener('mouseover', function(){
  bonesAudio.play();
});
// audio buttons

let gameAudio = document.querySelectorAll('.game-audio');
let muteButton = document.querySelector('.mute-png');
let isMuted = false;

muteButton.addEventListener('click', function() {
  isMuted = !isMuted;

  gameAudio.forEach(function(audio) {
    audio.muted = isMuted; 
  });

  muteButton.setAttribute('src', isMuted ? 'img/muted.png' : 'img/unmuted.png'); 
});

//game logic

let turnPlayer = 'o';
const player = 'x';
const computer = 'o';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

squares.forEach((square, index) => {
  square.addEventListener('click', () => {
    if (gameBoard[index] === '') {
      gameBoard[index] = turnPlayer;
      square.textContent = turnPlayer;
      turnPlayer = turnPlayer === 'X' ? 'O' : 'X';
      // Call a function to check for a win or a draw
    }
  });
});


