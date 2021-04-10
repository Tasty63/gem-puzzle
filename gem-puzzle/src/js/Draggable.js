export default class Dragabble {
  constructor(node) {
    this.node = node;
    this.node.draggable = true;

    this.node.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('draggedTileOrder', this.order);
      event.target.classList.add('puzzle__tile_hide');
    });
    this.node.addEventListener('dragend', () => this.node.classList.remove('puzzle__tile_hide'));
  }
}
