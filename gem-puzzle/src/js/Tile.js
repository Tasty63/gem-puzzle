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

  set order(order) {
    this.node.style.order = order;
  }

  updateWidth() {
    this.width = this.node.offsetWidth;
  }

  getDelta(tile) {
    return {
      x: Math.floor(this.node.offsetLeft) - Math.floor(tile.node.offsetLeft),
      y: Math.floor(this.node.offsetTop) - Math.floor(tile.node.offsetTop),
    };
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

  setReverseAnimation() {
    this.node.style.transform = '';
    this.node.style.transition = 'transform 0.3s';
  }

  animateMoving(delta) {
    this.node.style.transform = `translate(${delta.x}px, ${delta.y}px)`;
    this.node.style.transition = 'transform 0s';
  }

  // animateMoving(target, deltaX, deltaY) {
  //   target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  //   target.style.transition = 'transform 0s';

  //   this.arrTiles.forEach((tile) => {
  //     tile.disabled = true;
  //   });

  //   setTimeout(() => {
  //     target.style.transform = '';
  //     target.style.transition = 'transform 0.3s';
  //     this.arrTiles.forEach((tile) => {
  //       tile.disabled = false;
  //     });
  //   }, 0);
  // }

  move(to) {
    const moveFromOrder = parseInt(this.order, 10);
    const moveToOrder = parseInt(to.order, 10);

    this.order = moveToOrder;
    to.order = moveFromOrder;
  }
}
