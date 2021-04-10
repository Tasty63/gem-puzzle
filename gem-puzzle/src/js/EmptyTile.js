export default class EmptyTile {
  constructor(node, index) {
    this.node = node;
    this.number = index;
    this.node.style.order = index;
    this.node.classList.add('puzzle__tile_empty');
    this.node.addEventListener('dragover', (event) => event.preventDefault());
    this.node.addEventListener('drop', () => console.log('dropit'));
  }

  get order() {
    return this.node.style.order;
  }

  set order(order) {
    this.node.style.order = order;
  }
}

// this.emptyTile.addEventListener('drop', () => this.moveTile(this.dragStartEvent));
// this.emptyTile.addEventListener('dragover', (event) => event.preventDefault());
