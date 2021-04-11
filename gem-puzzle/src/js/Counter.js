export default class Counter {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.node = document.createElement('span');
    this.node.className = 'moves';
    this.node.textContent = 'Moves 0';
    this.movesAmount = 0;

    this.parentNode.append(this.node);
  }

  render() {
    this.node.textContent = `Moves ${this.movesAmount}`;
  }

  update() {
    this.movesAmount++;
    this.render();
  }

  reset() {
    this.movesAmount = 0;
    this.render();
  }

  getMovesAmount() {
    return this.movesAmount;
  }
}
