export default class Timer {
  constructor() {}

  start() {}

  stop() {}

  addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }
}
