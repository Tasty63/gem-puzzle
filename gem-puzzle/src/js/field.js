export default class Field {
    constructor(size) {
        this.size = size || 16;
        this.arrTiles = [];
        this.movesAmount = 0;
        this.sec = 0;
        this.min = 0;
    }

    createField() {
        const puzzleMenu = document.createElement('div');
        const tiles = this.createTiles();

        this.puzzleField = document.createElement('div');
        this.audio = document.createElement('audio');
        this.time = document.createElement('div');
        this.moves = document.createElement('div');

        this.audio.src =
            './gem-puzzle/assets/sounds/moving.mp3'; //  ../assets/sounds/moving.mp3

        this.audio.muted = JSON.parse(localStorage.getItem('audioMuted'));

        this.puzzleField.className = 'puzzle';
        this.time.className = 'time';
        this.moves.className = 'moves';
        puzzleMenu.className = 'puzzle__menu';

        this.moves.textContent = 'Moves 0';
        this.time.textContent = 'Time 00:00';

        puzzleMenu.append(this.time, this.moves);
        this.createMenu(puzzleMenu, tiles);
        this.puzzleField.append(puzzleMenu, tiles);
        document.body.append(this.puzzleField);
    }

    createTiles() {
        const puzzleTiles = document.createElement('div');
        puzzleTiles.className = 'puzzle__tiles';

        switch (this.size) {
            case 64:
                puzzleTiles.classList.add('puzzle__tiles_8x8');
                this.tileWidth = 65;
                break;
            case 49:
                puzzleTiles.classList.add('puzzle__tiles_7x7');
                this.tileWidth = 74;
                break;
            case 36:
                puzzleTiles.classList.add('puzzle__tiles_6x6');
                this.tileWidth = 86;
                break;
            case 25:
                puzzleTiles.classList.add('puzzle__tiles_5x5');
                this.tileWidth = 104;
                break;
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
            tile.addEventListener('dragend', () => tile.classList.remove('puzzle__tile_hide'));

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
            target.classList.add('puzzle__tile_hide');
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
            this.audio.currentTime = 0;
            this.audio.play();
        }
        this.checkWin();
    }

    checkWin() {
        for (let i = 0; i < this.size; i += 1) {
            if (this.arrTiles[i].textContent !== this.arrTiles[i].style.order) {
                return;
            }
        }
        this.createWinPopUp();
        this.stopTimer();
    }

    createWinPopUp() {
        const popUp = document.createElement('div');
        const content = `
            <div class='pop-up__content'>
                Ура! 
                <div class='pop-up__time'>
                   Вы решили головоломку за <span class='time-counter'>${addZero(this.min)}:${addZero(this.sec)}</span> 
                </div> 
                <div class='pop-up__moves'>
                   и <span class='moves-counter'>${this.movesAmount}</span> хода(-ов)
                </div> 
            </div>
        `;
        popUp.classList.add('pop-up');
        popUp.insertAdjacentHTML('afterbegin', content);

        document.body.append(popUp);
        setTimeout(() => {
            popUp.classList.add('pop-up_visible');
        }, 0);
    }

    shuffleTiles() {
        for (let i = this.size - 2; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = this.arrTiles[i].style.order;

            this.arrTiles[i].style.order = this.arrTiles[j].style.order;
            this.arrTiles[j].style.order = tmp;
        }

        if (this.IsUnsolvable()) {
            this.shuffleTiles();
        }
    }

    IsUnsolvable() {
        const orderOfTiles = this.arrTiles
            .slice()
            .sort((a, b) => a.style.order - b.style.order);
        let numberOfPairs = 0;
        for (let i = 0; i < this.size - 1; i += 1) {
            for (let j = i + 1; j < this.size - 1; j += 1) {
                if (parseInt(orderOfTiles[i].textContent, 10) >
                    parseInt(orderOfTiles[j].textContent, 10)) {
                    numberOfPairs += 1;
                }
            }
        }

        return (numberOfPairs % 2 !== 0);
    }

    swapLast() {
        const orderOfTiles = this.arrTiles
            .slice()
            .sort((a, b) => a.style.order - b.style.order);

        for (let i = 0; i < this.size - 1; i += 1) {
            if (orderOfTiles[i].textContent === this.size.toString()) {
                const tmp = orderOfTiles[i].style.order;
                orderOfTiles[i].style.order = orderOfTiles[this.size - 1].style.order;
                orderOfTiles[this.size - 1].style.order = tmp;
            }
        }
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
        this.time.textContent = 'Time 00:00';
    }

    pauseTimer() {
        clearInterval(this.timerId);
    }

    createMenu(puzzleMenu, tiles) {
        const pause = document.createElement('span');
        const menuBar = document.createElement('div');
        const restartButton = document.createElement('span');
        const soundButton = document.createElement('span');
        const chooseSizeField = `
        <div class="size-option">
            <label class="size-option__label">Field size</label>
            <select class="size-option__select">
                    <option value="9" class="select-option">3x3</option>
                    <option value="16" class="select-option" selected>4x4</option>
                    <option value ="25" class ="select-option">5x5</option>
                    <option value="36" class="select-option">6x6</option>
                    <option value="49" class="select-option">7x7</option>
                    <option value="64" class="select-option">8x8</option>
            </select>
        </div>
        `;

        pause.className = 'pause';
        pause.textContent = 'Pause game';
        pause.addEventListener('click', this.toggleMenu.bind(this, menuBar));

        menuBar.classList.add('menuBar');

        restartButton.classList.add('restart');
        restartButton.textContent = 'New game';
        restartButton.addEventListener('click', startNewGame.bind(null, this, menuBar));

        soundButton.classList.add('sound-toggle-btn');

        soundButton.textContent = JSON.parse(localStorage.getItem('audioMuted')) ?
            'Sound: off' :
            'Sound: on';

        soundButton.addEventListener('click', this.toggleSound.bind(this, soundButton));

        menuBar.append(restartButton, soundButton);
        menuBar.insertAdjacentHTML('beforeend', chooseSizeField);
        puzzleMenu.append(pause);
        tiles.append(menuBar);
    }

    toggleMenu(menuBar) {
        if (menuBar.classList.contains('menuBar_animated')) {
            this.initTimer();
            menuBar.classList.remove('menuBar_animated');
            menuBar.classList.add('menuBar_animated-reverse');
        } else {
            this.pauseTimer();
            menuBar.classList.remove('menuBar_animated-reverse');
            menuBar.classList.add('menuBar_animated');
        }
    }

    toggleSound(soundButton) {
        this.audio.muted = !this.audio.muted;
        soundButton.textContent = this.audio.muted ? 'Sound: off' :
            'Sound: on';
        localStorage.setItem('audioMuted', JSON.stringify(this.audio.muted));
    }
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function startNewGame(field, menuBar) {
    const chosenSize = parseInt(document.querySelector('.size-option__select').value, 10);
    field.puzzleField.remove();
    const newField = new Field(chosenSize);
    newField.createField();
    menuBar.classList.remove('menuBar_animated');
}