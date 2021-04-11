import NewGameButton from './NewGameButton';

export default class PopUp {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.mediator = null;
    this.node = document.createElement('div');
    this.node.classList.add('pop-up');

    parentNode.append(this.node);
  }

  render(info) {
    const { moves, seconds, minutes, size } = info;
    const children = Array.from(this.node.childNodes);
    children.forEach((child) => child.remove());
    const content = `
      <h1 class="pop-up__congratulation-text">Congratulation!</h1>
      <div class="pop-up__time">
        You solved puzzle in 
        <span class="time-counter">
          ${minutes}:${seconds}
        </span>
      </div>
      <div class="pop-up__moves">
        and 
        <span class="moves-counter">
          ${moves}
        </span> moves
      </div>
   
    `;

    this.newGameBtn = new NewGameButton(this, this.node, size);
    this.node.insertAdjacentHTML('afterbegin', content);
    this.node.classList.add('pop-up_visible');
  }
}
