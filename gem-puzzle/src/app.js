import './css/normalize.css';
import './scss/style.scss';

import Menu from './js/Menu';
import Puzzle from './js/Puzzle';

const puzzleNode = document.querySelector('.puzzle');

class App {
  constructor() {
    this.puzzle = new Puzzle(puzzleNode);
    this.puzzle.launch();
  }
}

const app = new App();
