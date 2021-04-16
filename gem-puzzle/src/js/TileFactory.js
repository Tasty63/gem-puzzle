import DefaultTile from './Tile';
import EmptyTile from './EmptyTile';
import Constants from './Constants';

export default class TileFactory {
  static list = {
    default: DefaultTile,
    empty: EmptyTile,
  };

  setImage(tile, fieldSize) {
    const sizeName = Constants.getSizeByValue(fieldSize);
    const tileSize = Constants.getTileSize(sizeName);
    const fieldWidth = Math.sqrt(fieldSize);

    const left = tileSize * ((tile.index - 1) % fieldWidth);
    const top = tileSize * Math.floor((tile.index - 1) / fieldWidth);
    const puzzleSize = fieldWidth * tileSize;

    tile.node.style.backgroundImage = `url('./gem-puzzle/assets/images/image${sizeName}.jpg')`;
    tile.node.style.backgroundSize = `${puzzleSize}px`;
    tile.node.style.backgroundPosition = `-${left}px -${top}px`;
  }

  create(index, type, fieldSize) {
    const Tile = TileFactory.list[type] || TileFactory.list.default;
    const tile = new Tile(index);

    if (type === 'default') {
      this.setImage(tile, fieldSize);
    }

    return tile;
  }
}
