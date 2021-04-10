import TileFactory from './TileFactory';
import Constants from './Constants';

const defaultSize = Constants.getDefaultSize();

export default class Puzzle {
  constructor(parentNode) {
    this.node = document.createElement('div');
    this.tiles = [];
    this.size = defaultSize;
    this.mediator = null;
    this.parentNode = parentNode;
    this.node.className = 'puzzle__tiles';
    this.parentNode.append(this.node);
    // заменить на eventLitener

    this.node.onclick = (event) => {
      const clickedTile = this.getClickedTile(event.target);

      if (clickedTile && this.isCanBeMoved(clickedTile)) {
        /// вынести в функцию
        const delta = clickedTile.getDelta(this.emptyTile);
        clickedTile.node.style.transition = 'transform 0.17s ease-out';
        clickedTile.node.style.transform = `translate(${delta.x}px, ${delta.y}px)`;
      }
    };

    this.node.ontransitionend = (event) => {
      // вынести в функцию
      const clickedTile = this.getClickedTile(event.target);
      clickedTile.move(this.emptyTile); // swap orders

      this.mediator.notify(this, 'moveTile');
    };
  }

  addSizeModifier(size) {
    const sizeModifier = Constants.getSizeByValue(size);
    this.node.classList.add(`puzzle__tiles_${sizeModifier}`);
  }

  addTile(tile) {
    this.tiles.push(tile);
  }

  getClickedTile(target) {
    return this.tiles.find((tile) => tile.node === target);
  }

  launch(size) {
    this.size = size; /// для дебага,потом убрать
    const factory = new TileFactory();
    const emptyTileNumber = this.size;

    for (let currentTileNumber = 1; currentTileNumber < this.size; currentTileNumber++) {
      const tile = factory.create(currentTileNumber);
      this.addTile(tile);
      this.node.append(tile.node);
    }
    this.emptyTile = factory.create(emptyTileNumber, 'empty');
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
      for (let j = 0; j < i; ++j) {
        if (tilesSortedByOrder[j].number > tilesSortedByOrder[i].number) {
          numberOfPairs++;
        }
      }
    }

    return numberOfPairs % 2 !== 0;
  }
}
