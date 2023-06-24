



// audio buttons
let gameAudio = document.querySelectorAll('.game-audio');
let muteButton = document.querySelector('.mute-png')
let isMuted = false;

muteButton.addEventListener('click', function() {
  isMuted = !isMuted;

  gameAudio.forEach(function(audio) {
    audio.muted = isMuted; 
  });

  muteButton.setAttribute('src', isMuted ? 'img/muted.png' : 'img/unmuted.png'); 
});