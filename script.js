//start screen
const overlay = document.getElementById("overlay");
const startBtn = document.querySelector(".start-btn");
const startImg = document.getElementById("start-img");
//choose game mode 
const chooseDifficultyScreen = document.getElementById("choose-difficulty-screen");
const easyBtn = document.getElementById("easy-btn");
const midBtn = document.getElementById("mid-btn");
const impossibleBtn = document.getElementById("impossible-btn");
//choose turn screen
const chooseTurnScreen = document.getElementById("choose-turn-screen");
const xSelect = document.getElementById("x-select");
const oSelect = document.getElementById("o-select");
//game screen
const gameScreen = document.getElementById("game-screen");
const pvpBtn = document.getElementById("pvp");
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
//end screens
const xWinScreen = document.getElementById("x-wins-screen");
const oWinScreen = document.getElementById("o-wins-screen");
const winScreen = document.getElementById("win-screen");
const loseScreen = document.getElementById("lose-screen");
const drawScreen = document.getElementById("draw-screen");
//audio
let gameAudio = document.querySelectorAll('.game-audio');
let muteButton = document.querySelector('.mute-png');
const transitionAudio = document.getElementById("transition");
const dangerAudio = document.getElementById("danger");
const warmupAudio = document.getElementById("warm-up");
const standardAudio = document.getElementById("standard");
const pvpAudio = document.getElementById("pvp-audio");
const bonesAudio = document.getElementById("bones");
const winAudio = document.getElementById("win-audio");
const loseAudio = document.getElementById("lose-audio");
const drawAudio = document.getElementById("draw-audio");

let mode; //to switch between difficulties

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
  if (next == chooseDifficultyScreen) {
    clearBoard();
  }
}

startBtn.addEventListener('click', function() {
  transitionScreen(overlay, chooseDifficultyScreen);
  transitionAudio.play()
});
easyBtn.addEventListener('click', function() {
  transitionScreen(chooseDifficultyScreen, chooseTurnScreen);
  pvpAudio.play();
  muteButton.style.display = 'none';
  mode = 'easy';
});
midBtn.addEventListener('click', function() {
  transitionScreen(chooseDifficultyScreen, chooseTurnScreen);
  pvpAudio.play();
  muteButton.style.display = 'none';
  mode = 'mid';
});
impossibleBtn.addEventListener('click', function() {
  transitionScreen(chooseDifficultyScreen, chooseTurnScreen);
  pvpAudio.play();
  muteButton.style.display = 'none';
  mode = 'impossible';
});
pvpBtn.addEventListener('click', function() {
  transitionScreen(chooseDifficultyScreen, chooseTurnScreen);
  pvpAudio.play();
  muteButton.style.display = 'none';
  mode = 'pvp';
});
//turn selection
xSelect.addEventListener('click', () => {
  turnPlayer = player;
  transitionScreen(chooseTurnScreen, gameScreen);
  transitionAudio.play();
});
oSelect.addEventListener('click', () => {
  turnPlayer = computer;
  transitionScreen(chooseTurnScreen, gameScreen);
  transitionAudio.play();
  if(mode == 'easy'){
    setTimeout(() => {
      computerMove();
    }, 300);
  }
  else if(mode == 'mid'){
    setTimeout(() => {
      makeComputerMoveMid(squares);
    }, 300);
  }
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
let isMuted = false;

muteButton.addEventListener('click', function() {
  isMuted = !isMuted;

  gameAudio.forEach(function(audio) {
    audio.muted = isMuted; 
  });

  muteButton.setAttribute('src', isMuted ? 'img/muted.png' : 'img/unmuted.png'); 
});

//game logic
let turnPlayer;
const player = 'X';
const computer = 'O';
let gameField = ['', '', '', '', '', '', '', '', ''];
//placing the choices
squares.forEach((square, i) => {
  square.addEventListener('click', () => {
    if (gameField[i] === '') {
      if(mode == 'pvp'){
      gameField[i] = turnPlayer;
      square.textContent = turnPlayer;
      turnPlayer = turnPlayer === 'X' ? 'O' : 'X';
      }
      else{
        makeMove(i)
      }
      checkOutcome()
    }
  });
});


function checkOutcome() {
  const winningCombinations = [
    // horizontally
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8],
    // vertically
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    // diagonally
    [0, 4, 8], 
    [2, 4, 6]              
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameField[a] !== '' && gameField[a] === gameField[b] && gameField[b] === gameField[c]) {
      if (gameField[a] === 'X') {
        mode === 'pvp' ? endScreenTransitions(xWinScreen, winAudio) : endScreenTransitions(winScreen, winAudio);
      } else {
        mode === 'pvp' ? endScreenTransitions(oWinScreen, winAudio) : endScreenTransitions(loseScreen, loseAudio);
      }
      return true;
    }
  }

  const fullBoard = gameField.every(square => square !== '');
  if (fullBoard) {
    endScreenTransitions(drawScreen, drawAudio);
    return true;
  }

  return false;
}



