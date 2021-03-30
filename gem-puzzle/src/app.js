import './css/normalize.css';
import './scss/style.scss';

// import Menu from './js/Menu';
import Puzzle from './js/Puzzle';
import Constants from './js/Constants';

const puzzleNode = document.querySelector('.puzzle');
// TO DO animate moving, add bg
class App {
  constructor() {
    this.puzzle = new Puzzle(puzzleNode);
  }

  init() {
    this.puzzle.launch(16);
  }
}

const app = new App();
app.init();
