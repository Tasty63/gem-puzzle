const on = true;

export default class SoundButton {
  constructor(parentNode) {
    this.node = document.createElement('button');
    this.audio = document.createElement('audio');
    this.state = null;

    this.node.className = 'sound-toggle-btn';
    this.audio.src = 'sounds/moving.mp3';

    this.node.onclick = (event) => this.toggleSound();

    this.updateState();
    parentNode.append(this.node);
  }

  updateState() {
    this.state = on;
    if (JSON.parse(localStorage.getItem('audioState')) !== null) {
      this.state = JSON.parse(localStorage.getItem('audioState'));
    }
    this.audio.muted = !this.state;
    this.node.textContent = this.state ? 'Sound: on' : 'Sound: off';
  }

  playSound() {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  toggleSound() {
    this.state = !this.state;
    this.audio.muted = !this.audio.muted;
    this.node.textContent = this.state ? 'Sound: on' : 'Sound: off';
    localStorage.setItem('audioState', JSON.stringify(this.state));
  }
}
