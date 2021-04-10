import DefaultTile from './Tile';
import EmptyTile from './EmptyTile';

export default class TileFactory {
  static list = {
    default: DefaultTile,
    empty: EmptyTile,
  };

  create(index, type = 'defualt', image) {
    const Tile = TileFactory.list[type] || TileFactory.list.default;
    const node = document.createElement('button');
    const tile = new Tile(node, index, image);

    return tile;
  }
}
