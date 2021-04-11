export default class Timer {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.node = document.createElement('span');
    this.node.className = 'time';
    this.node.textContent = 'Time 00:00';

    this.timerLink = null;
    this.value = 0;
    this.isStarted = false;

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
    this.timerLink = setInterval(() => this.tick(), 1000);
  }

  update() {
    if (!this.isStarted) {
      this.start();
      this.isStarted = true;
    }
  }

  pause() {
    clearInterval(this.timerLink);
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
