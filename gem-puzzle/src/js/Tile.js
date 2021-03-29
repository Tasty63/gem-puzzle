export default class Tile {
  constructor(number, image) {
    this.node = document.createElement('button');
    this.number = number;
    this.image = image;

    this.node.textContent = number;
    this.node.style.order = number;
    this.node.className = 'puzzle__tile';
  }

  get order() {
    return this.node.style.order;
  }

  updateWidth() {
    this.width = this.node.offsetWidth;
  }

  setBackground() {
    /// размеры брать из коснстант туда же можно добавить width
    this.updateWidth();
    console.log(this.width);
    // const size = Math.sqrt(this.size);
    // const left = this.tileWidth * ((this.number - 1) % size);
    // const top = this.tileWidth * Math.floor((this.number - 1) / size);

    // tile.style.backgroundImage = `url('./gem-puzzle/assets/images/image${size}x${size}.jpg')`;
    // tile.style.backgroundSize = '530px 530px';
    // tile.style.backgroundPosition = `-${left}px -${top}px`;
  }

  move(to) {
    console.log('move move move');
  }
}
