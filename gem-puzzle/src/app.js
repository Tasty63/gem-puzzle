import './css/normalize.css';
import './scss/fonts.scss';
import './scss/variables.scss';
import './scss/style.scss';

import Puzzle from './js/Puzzle';
import Menu from './js/Menu';
import PopUp from './js/PopUp';
import GameMediator from './js/GameMediator';

const puzzleNode = document.querySelector('.puzzle');

class App {
  constructor() {
    this.menu = new Menu(puzzleNode);
    this.puzzle = new Puzzle(puzzleNode);
    this.popUp = new PopUp(puzzleNode);

    this.GameMediator = new GameMediator(this.menu, this.puzzle, this.popUp);
  }

  init() {
    this.puzzle.launch();
  }
}

const app = new App();
app.init();
