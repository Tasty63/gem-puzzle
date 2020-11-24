const isMobile =
    /Mobile|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator
        .userAgent);
const size3x3 = 9;
const size4x4 = 16;
const size5x5 = 25;
const size6x6 = 36;
const size7x7 = 49;
const size8x8 = 64;

export default class Field {
    constructor(size) {
        this.size = size || size4x4;
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
            './gem-puzzle/assets/sounds/moving.mp3';

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

        const setTilesSize = (width, classModifier) => {
            puzzleTiles.classList.add(classModifier);
            this.tileWidth = width;
        };

        for (let tileNum = 1; tileNum <= this.size; tileNum++) {
            const tile = document.createElement('button');
            const size = Math.sqrt(this.size);
            const left = this.tileWidth * ((tileNum - 1) % size);
            const top = this.tileWidth * (Math.floor((tileNum - 1) / size));

            tile.className = 'puzzle__tile';
            tile.textContent = tileNum;
            tile.style.order = tileNum;
            tile.style.backgroundImage =
                `url('./gem-puzzle/assets/images/image${size}x${size}.jpg')`;
            tile.style.backgroundSize = '530px 530px';
            tile.style.backgroundPosition = `-${left}px -${top}px`;
            if (!isMobile) {
                tile.draggable = true;
            }
            if (tileNum === this.size) {
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
            switch (this.size) {
                case size8x8:
                    setTilesSize(65, 'puzzle__tiles_8x8');
                    break;
                case size7x7:
                    setTilesSize(74, 'puzzle__tiles_7x7');
                    break;
                case size6x6:
                    setTilesSize(86, 'puzzle__tiles_6x6');
                    break;
                case size5x5:
                    setTilesSize(103, 'puzzle__tiles_5x5');
                    break;
                case size4x4:
                    setTilesSize(129, 'puzzle__tiles_4x4');
                    break;
                case size3x3:
                    setTilesSize(172, 'puzzle__tiles_3x3');
                    break;
                default:
                    break;
            }
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
        const deltaX = Math.floor(target.getBoundingClientRect().left) -
            Math.floor(this.emptyTile.getBoundingClientRect().left);

        const deltaY = Math.floor(target.getBoundingClientRect().top) -
            Math.floor(this.emptyTile.getBoundingClientRect().top);

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
        for (let i = 0; i < this.size; i++) {
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
                <button class='pop-up__close-icon'>
                </button>
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
        const closeBtn = document.querySelector('.pop-up__close-icon');
        closeBtn.addEventListener('click', () => {
            popUp.remove();
            startNewGame.call(null, this);
        });
        setTimeout(() => {
            popUp.classList.add('pop-up_visible');
        }, 0);
    }

    shuffleTiles() {
        const withotEmptyTile = this.size - 2;
        for (let i = withotEmptyTile; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            const tmp = this.arrTiles[i].style.order;

            this.arrTiles[i].style.order = this.arrTiles[rand].style.order;
            this.arrTiles[rand].style.order = tmp;
        }

        if (this.isUnsolvable()) {
            this.shuffleTiles();
        }
    }

    isUnsolvable() {
        const orderOfTiles = this.arrTiles
            .slice()
            .sort((value, nextValue) => value.style.order - nextValue.style.order);
        let numberOfPairs = 0;
        for (let i = 0; i < this.size - 1; i++) {
            for (let j = i + 1; j < this.size - 1; j += 1) {
                if (parseInt(orderOfTiles[i].textContent, 10) >
                    parseInt(orderOfTiles[j].textContent, 10)) {
                    numberOfPairs += 1;
                }
            }
        }

        return (numberOfPairs % 2 !== 0);
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
        this.moves.textContent = `Moves ${++this.movesAmount}`;
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
        const closeButton = document.createElement('span');
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
        pause.textContent = 'Menu';
        pause.addEventListener('click', this.toggleMenu.bind(this, menuBar));

        menuBar.classList.add('menuBar', 'menuBar_animated-reverse');

        restartButton.classList.add('restart-btn');
        restartButton.textContent = 'New game';
        restartButton.addEventListener('click', startNewGame.bind(null, this, menuBar));

        soundButton.classList.add('sound-toggle-btn');
        soundButton.textContent = JSON.parse(localStorage.getItem('audioMuted')) ?
            'Sound: off' :
            'Sound: on';
        soundButton.addEventListener('click', this.toggleSound.bind(this, soundButton));

        closeButton.classList.add('close-btn');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', this.toggleMenu.bind(this, menuBar));

        menuBar.append(restartButton, soundButton);
        menuBar.insertAdjacentHTML('beforeend', chooseSizeField);
        menuBar.append(closeButton);
        puzzleMenu.append(pause);
        tiles.append(menuBar);
    }

    toggleMenu(menuBar) {
        this.toggleMenuClass(menuBar);
        if (menuBar.classList.contains('menuBar_animated')) {
            this.initTimer();
        } else {
            this.pauseTimer();
        }
    }

    toggleMenuClass(menuBar) {
        menuBar.classList.toggle('menuBar_animated-reverse');
        menuBar.classList.toggle('menuBar_animated');
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
    if (menuBar) {
        menuBar.classList.remove('menuBar_animated');
    }
}