export default class Timer {
  constructor(parentNode) {
    this.node = document.createElement('span');
    this.parentNode = parentNode;
    this.node.className = 'time';
    this.node.textContent = 'Time 00:00';

    this.timerLink = null;
    this.isStarted = false;
    this.value = 0;

    this.parentNode.append(this.node);
  }

  getSeconds() {
    return addZero(this.value % 60);
  }

  getMinutes() {
    return addZero(Math.floor(this.value / 60));
  }

  render() {
    this.node.textContent = `Time ${this.getMinutes()}:${this.getSeconds()}`;
  }

  tick() {
    this.value++;
    this.render();
  }

  start() {
    if (!this.isStarted) {
      this.timerLink = setInterval(() => this.tick(), 1000);
      this.isStarted = true;
    }
  }

  pause() {
    clearInterval(this.timerLink);
    this.isStarted = false;
  }

  stop() {
    clearInterval(this.timerLink);
    this.value = 0;
    this.render();
    this.isStarted = false;
  }
}

function addZero(number) {
  return number.toString().replace(/(^[\d]{1}$)/, '0$1');
}
