export default class EmptyTile {
  constructor(index) {
    this.node = document.createElement('button');
    this.index = index;
    this.node.style.order = index;
    this.node.classList.add('puzzle__tile_empty');
    this.node.addEventListener('dragover', (event) => event.preventDefault());
  }

  get order() {
    return this.node.style.order;
  }

  set order(order) {
    this.node.style.order = order;
  }
}
