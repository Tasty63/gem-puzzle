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
      x: Math.floor(tile.node.offsetLeft) - Math.floor(this.node.offsetLeft),
      y: Math.floor(tile.node.offsetTop) - Math.floor(this.node.offsetTop),
    };
  }

  setReverseAnimation() {
    this.node.style.transform = '';
    this.node.style.transition = 'transform 0.3s';
  }

  animateMoving(delta) {
    this.node.style.transform = `translate(${delta.x}px, ${delta.y}px)`;
    this.node.style.transition = 'transform 0s';
  }

  move(to) {
    const moveFromOrder = parseInt(this.order, 10);
    const moveToOrder = parseInt(to.order, 10);

    this.order = moveToOrder;
    to.order = moveFromOrder;

    this.node.style.transition = 'transform 0s';
    this.node.style.transform = 'translate(0)';
  }
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
