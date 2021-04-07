export default class Subject {
  constructor() {
    this.listeners = [];
  }

  subscribe(observer) {
    this.listeners.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(changes) {
    this.observers.forEach((observer) => {
      observer.update(changes);
    });
  }
}
