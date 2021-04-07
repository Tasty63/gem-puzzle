export default class GameManager {
  constructor(...components) {
    this.components = components;

    this.components.forEach((component) => this.addManagerToComponent(component));
  }

  addManagerToComponent(component) {
    component.manager = this;
  }

  notify(sender, event) {}
}
