export default class Counter {
  constructor(parentNode, rootNode) {
    this.node = document.createElement('span');
    this.node.className = 'moves';
    this.node.textContent = 'Moves 0';
    this.movesAmount = 0;
    // мб применить какой-то шаблон
    rootNode.addEventListener('tileMove', this.updateCounter.bind(this));

    parentNode.append(this.node);
  }

  updateCounter() {
    this.node.textContent = `Moves ${++this.movesAmount}`;
  }
}
