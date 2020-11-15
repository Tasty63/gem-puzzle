function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

export default class Field {
    constructor(size) {
        this.size = size || 16;
        this.arrTiles = [];
        this.movesAmount = 0;
        this.sec = 0;
        this.min = 0;
    }
    // TODO popUp + upload gh-page

    get puzzleField() {
        return this._puzzleField;
    }
    set puzzleField(elem) {
        this._puzzleField = elem;
    }

    createField() {
        const puzzleMenu = document.createElement('div');
        this.puzzleField = document.createElement('div');

        this.time = document.createElement('div');
        this.moves = document.createElement('div');

        const tiles = this.createTiles();

        this.puzzleField.className = 'puzzle';
        puzzleMenu.className = 'puzzle__menu';
        this.time.className = 'time';
        this.moves.className = 'moves';

        this.moves.textContent = 'Moves 0';
        this.time.textContent = 'Time 00:00';

        puzzleMenu.append(this.time, this.moves);
        this.puzzleField.append(puzzleMenu, tiles);
        document.body.append(this.puzzleField);
    }

    createTiles() {
        const puzzleTiles = document.createElement('div');
        puzzleTiles.className = 'puzzle__tiles';

        switch (this.size) {
            case 16:
                puzzleTiles.classList.add('puzzle__tiles_4x4');
                this.tileWidth = 130;
                break;
            case 9:
                puzzleTiles.classList.add('puzzle__tiles_3x3');
                this.tileWidth = 174;
                break;
            default:
                break;
        }

        for (let i = 1; i <= this.size; i += 1) {
            const tile = document.createElement('button');

            tile.className = 'puzzle__tile';
            tile.textContent = i;
            tile.style.order = i;
            tile.draggable = true;
            if (i === this.size) {
                tile.classList.add('puzzle__tile_empty');
                this.emptyTile = tile;

                this.emptyTile.addEventListener('drop', () => this.moveTile(this
                    .dragStartEvent));
                this.emptyTile.addEventListener('dragover', (event) => event
                    .preventDefault());
            }

            tile.addEventListener('click', this.moveTile.bind(this));
            tile.addEventListener('dragstart', this.dragStart.bind(this));
            tile.addEventListener('dragend', () => tile.classList.remove('hide'));

            puzzleTiles.append(tile);
        }

        this.arrTiles = Array.from(puzzleTiles.childNodes);
        this.shuffleTiles();

        return puzzleTiles;
    }

    dragStart(event) {
        const target = event.target;
        this.dragStartEvent = event;

        setTimeout(() => {
            target.classList.add('hide');
        }, 0);
    }

    moveTile(event) {
        const target = event.target;
        const moveToOrder = parseInt(this.emptyTile.style.order, 10);
        const moveFromOrder = parseInt(target.style.order, 10);
        const deltaX = target.getBoundingClientRect().left -
            this.emptyTile.getBoundingClientRect().left;

        const deltaY = target.getBoundingClientRect().top -
            this.emptyTile.getBoundingClientRect().top;

        if ((Math.abs(deltaX) === this.tileWidth && deltaY === 0) ||
            (Math.abs(deltaY) === this.tileWidth && deltaX === 0)) {
            if (event.type !== 'dragstart') {
                this.animateMoving(target, deltaX, deltaY);
            }
            this.emptyTile.style.order = moveFromOrder;
            target.style.order = moveToOrder;
            this.updateMoves();
        }
        this.checkWin();
    }

    checkWin() {
        const orderToWin = this.arrTiles // изменить алгоритм
            .map((tile) => tile.style.order)
            .sort((a, b) => a - b);

        for (let i = 0; i < this.size; i += 1) {
            if (orderToWin[i] !== this.arrTiles[i].style.order) {
                return false;
            }
        }
        return true; // CreatePopUp()
    }

    shuffleTiles() {

        for (let i = this.arrTiles.length - 2; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = this.arrTiles[i].style.order;

            this.arrTiles[i].style.order = this.arrTiles[j].style.order;
            this.arrTiles[j].style.order = tmp;
        }

        if (this.IsUnsolvable()) {
            this.shuffleTiles();
        }
    }

    swapLast() {
        const orderOfTiles = this.arrTiles.sort((a, b) => a.style.order - b.style.order);

        for (let i = 0; i < orderOfTiles.length - 1; i += 1) {
            if (orderOfTiles[i].textContent === '16') {
                const tmp = orderOfTiles[i].style.order;
                orderOfTiles[i].style.order = orderOfTiles[15].style.order;
                orderOfTiles[15].style.order = tmp;
            }
        }
    }

    IsUnsolvable() {
        const orderOfTiles = this.arrTiles.sort((a, b) => a.style.order - b.style.order);
        let numberPairs = 0;

        for (let i = 0; i < this.size - 1; i += 1) {
            for (let j = i + 1; j < this.size - 1; j += 1) {
                if (parseInt(orderOfTiles[i].textContent, 10) >
                    parseInt(orderOfTiles[j].textContent, 10)) {
                    numberPairs += 1;
                }
            }
        }

        return (numberPairs % 2 !== 0);
    }

    animateMoving(target, deltaX, deltaY) {
        target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        target.style.transition = 'transform 0s';

        this.arrTiles.forEach((tile) => {
            tile.disabled = true;
        });

        setTimeout(() => {
            target.style.transform = '';
            target.style.transition = 'transform 0.3s';
            this.arrTiles.forEach((tile) => {
                tile.disabled = false;
            });
        }, 0);
    }

    updateMoves() {
        if (this.movesAmount === 0) {
            this.initTimer();
        }
        this.moves.textContent = `Moves ${this.movesAmount += 1}`;
    }

    initTimer() {
        this.timerId = setInterval(() => {
            this.sec = (this.sec + 1) % 60;
            if (this.sec % 60 === 0) {
                this.min += 1;
            }
            this.time.textContent = `Time ${addZero(this.min)}:${addZero(this.sec)}`;
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerId);
        this.time.textContent = `Time 00:00`;
    }

    pauseTimer() {
        clearInterval(this.timerId);
    }

}