//computer logic
function makeMove(i) {
  gameField[i] = turnPlayer;
  squares[i].textContent = turnPlayer;
  squares[i].removeEventListener('click', makeMove); 
  turnPlayer = turnPlayer === player ? computer : player;
  console.log(gameField)
  if (turnPlayer === computer) {
    gameScreen.style.pointerEvents = 'none';
    setTimeout(() => {
      if (mode === 'easy') {
        computerMove();
      } else if (mode === 'mid') {
        makeComputerMoveMid(squares);
      }
      gameScreen.style.pointerEvents = 'all';
    }, 500);
  }
}

function computerMove() {
  const emptyFields = gameField.reduce((acc, value, index) => {
    if (value === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  let selectedIndex;
  
  selectedIndex = Math.floor(Math.random() * emptyFields.length);
  

  const selectedField = emptyFields[selectedIndex];

  gameField[selectedField] = turnPlayer;
  squares[selectedField].textContent = turnPlayer;
  turnPlayer = turnPlayer === player ? computer : player;
  checkOutcome();

}


//transitions of the outcome
function endScreenTransitions(outcome, audio){
  gameScreen.style.pointerEvents = 'none';
  setTimeout(() => {
    transitionScreen(gameScreen, outcome);
    setTimeout(() => {outcome.style.opacity = "1";}, 100)
    gameScreen.style.pointerEvents = 'all';
    audio.play();
    clearBoard();
    setTimeout(() => {
      outcome.style.opacity = "0";
      transitionScreen(outcome, chooseDifficultyScreen);
      muteButton.style.display = 'inline-block';
    }, 2000);
  }, 300);
 
}
function clearBoard() {
  squares.forEach((square, i) => {
    square.textContent = '';
    gameField[i] = '';
    turnPlayer = undefined;
  });
  mode = undefined;
}


//mid difficulty logic
function makeComputerMoveMid(squares) {
  const emptyFields = gameField.reduce((acc, value, index) => {
    if (value === "") {
      acc.push(index);
    }
    return acc;
  }, []);

  let selectedIndex;

  // Check for a winning move
  for (const field of emptyFields) {
    gameField[field] = turnPlayer;
    if (checkOutcome()) {
      selectedIndex = field;
      break;
    }
    gameField[field] = "";
  }

  if (selectedIndex === undefined) {
  if (emptyFields.length >= 0) {
    selectedIndex = Math.floor(Math.random() * emptyFields.length);
  } else {
    selectedIndex = -1;
    return; 
  }
}
  const selectedField = emptyFields[selectedIndex];
  console.log(selectedField)
  if (selectedField !== undefined){
    gameField[selectedField] = turnPlayer;
    squares[selectedField].textContent = turnPlayer;
    turnPlayer = turnPlayer === player ? computer : player;
    
  }
 
  checkOutcome();
}








