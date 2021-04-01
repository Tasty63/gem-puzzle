export default class Timer {
  constructor() {
    this.time = 0;
  }

  start() {}

  stop() {}

  addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }
}
