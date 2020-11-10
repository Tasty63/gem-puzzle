class Field {
    constructor(size) {
        this.size = size || 16;
        this.moveExceptions = [];
        this.arrTiles = [];
        this.movesAmount = 0;
    }

    isException(orderSum) {
        return this.moveExceptions.includes(orderSum);
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

    animateMoving(target) {
        const targetPosition = [
            target.getBoundingClientRect().left,
            target.getBoundingClientRect().top,
        ];

        const emptyTilePosition = [
            this.emptyTile.getBoundingClientRect().left,
            this.emptyTile.getBoundingClientRect().top,
        ];
        const deltaX = targetPosition[0] - emptyTilePosition[0];
        const deltaY = targetPosition[1] - emptyTilePosition[1];

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
        }, 0.3);
    }

    updateMoves() {
        this.moves.textContent = `Moves ${this.movesAmount += 1}`;
    }

    /// TODO  time
    moveTile(event) {
        const target = event.target;

        const moveTo = this.emptyTile.style.order;
        const moveFrom = target.style.order;
        const orderDifference = Math.abs(moveFrom - moveTo);
        const orderSum = parseInt(moveFrom, 10) + parseInt(moveTo, 10);

        if (orderDifference === 1 || orderDifference === Math.sqrt(this.size)) {
            if (!this.isException(orderSum)) {
                this.animateMoving(target);
                this.emptyTile.style.order = moveFrom;
                target.style.order = moveTo;
                this.updateMoves();
            }
        }
        this.checkWin();
    }

    shuffleTiles(nodeList) {
        this.arrTiles = Array.from(nodeList.childNodes);

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
        this.time = document.createElement('div');
        this.moves = document.createElement('div');
        const pause = document.createElement('a');
        const tiles = this.createTiles();

        for (let i = 1; i < Math.sqrt(this.size); i += 1) {
            this.moveExceptions.push(Math.sqrt(this.size) * 2 * i + 1);
        }

        puzzleField.className = 'puzzle';
        puzzleMenu.className = 'puzzle__menu';
        this.time.className = 'time';
        this.moves.className = 'moves';
        pause.className = 'pause';

        this.moves.textContent = 'Moves 0';
        this.time.textContent = 'Time 00:00';
        pause.textContent = 'Pause game';

        puzzleMenu.append(this.time, this.moves, pause);
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
            const tile = document.createElement('button');

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