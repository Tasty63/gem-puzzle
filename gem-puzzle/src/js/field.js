class Field {
    constructor(size) {
        this.size = size || 16;
        this.moveExceptions = [];
        this.arrTiles = [];
    }

    isException(orderSum) {
        return this.moveExceptions.includes(orderSum);
    }

    /// TODO move animation + time/moves
    moveTile(event) {
        const target = event.target;
        const moveTo = this.emptyTile.style.order;
        const moveFrom = target.style.order;
        const orderDifference = Math.abs(moveFrom - moveTo);
        const orderSum = parseInt(moveFrom, 10) + parseInt(moveTo, 10);

        if (orderDifference === 1 || orderDifference === Math.sqrt(this.size)) {
            if (!this.isException(orderSum)) {
                target.style.order = moveTo;
                this.emptyTile.style.order = moveFrom;
            }
        }
    }

    shuffleTiles(node) {
        this.arrTiles = Array.from(node.childNodes);

        for (let i = this.arrTiles.length - 2; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = this.arrTiles[i].style.order;
            this.arrTiles[i].style.order = this.arrTiles[j].style.order;
            this.arrTiles[j].style.order = tmp;
        }
    }

    createField() {
        const puzzleField = document.createElement('div');
        const puzzleMenu = document.createElement('div');
        const time = document.createElement('div');
        const moves = document.createElement('div');
        const pause = document.createElement('a');
        const tiles = this.createTiles();

        for (let i = 1; i < Math.sqrt(this.size); i += 1) {
            this.moveExceptions.push(Math.sqrt(this.size) * 2 * i + 1);
        }

        puzzleField.className = 'puzzle';
        puzzleMenu.className = 'puzzle__menu';
        time.className = 'time';
        moves.className = 'moves';
        pause.className = 'pause';
        //  time.textContent = getTime();
        pause.textContent = 'Pause game';

        puzzleMenu.append(time, moves, pause);
        puzzleField.append(puzzleMenu, tiles);
        document.body.append(puzzleField);
    }

    createTiles() {
        const puzzleTiles = document.createElement('div');
        puzzleTiles.className = 'puzzle__tiles';

        switch (this.size) {
            case 16:
                puzzleTiles.classList.add('puzzle__tiles_4x4');
                break;
            default:
                break;
        }

        for (let i = 1; i <= this.size; i += 1) {
            const tile = document.createElement('div');

            tile.className = 'puzzle__tile';
            tile.textContent = i;
            tile.style.order = i;
            if (i === this.size) {
                tile.classList.add('puzzle__tile_empty');
                this.emptyTile = tile;
            }

            tile.addEventListener('click', this.moveTile.bind(this));
            puzzleTiles.append(tile);
        }

        this.shuffleTiles(puzzleTiles);

        return puzzleTiles;
    }
}

const field = new Field();

field.createField();