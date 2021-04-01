export default class Constants {
  /// переименовать обьект если останется без изменений
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

  static getDefaultSize() {
    return this.fieldsInfo['4x4'];
  }
}
