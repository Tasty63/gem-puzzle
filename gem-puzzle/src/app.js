import './css/normalize.css';
import './scss/style.scss';

// import Menu from './js/Menu';
import Puzzle from './js/Puzzle';

const puzzleNode = document.querySelector('.puzzle');
const size4x4 = 16;

class App {
  constructor() {
    this.puzzle = new Puzzle(puzzleNode);
  }

  init() {
    this.puzzle.launch(20);
  }
}

const app = new App();
app.init();
