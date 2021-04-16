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
    this.node.className = 'puzzle__menu';

    this.timer = new Timer(this.node);
    this.counter = new Counter(this.node);

    this.renderButton();
    this.renderBar();
    this.parentNode.append(this.node);
  }

  renderButton() {
    this.button = document.createElement('button');

    this.button.className = 'menu-btn';
    this.button.textContent = 'Menu';
    this.button.addEventListener('click', this.toggle.bind(this));

    this.node.append(this.button);
  }

  renderBar() {
    this.bar = document.createElement('div');
    this.bar.className = 'menu-bar';

    this.closeButton = document.createElement('button');

    this.newGameBtn = new NewGameButton(this, this.bar);
    this.soundButton = new Sound(this.bar);
    this.select = new Select(this.bar);

    this.closeButton.className = 'close-btn';
    this.closeButton.textContent = 'Close';
    this.closeButton.addEventListener('click', this.toggle.bind(this));

    this.select.node.addEventListener('change', () => {
      const chosenSize = this.select.getChosenSize();
      this.newGameBtn.update(chosenSize);
    });

    this.bar.append(this.closeButton);
    this.node.append(this.bar);
  }

  hide() {
    this.bar.classList.remove('menu-bar_animated-appearing');
    this.bar.classList.add('menu-bar_animated-disappearing');
  }

  show() {
    this.bar.classList.add('menu-bar_animated-appearing');
    this.bar.classList.remove('menu-bar_animated-disappearing');
  }

  toggle() {
    if (this.bar.classList.contains('menu-bar_animated-appearing')) {
      this.hide();
      this.timer.start();
    } else {
      this.show();
      this.timer.pause();
    }
  }
}
