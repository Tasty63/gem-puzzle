export default class Counter {
  constructor(parentNode, rootNode) {
    this.node = document.createElement('span');
    this.node.className = 'moves';
    this.node.textContent = 'Moves 0';
    this.movesAmount = 0;
    // мб применить какой-то шаблон
    // rootNode.addEventListener('tileMove', this.update.bind(this));

    parentNode.append(this.node);
  }

  update() {
    this.node.textContent = `Moves ${++this.movesAmount}`;
  }
}
