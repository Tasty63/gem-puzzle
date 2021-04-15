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
    this.bar.className = 'menu-bar menu-bar_animated-disappearing';

    this.newGameBtn = new NewGameButton(this, this.bar);
    this.soundButton = new Sound(this.bar);
    this.select = new Select(this.bar);

    this.select.node.addEventListener('change', () => {
      const chosenSize = this.select.getChosenSize();
      this.newGameBtn.settingsUpdate(chosenSize);
    });

    this.node.append(this.bar);
  }

  toggleClass() {
    this.bar.classList.toggle('menu-bar_animated-disappearing');
    this.bar.classList.toggle('menu-bar_animated-appearing');
  }

  toggle() {
    this.toggleClass();
    if (this.bar.classList.contains('menu-bar_animated-disappearing')) {
      this.timer.start();
    } else {
      this.timer.pause();
    }
  }
}
