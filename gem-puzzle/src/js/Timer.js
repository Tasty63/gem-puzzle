export default class Timer {
  constructor() {
    this.time = 0;
  }

  update() {
    if (this.time === 0) {
      this.start();
      return;
    }

    this.tick();
  }

  start() {}

  tick() {}

  stop() {}

  addZero(n) {
    /// переписать на регулярку
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }
}
