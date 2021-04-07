export default class Counter {
  constructor(parentNode) {
    this.node = document.createElement('span');
    this.node.className = 'moves';
    this.node.textContent = 'Moves 0';
    this.movesAmount = 0;

    parentNode.append(this.node);
  }

  update() {
    this.node.textContent = `Moves ${++this.movesAmount}`;
  }
}
