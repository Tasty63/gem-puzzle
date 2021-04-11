export default class NewGameButton {
  constructor(parent, parentNode, fieldSize) {
    this.parent = parent;
    this.parentNode = parentNode;
    this.size = fieldSize;

    this.node = document.createElement('button');
    this.node.classList.add('restart-btn');
    this.node.textContent = 'New Game';

    this.parentNode.append(this.node);
    this.node.addEventListener('click', this.start.bind(this));
  }

  start() {
    this.parent.mediator.notify(this, 'newGame');
  }
}
