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
const xToggleSelect = document.getElementById("x-turn-button");
const oToggleSelect = document.getElementById("o-turn-button");
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
const clickAudio = document.getElementById("click-audio");

let mode; //to switch between difficulties
//screen transition
function transitionScreen(current, next)
{
  if(next == overlay || next == chooseDifficultyScreen || next == gameScreen || next ==chooseTurnScreen)
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
  player = 'X';
  computer = 'O';
  turnPlayerUndefined()
  transitionScreen(chooseTurnScreen, gameScreen);
  transitionAudio.play();
   if(mode == 'easy' && turnPlayer == computer){
    setTimeout(() => {
      computerMove();
    }, 300);
  }
  else if(mode == 'mid' && turnPlayer == computer){
    setTimeout(() => {
      computerMoveMid(squares);
    }, 300);
  }
  else if(mode == 'impossible' && turnPlayer == computer){
    setTimeout(() => {
      impossibleComputerMove(squares)
    }, 300);
  }
});
oSelect.addEventListener('click', () => {
  player = 'O';
  computer = 'X';
  turnPlayerUndefined()
  transitionScreen(chooseTurnScreen, gameScreen);
  transitionAudio.play();
  if(mode == 'easy' && turnPlayer == computer){
    setTimeout(() => {
      computerMove();
    }, 300);
  }
  else if(mode == 'mid' && turnPlayer == computer){
    setTimeout(() => {
      computerMoveMid(squares);
    }, 300);
  }
  else if(mode == 'impossible' && turnPlayer == computer){
    setTimeout(() => {
      impossibleComputerMove(squares)
    }, 300);
  }
});

//starting player selection

let remainer;

xToggleSelect.addEventListener('click', function() {
  selectStarterToggle(xToggleSelect, oToggleSelect, 'X');
});

oToggleSelect.addEventListener('click', () => {
  selectStarterToggle(oToggleSelect, xToggleSelect, 'O');
});


function selectStarterToggle(selected, other, n){
  selected.classList.add("turn-select-toggle");
  other.classList.remove("turn-select-toggle");
  selected.style.pointerEvents = 'none';
  other.style.pointerEvents = 'all';
  selected.style.cursor = 'none'
  other.style.cursor = 'pointer'
  turnPlayer = n;
  remainer = turnPlayer;
  clickAudio.play()
  
}
function turnPlayerUndefined(){
  if(turnPlayer == undefined){
    turnPlayer = 'X';
  }
}

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
let player ;
let computer ;
let gameField = ['', '', '', '', '', '', '', '', ''];
// Event listener for PvP mode
//placing the choices
squares.forEach((square, i) => {
  square.addEventListener('click', () => {
    if (gameField[i] === '') {
      if(mode == 'pvp'){
      gameField[i] = turnPlayer;
      square.textContent = turnPlayer;
      turnPlayer = turnPlayer === 'X' ? 'O' : 'X';
      checkOutcome()
      }
      else{
        makeMove(i)
      }
      
    }
  });
});
square4.addEventListener('click', () => {
  if (gameField[3] === '') {
    if (mode === 'pvp') {
      gameField[3] = turnPlayer;
      square4.textContent = turnPlayer;
      turnPlayer = turnPlayer === 'X' ? 'O' : 'X';
      checkOutcome();
    } else {
      makeMove(3);
    }
  }
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
      if (mode !== 'pvp') {
          gameField[a] === player ? endScreenTransitions(winScreen, winAudio) : endScreenTransitions(loseScreen, loseAudio);
      } else{
          gameField[a] === 'X' ? endScreenTransitions(xWinScreen, winAudio) : endScreenTransitions(oWinScreen, winAudio);
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
  checkOutcome()
  if (turnPlayer === computer) {
    gameScreen.style.pointerEvents = 'none';
    setTimeout(() => {
      if (mode === 'easy') {
        computerMove();
      } else if (mode === 'mid') {
        computerMoveMid(squares);
      }
      else if(mode == 'impossible'){
        impossibleComputerMove(squares);
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


//transitions of the outcome//
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
    turnPlayer = remainer;
  });
  mode = undefined;
}


//mid difficulty logic//
function computerMoveMid(squares) {
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
      console.log('this is field that gives value    '+selectedIndex)
      break;
    }
    gameField[field] = "";
  }

  if (selectedIndex === undefined) {
    if (emptyFields.length > 1) {
      selectedIndex = Math.floor(Math.random() * emptyFields.length);
      selectedIndex = emptyFields[selectedIndex];
   
  } else {
      selectedIndex = emptyFields[0];
  }
}
    gameField[selectedIndex] = turnPlayer;
    squares[selectedIndex].textContent = turnPlayer;
    turnPlayer = turnPlayer === player ? computer : player;
    checkOutcome()
  }




//maxdifficulty logic

//minmax
// function minimax(board, depth, maximizingPlayer) {
//   const scores = {
//     X: 1,
//     O: -1,
//     tie: 0,
//   };

//   if (getOutcome(board)) {
//     const outcome = getOutcome(board);
//     return scores[outcome];
//   }

//   if (maximizingPlayer) {
//     let bestScore = -Infinity;

//     for (let i = 0; i < board.length; i++) {
//       if (board[i] === '') {
//         board[i] = computer;
//         const score = minimax(board, depth + 1, false);
//         board[i] = '';
//         bestScore = Math.max(score, bestScore);
//       }
//     }

//     return bestScore;
//   } else {
//     let bestScore = Infinity;

//     for (let i = 0; i < board.length; i++) {
//       if (board[i] === '') {
//         board[i] = player;
//         const score = minimax(board, depth + 1, true);
//         board[i] = '';
//         bestScore = Math.min(score, bestScore);
//       }
//     }

//     return bestScore;
//   }
// }

// function impossibleComputerMove(squares) {
//   const emptyFields = gameField.reduce((acc, value, index) => {
//     if (value === "") {
//       acc.push(index);
//     }
//     return acc;
//   }, []);

//   if (emptyFields.length === 0) {
//     // No empty fields left, exit the function
//     return;
//   }

//   let bestScore = -Infinity;
//   let bestMove;

//   for (let i = 0; i < emptyFields.length; i++) {
//     const field = emptyFields[i];
//     squares[field].textContent = computer;
//     const score = minimax(getBoardFromSquares(squares), 0, false);
//     squares[field].textContent = '';

//     if (score > bestScore) {
//       bestScore = score;
//       bestMove = field;
//     }
//   }

//   squares[bestMove].textContent = computer;
//   checkOutcome();
// }

// function getOutcome(board) {
//   const winningCombinations = [
//     // horizontally
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     // vertically
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     // diagonally
//     [0, 4, 8],
//     [2, 4, 6]
//   ];

//   for (const combination of winningCombinations) {
//     const [a, b, c] = combination;
//     if (
//       board[a] !== '' &&
//       board[a] === board[b] &&
//       board[b] === board[c]
//     ) {
//       return board[a];
//     }
//   }

//   const fullBoard = board.every(square => square !== '');
//   if (fullBoard) {
//     return 'tie';
//   }

//   return '';
// }

// // Utility function to extract the game board from the squares
// function getBoardFromSquares(squares) {
//   return squares.map(square => square.textContent);
// }
