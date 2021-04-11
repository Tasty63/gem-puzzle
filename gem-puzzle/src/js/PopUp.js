import NewGameButton from './NewGameButton';

export default class PopUp {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.mediator = null;
    this.node = document.createElement('div');
    this.node.classList.add('pop-up');

    parentNode.append(this.node);
  }

  render(fieldSize) {
    const content = `
      <h1 class="pop-up__congratulation-text">Congratulation!</h1>
      <div class="pop-up__time">
        You solved puzzle in 
        <span class="time-counter">
          ${this.mediator.menu.timer.getMinutes()}:${this.mediator.menu.timer.getSeconds()}
        </span>
      </div>
      <div class="pop-up__moves">
        and 
        <span class="moves-counter">
          ${this.mediator.menu.counter.getMovesAmount()}
        </span> moves
      </div>
   
    `;
    this.newGameBtn = new NewGameButton(this.node, fieldSize);
    this.node.insertAdjacentHTML('afterbegin', content);
    this.node.classList.add('pop-up_visible');
  }
}
