class Field {
    constructor(size) {
        this.size = size || 9;
        this.moveExceptions = [];
        this.arrTiles = [];
        this.movesAmount = 0;
    }
    // TODO popUp + drag and drop + restart + upluad gh-page
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

        console.log(this.moveExceptions);
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
            case 9:
                puzzleTiles.classList.add('puzzle__tiles_3x3');
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

    moveTile(event) {
        const target = event.target;
        ///поменять через case this.size
        const moveTo = parseInt(this.emptyTile.style.order, 10);
        const moveFrom = parseInt(target.style.order, 10);
        const orderDifference = Math.abs(moveFrom - moveTo);
        const orderSum = moveFrom + moveTo;
        if (orderDifference === 1 || orderDifference === Math.sqrt(this.size)) {
            if (!this.isException(orderSum) || ((moveTo === 5 || moveFrom === 5) && this
                    .size ===
                    9)) {
                this.animateMoving(target);
                this.emptyTile.style.order = moveFrom;
                target.style.order = moveTo;
                this.updateMoves();
            }
        }
        this.checkWin();
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

    shuffleTiles(nodeList) {
        this.arrTiles = Array.from(nodeList.childNodes);

        for (let i = this.arrTiles.length - 2; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = this.arrTiles[i].style.order;
            this.arrTiles[i].style.order = this.arrTiles[j].style.order;
            this.arrTiles[j].style.order = tmp;
        }
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
        if (this.movesAmount === 0) {
            this.initTimer();
        }
        this.moves.textContent = `Moves ${this.movesAmount += 1}`;
    }

    initTimer() {
        let sec = 0;
        let min = 0;
        setInterval(() => {
            sec = (sec + 1) % 60;
            if (sec % 60 === 0) {
                min += 1;
            }
            this.time.textContent = `Time ${addZero(min)}:${addZero(sec)}`;
        }, 1000);
    }
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


const field = new Field();

field.createField();