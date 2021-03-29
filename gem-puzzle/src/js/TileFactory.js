import defaultTile from './Tile';
import EmptyTile from './EmptyTile';

export default class TileFactory {
  static list = {
    default: defaultTile,
    empty: EmptyTile,
  };

  create(number, type = 'defualt', image) {
    const Tile = TileFactory.list[type] || TileFactory.list.default;
    const tile = new Tile(number, image);
    /// Tile Move

    return tile;
  }
}
