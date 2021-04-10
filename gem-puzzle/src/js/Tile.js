import Draggable from './Draggable';

export default class Tile extends Draggable {
  constructor(node, index, image) {
    super(node);
    this.node = node;
    this.number = index;
    this.image = image;
    this.node.textContent = index;
    this.node.style.order = index;
    this.node.className = 'puzzle__tile';
  }

  get order() {
    return this.node.style.order;
  }

  set order(order) {
    this.node.style.order = order;
  }

  getDelta(tile) {
    // мб вынести в puzzle
    return {
      x: Math.floor(tile.node.offsetLeft) - Math.floor(this.node.offsetLeft),
      y: Math.floor(tile.node.offsetTop) - Math.floor(this.node.offsetTop),
    };
  }

  move(to) {
    const moveFromOrder = parseInt(this.order, 10);
    const moveToOrder = parseInt(to.order, 10);

    this.order = moveToOrder;
    to.order = moveFromOrder;

    this.node.style.transition = 'transform 0s';
    this.node.style.transform = 'translate(0)';

    const event = new CustomEvent('tileMove', { bubbles: true });
    this.node.dispatchEvent(event);
  }
}
