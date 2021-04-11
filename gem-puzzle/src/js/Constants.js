export default class Constants {
  static fieldSizes = {
    '3x3': 9,
    '4x4': 16,
    '5x5': 25,
    '6x6': 36,
    '7x7': 49,
    '8x8': 64,
  };

  static getSizeByValue(value) {
    return Object.keys(this.fieldSizes).find((key) => this.fieldSizes[key] === value);
  }

  static getDefaultSize() {
    return this.fieldSizes['4x4'];
  }

  static getSizes() {
    return Object.entries(this.fieldSizes);
  }
}
