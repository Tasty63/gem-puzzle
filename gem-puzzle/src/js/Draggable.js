export default class Dragabble {
  constructor(node) {
    this.node = node;
    this.node.draggable = true;
    this.node.addEventListener('dragstart', (event) => this.dragStart(event));
    this.node.addEventListener('dragend', () => this.node.classList.remove('puzzle__tile_hide'));
  }

  dragStart(event) {
    const target = event.target;
    this.dragStartEvent = event;
    target.classList.add('puzzle__tile_hide');
  }
}
