class Field {
    constructor(size) {
        this.size = size || 16;
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

            if (i === this.size) {
                tile.classList.add('puzzle__tile_empty');
            }

            tile.textContent = i;
            puzzleTiles.append(tile);
        }

        return puzzleTiles;
    }
}

const field = new Field();

field.createField();