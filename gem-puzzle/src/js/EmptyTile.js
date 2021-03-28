export default class EmptyTile {
  constructor(number) {
    this.node = document.createElement('div');
    this.number = number;
    this.node.classList.add('puzzle__tile_empty');
  }
}
