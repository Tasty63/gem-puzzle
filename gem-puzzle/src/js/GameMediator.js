export default class GameMediator {
  constructor(Menu, Puzzle) {
    this.menu = Menu;
    this.puzzle = Puzzle;

    this.addMediator(this.menu);
    this.addMediator(this.puzzle);
  }

  addMediator(component) {
    component.mediator = this;
  }

  notify(sender, event) {
    if (event === 'moveTile') {
      this.menu.counter.update();
      this.menu.timer.update();
      this.menu.soundButton.playSound();
    }
  }
}
