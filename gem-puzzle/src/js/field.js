class Field {
  size3x3 = 9;
  size4x4 = 16;
  size5x5 = 25;
  size6x6 = 36;
  size7x7 = 49;
  size8x8 = 64;

  constructor(size) {
    this.size = size || size4x4;
  }
}
