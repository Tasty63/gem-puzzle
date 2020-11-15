export default class Menu {
    constructor(field) {
        this.field = field;
        this.fieldNodes = field.puzzleField;
    }

    createMenu() {
        const pause = document.createElement('a');
        pause.href = '#';
        this.menuBar = document.createElement('div');
        const puzzleMenu = this.fieldNodes.childNodes[0];
        const tiles = this.fieldNodes.childNodes[1];

        pause.className = 'pause';
        pause.textContent = 'Pause game';
        pause.addEventListener('click', this.toggleMenu.bind(this));

        this.menuBar.classList.add('menuBar');

        const restartButton = document.createElement('a');
        restartButton.href = '#';
        restartButton.classList.add('restart')
        restartButton.textContent = 'New game';
        restartButton.addEventListener('click', this.startNewGame.bind(this));

        this.menuBar.append(restartButton);

        puzzleMenu.append(pause);
        tiles.append(this.menuBar);
    }

    toggleMenu() {

        if (this.menuBar.classList.contains('menuBar_animated')) {
            this.field.initTimer();
            this.menuBar.classList.remove('menuBar_animated');
            this.menuBar.classList.add('menuBar_animated-reverse');
        } else {
            this.field.pauseTimer();
            this.menuBar.classList.remove('menuBar_animated-reverse');
            this.menuBar.classList.add('menuBar_animated');
        }
    }

    startNewGame() {
        this.field.shuffleTiles();
        this.field.swapLast();
        this.menuBar.classList.remove('menuBar_animated');
        this.field.stopTimer();
        this.field.movesAmount = -1;
        this.field.updateMoves()
    }

}