import Counter from './Counter';
import Timer from './Timer';
import Sound from './Sound';
import Select from './Select';

export default class Menu {
  constructor(parentNode) {
    this.mediator = null;
    this.node = document.createElement('div');
    this.bar = document.createElement('div');
    this.button = document.createElement('button');
    /// раскидать по функциям
    this.button.className = 'menu-btn';
    this.button.textContent = 'Menu';
    this.node.className = 'puzzle__menu';
    this.bar.className = 'menuBar menuBar_animated-reverse';

    this.timer = new Timer(this.node);
    this.counter = new Counter(this.node);

    this.node.append(this.button, this.bar);
    parentNode.append(this.node);
  }

  // чере медиатор вызывать puzzle.launch()
}
