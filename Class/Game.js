class Game {
  constructor() {
    this.limit = 60;
    this.frame = 0;
    this.state = 'play';
    this.then = 0;
    this.loop();
  }

  loop = () => {
    const frameCap = window.performance.now() - this.then < this.limit;

    if (this.state !== 'play') return;

    if (!frameCap) {
      this.then = window.performance.now();

      console.count('frame');
      this.frame++;
    }

    requestAnimationFrame(this.loop);
  };
}
