import Counter from './Counter';
import Timer from './Timer';
import Sound from './Sound';
import NewGameButton from './NewGameButton';
import Select from './Select';

export default class Menu {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.mediator = null;
    this.node = document.createElement('div');
    this.bar = document.createElement('div');
    this.button = document.createElement('button');
    /// раскидать по функциям
    this.button.className = 'menu-btn';
    this.button.textContent = 'Menu';
    this.node.className = 'puzzle__menu';

    this.timer = new Timer(this.node);
    this.counter = new Counter(this.node);

    this.bar.className = 'menu-bar menu-bar_animated-reverse';
    this.soundButton = new Sound(this.bar);
    this.newGameBtn = new NewGameButton(this.bar);

    this.node.append(this.button, this.bar);
    this.parentNode.append(this.node);
  }

  // чере медиатор вызывать puzzle.launch()
}
