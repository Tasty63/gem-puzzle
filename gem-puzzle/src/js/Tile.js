export default class Tile {
  constructor(number, image) {
    this.node = document.createElement('button');
    this.node.textContent = number;
    this.node.style.order = number;
    this.node.className = 'puzzle__tile';

    this.number = number;
    this.image = image;
  }
}
