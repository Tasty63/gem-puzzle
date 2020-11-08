class Field {
    constructor(size) {
        this.size = size || 16;
    }

    setEmptyTile(tile) {
        this.emptyTile = tile;
    }

    moveTile(event) {
        const target = event.target;
        const moveTo = this.emptyTile.style.order;
        const moveFrom = target.style.order;
        const orderDifference = Math.abs(moveFrom - moveTo);

        if (orderDifference === 1 || orderDifference === Math.sqrt(this.size)) {
            target.style.order = moveTo;
            this.emptyTile.style.order = moveFrom;
        }
    }

    createField() {
        const puzzleField = document.createElement('div');
        const puzzleMenu = document.createElement('div');
        const time = document.createElement('div');
        const moves = document.createElement('div');
        const pause = document.createElement('a');
        const tiles = this.createTiles();

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
                this.setEmptyTile(tile);
                tile.classList.add('puzzle__tile_empty');
            }

            tile.addEventListener('click', this.moveTile.bind(this));
            puzzleTiles.append(tile);
        }

        return puzzleTiles;
    }
}

const field = new Field();

field.createField();