import './css/normalize.css';
import './scss/style.scss';

import Puzzle from './js/Puzzle';
import Menu from './js/Menu';
import GameMediator from './js/GameMediator';

const puzzleNode = document.querySelector('.puzzle');

class App {
  constructor() {
    this.menu = new Menu(puzzleNode);
    this.puzzle = new Puzzle(puzzleNode);

    this.GameMediator = new GameMediator(this.menu, this.puzzle);
  }

  init() {
    this.puzzle.launch(9);
  }

  update() {}
}

const app = new App();
app.init();
