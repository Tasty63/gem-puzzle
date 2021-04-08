export default class Timer {
  constructor(parentNode) {
    this.node = document.createElement('div');
    this.node.className = 'time';
    this.node.textContent = 'Time 00:00';

    this.timerReference = null;
    this.value = 0;
    this.isStarted = false;

    parentNode.append(this.node);
  }

  getSeconds() {
    return this.value % 60;
  }

  getMinutes() {
    return Math.floor(this.value / 60);
  }

  render() {
    this.node.textContent = `Time ${addZero(this.getMinutes())}:${addZero(this.getSeconds())}`;
  }

  tick() {
    this.value++;
    this.render();
  }

  start() {
    this.timerReference = setInterval(() => this.tick(), 1000);
  }

  update() {
    if (!this.isStarted) {
      this.start();
      this.isStarted = true;
    }
  }

  stop() {
    clearInterval(this.timerReference);
    this.value = 0;
    this.render();
    this.isStarted = false;
  }
}

function addZero(number) {
  return number.toString().replace(/(^[\d]{1}$)/, '0$1');
}
