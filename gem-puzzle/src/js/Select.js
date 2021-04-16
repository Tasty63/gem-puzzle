import Constants from './Constants';

export default class Select {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.node = document.createElement('div');

    this.node.className = 'size-option';

    this.render();
  }

  render() {
    const sizes = Constants.getSizes();

    this.label = document.createElement('label');
    this.select = document.createElement('select');

    this.select.className = 'size-option__select';
    this.label.className = 'size-option__label';
    this.label.textContent = 'Field size';

    sizes.forEach((size) => {
      const sizeName = size[0];
      const sizeValue = size[1];
      const option = document.createElement('option');

      option.className = 'select-option';
      option.value = sizeValue;
      option.textContent = sizeName;

      if (sizeValue === Constants.getDefaultSize()) {
        option.setAttribute('selected', true);
      }

      this.select.append(option);
    });

    this.node.append(this.label);
    this.node.append(this.select);
    this.parentNode.append(this.node);
  }

  getChosenSize() {
    return parseInt(this.select.value, 10);
  }
}
