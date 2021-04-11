export default class GameMediator {
  constructor(Menu, Puzzle, PopUp) {
    this.menu = Menu;
    this.puzzle = Puzzle;
    this.popUp = PopUp;

    this.addMediator(this.menu);
    this.addMediator(this.puzzle);
    this.addMediator(this.popUp);
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

    if (event === 'win') {
      this.popUp.render(sender.size);
    }
  }
}
