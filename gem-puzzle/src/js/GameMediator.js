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
      this.menu.timer.start();
      this.menu.soundButton.playSound();
    }

    if (event === 'win') {
      const info = {
        moves: this.menu.counter.getMovesAmount(),
        seconds: this.menu.timer.getSeconds(),
        minutes: this.menu.timer.getMinutes(),
        size: sender.size,
      };

      this.popUp.render(info);
    }

    if (event === 'newGame') {
      this.popUp.hide();
      this.menu.toggle();
      this.puzzle.launch(sender.size);
      this.menu.counter.reset();
      this.menu.timer.stop();
    }
  }
}
