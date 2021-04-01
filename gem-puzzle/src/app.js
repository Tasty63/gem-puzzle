import './css/normalize.css';
import './scss/style.scss';

import Puzzle from './js/Puzzle';
import Menu from './js/Menu';

const puzzleNode = document.querySelector('.puzzle');

class App {
  constructor() {
    this.menu = new Menu(puzzleNode);
    this.puzzle = new Puzzle(puzzleNode);
  }

  init() {
    this.puzzle.launch(16);
  }

  update() {}
}

const app = new App();
app.init();
