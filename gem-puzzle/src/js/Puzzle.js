import TileFactory from './TileFactory';

const size3x3 = 9;
const size4x4 = 16;
const size5x5 = 25;
const size6x6 = 36;
const size7x7 = 49;
const size8x8 = 64;

export default class Puzzle {
  constructor(parentNode) {
    this.node = document.createElement('div');
    this.node.className = 'puzzle__tiles';
    parentNode.append(this.node);
  }

  addClass(classModifier) {
    this.node.classList.add(`puzzle__tiles_${classModifier}`);
  }

  launch(size) {
    const factory = new TileFactory();

    for (let tileNumber = 1; tileNumber < size; tileNumber++) {
      const tile = factory.create(tileNumber);
      this.node.append(tile.node);
    }

    switch (size) {
      case size3x3:
        this.addClass('3x3');
        break;
      case size4x4:
        this.addClass('4x4');
        break;
      case size5x5:
        this.addClass('5x5');
        break;
      case size6x6:
        this.addClass('6x6');
        break;
      case size7x7:
        this.addClass('7x7');
        break;
      case size8x8:
        this.addClass('8x8');
        break;
      default:
        break;
    }
  }
}
