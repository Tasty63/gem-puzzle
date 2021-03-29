export default class Constants {
  static fieldsInfo = {
    '3x3': 9,
    '4x4': 16,
    '5x5': 25,
    '6x6': 36,
    '7x7': 49,
    '8x8': 64,
  };

  static getSizeByValue(value) {
    return Object.keys(this.fieldsInfo).find((key) => this.fieldsInfo[key] === value);
  }
}
