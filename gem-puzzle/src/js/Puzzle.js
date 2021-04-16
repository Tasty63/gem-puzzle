import TileFactory from './TileFactory';
import Constants from './Constants';

const defaultSize = Constants.getDefaultSize();
// пофиксить размер бара добавить close

export default class Puzzle {
  constructor(parentNode) {
    this.node = document.createElement('div');
    this.tiles = [];
    this.size = defaultSize;
    this.mediator = null;
    this.parentNode = parentNode;
    this.node.className = 'puzzle__tiles';
    this.parentNode.append(this.node);

    this.node.addEventListener('click', (event) => {
      const clickedTile = this.getClickedTile(event.target);
      if (clickedTile && this.isCanBeMoved(clickedTile)) {
        /// вынести в функцию
        const delta = clickedTile.getDelta(this.emptyTile);
        clickedTile.node.style.transition = 'transform 0.17s ease-out';
        clickedTile.node.style.transform = `translate(${delta.x}px, ${delta.y}px)`;
      }
    });

    this.node.addEventListener('drop', (event) => {
      const draggedTileOrder = event.dataTransfer.getData('draggedTileOrder');
      const draggedTile = this.getTileByOrder(draggedTileOrder);

      draggedTile.move(this.emptyTile);
      this.mediator.notify(this, 'moveTile');
      this.checkWin();
    });

    this.node.addEventListener('transitionend', (event) => {
      // вынести в функцию
      const clickedTile = this.getClickedTile(event.target);
      clickedTile.move(this.emptyTile);
      this.mediator.notify(this, 'moveTile');
      this.mediator.notify(this, 'win');
      this.checkWin();
    });
  }

  setImage(tile) {
    const sizeName = Constants.getSizeByValue(this.size);
    const tileSize = Constants.getTileSize(sizeName);
    const sideSize = Math.sqrt(this.size);
    const left = tileSize * ((tile.index - 1) % sideSize);
    const top = tileSize * Math.floor((tile.index - 1) / sideSize);
    const puzzleSize = sideSize * tileSize;

    tile.node.style.backgroundImage = `url('./gem-puzzle/assets/images/image${sizeName}.jpg')`;
    tile.node.style.backgroundSize = `${puzzleSize}px`;
    tile.node.style.backgroundPosition = `-${left}px -${top}px`;
  }

  addSizeModifier(size) {
    const sizeModifier = Constants.getSizeByValue(size);
    this.node.className = 'puzzle__tiles';
    this.node.classList.add(`puzzle__tiles_${sizeModifier}`);
  }

  addTile(tile) {
    this.tiles.push(tile);
  }

  getClickedTile(target) {
    return this.tiles.find((tile) => tile.node === target);
  }

  getTileByOrder(order) {
    return this.tiles.find((tile) => tile.order === order);
  }

  launch(size) {
    this.tiles.forEach((tile) => tile.node.remove());
    this.tiles = [];

    this.size = size || defaultSize;
    const factory = new TileFactory();
    const emptyTileIndex = this.size;

    for (let tileIndex = 1; tileIndex < this.size; tileIndex++) {
      const tile = factory.create(tileIndex);
      this.setImage(tile);
      this.addTile(tile);
      this.node.append(tile.node);
    }
    this.emptyTile = factory.create(emptyTileIndex, 'empty');

    this.addTile(this.emptyTile);
    this.node.append(this.emptyTile.node);
    this.addSizeModifier(this.size);

    this.shuffleTiles();
  }

  getTilePosition(tile) {
    // мб вынести в тайл(tile, fieldWidth)
    const fieldWidth = Math.sqrt(this.size);

    return {
      x: (tile.order - 1) % fieldWidth,
      y: Math.floor((tile.order - 1) / fieldWidth),
    };
  }

  getDistance(tile, secondTile) {
    const tilePosition = this.getTilePosition(tile);
    const secondTilePosition = this.getTilePosition(secondTile);

    return Math.abs(tilePosition.x - secondTilePosition.x) + Math.abs(tilePosition.y - secondTilePosition.y);
  }

  isCanBeMoved(tile) {
    return this.getDistance(tile, this.emptyTile) === 1;
  }

  shuffleTiles() {
    const withoutEmptyTile = this.size - 2;
    for (let i = withoutEmptyTile; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const tileOrder = this.tiles[i].order;

      this.tiles[i].order = this.tiles[randomIndex].order;
      this.tiles[randomIndex].order = tileOrder;
    }

    if (this.isUnsolvable()) {
      this.shuffleTiles();
    }
  }

  isUnsolvable() {
    const tilesSortedByOrder = this.tiles.slice().sort((tile, nextTile) => tile.order - nextTile.order);
    let numberOfPairs = 0;

    for (let i = 0; i < this.size; ++i) {
      for (let j = 0; j < i; j++) {
        if (tilesSortedByOrder[j].index > tilesSortedByOrder[i].index) {
          numberOfPairs++;
        }
      }
    }

    return numberOfPairs % 2 !== 0;
  }

  checkWin() {
    for (let i = 0; i < this.tiles.length; i++) {
      if (parseInt(this.tiles[i].order, 10) !== this.tiles[i].index) {
        return;
      }
    }
    this.mediator.notify(this, 'win');
  }
}
