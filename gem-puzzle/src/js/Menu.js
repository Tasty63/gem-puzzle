import Counter from './Counter';
import Timer from './Timer';

export default class Menu {
  constructor(parentNode) {
    this.node = document.createElement('div');
    this.node.className = 'puzzle__menu';
    this.mediator = null;

    this.counter = new Counter(this.node);
    this.timer = new Timer(this.node);

    this.node.append(this.counter.node);
    parentNode.append(this.node);
  }
}
