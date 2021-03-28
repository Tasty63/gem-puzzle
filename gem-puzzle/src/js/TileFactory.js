import Tile from './Tile';
import EmptyTile from './EmptyTile';

export default class TileFactory {
  static list = {
    default: Tile,
    empty: EmptyTile,
  };

  constructor(parentNode) {
    this.node = document.createElement('div');
    this.node.className = 'puzzle__tiles';
    parentNode.append(this.node);
  }

  create(number, background, type = 'default') {}
}
