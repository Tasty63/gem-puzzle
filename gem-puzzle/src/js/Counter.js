export default class Counter {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.node = document.createElement('span');
    this.node.className = 'moves';
    this.node.textContent = 'Moves 0';
    this.movesAmount = 0;

    this.parentNode.append(this.node);
  }

  update() {
    this.node.textContent = `Moves ${++this.movesAmount}`;
  }

  getMovesAmount() {
    return this.movesAmount;
  }
}
