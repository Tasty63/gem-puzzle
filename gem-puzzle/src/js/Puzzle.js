import TileFactory from './TileFactory';
import Constants from './Constants';

const defaultSize = Constants.fieldsInfo['4x4'];

export default class Puzzle {
  // мб в конце добавить factory сюда и тут же создавать empty tile
  constructor(parentNode) {
    this.node = document.createElement('div');
    this.puzzleTiles = [];
    this.size = defaultSize;

    this.node.className = 'puzzle__tiles';
    parentNode.append(this.node);

    this.node.onclick = (event) => {
      const target = event.target;
      const clickedTile = this.getClickedTile(target);

      if (clickedTile && this.isCanBeMoved(clickedTile)) {
        clickedTile.move(this.emptyTile); // попытаться зарефакорить и избавиться от сет таймаута
        this.puzzleTiles.forEach((tile) => {
          tile.node.disabled = true;
        });

        setTimeout(() => {
          clickedTile.setReverseAnimation();
          this.puzzleTiles.forEach((tile) => {
            tile.node.disabled = false;
          });
        }, 0);
      }
    };
  }

  addSizeModifier(size) {
    const sizeModifier = Constants.getSizeByValue(size);
    this.node.classList.add(`puzzle__tiles_${sizeModifier}`);
  }

  addTile(tile) {
    this.puzzleTiles.push(tile);
  }

  getClickedTile(target) {
    return this.puzzleTiles.find((tile) => tile.node === target);
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

    // this.shuffleTiles();
  }

  getTilePosition(tile) {
    const fieldWidth = Math.sqrt(this.size);

    return {
      x: (tile.order - 1) % fieldWidth,
      y: Math.floor((tile.order - 1) / fieldWidth),
    };
  }

  getDistance(tile, secondTile) {
    // мб потом избавиться от (tile.order - 1)
    const tilePosition = this.getTilePosition(tile);
    const secondTilePosition = this.getTilePosition(secondTile);

    return Math.abs(tilePosition.x - secondTilePosition.x) + Math.abs(tilePosition.y - secondTilePosition.y);
  }

  isCanBeMoved(tile) {
    return this.getDistance(tile, this.emptyTile) === 1;
  }

  // shuffleTiles() {
  //   /// зарефакторить
  //   const withotEmptyTile = this.size - 2;
  //   for (let i = withotEmptyTile; i > 0; i--) {
  //     const rand = Math.floor(Math.random() * (i + 1));
  //     const tmp = this.puzzleTiles[i].style.order;

  //     this.puzzleTiles[i].style.order = this.puzzleTiles[rand].style.order;
  //     this.puzzleTiles[rand].style.order = tmp;
  //   }

  //   if (this.isUnsolvable()) {
  //     this.shuffleTiles();
  //   }
  // }

  // isUnsolvable() {
  //   /// и это тоже
  //   const orderOfTiles =
  // this.puzzleTiles.slice().sort((value, nextValue) => value.style.order - nextValue.style.order);
  //   let numberOfPairs = 0;
  //   for (let i = 0; i < this.size - 1; i++) {
  //     for (let j = i + 1; j < this.size - 1; j += 1) {
  //       if (parseInt(orderOfTiles[i].textContent, 10) > parseInt(orderOfTiles[j].textContent, 10)) {
  //         numberOfPairs += 1;
  //       }
  //     }
  //   }

  //   return numberOfPairs % 2 !== 0;
  // }
}
