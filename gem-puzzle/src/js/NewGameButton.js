export default class NewGameButton {
  constructor(parentNode, fieldSize) {
    this.fieldSize = fieldSize;
    this.node = document.createElement('button');
    this.node.classList.add('restart-btn');
    this.node.textContent = 'New Game';
    console.log(parentNode);
    parentNode.append(this.node);
    // this.node.addEventListener('click', );
  }
}

// restartButton.addEventListener('click', startNewGame.bind(null, this, menuBar));
