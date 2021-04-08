class Sound {
  constructor(state) {
    this.node = document.createElement('span');
    this.state = state;
  }

  handleClick() {}

  playSound() {}

  toggleSound(soundButton) {
    this.audio.muted = !this.audio.muted;
    soundButton.textContent = this.audio.muted ? 'Sound: off' : 'Sound: on';
    localStorage.setItem('audioMuted', JSON.stringify(this.audio.muted));
  }
}

// soundButton.classList.add('sound-toggle-btn');
// soundButton.textContent = JSON.parse(localStorage.getItem('audioMuted'));
// if (soundButton.textContent) {
//   soundButton.textContent = 'Sound: off';
// } else {
//   soundButton.textContent = 'Sound: on';
// }

// soundButton.addEventListener('click', this.toggleSound.bind(this, soundButton));
// this.audio = document.createElement('audio');
// this.audio.src = './gem-puzzle/assets/sounds/moving.mp3';
// this.audio.muted = JSON.parse(localStorage.getItem('audioMuted'));
//  this.audio.currentTime = 0;
//  this.audio.play();
