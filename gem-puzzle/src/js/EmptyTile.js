export default class EmptyTile {
  constructor(number) {
    this.node = document.createElement('button');
    this.number = number;
    this.node.style.order = number;
    this.node.classList.add('puzzle__tile_empty');
  }

  get order() {
    return this.node.style.order;
  }

  set order(order) {
    this.node.style.order = order;
  }
}
