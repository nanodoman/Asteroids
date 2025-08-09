class Game {
  constructor() {
    this.limit = 60;
    this.frame = 0;
    this.state = 'play';
    this.then = 0;
    this.ctx = this.getContext();
    this.entities = [];
    this.init();
  }

  getContext() {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    return ctx;
  }

  loop(now) {
    const frameCap = now - this.then < this.limit;
    const isPlaying = this.state === 'play';

    if (!frameCap && isPlaying) {
      this.then = now;

      this.ctx.clearRect(0, 0, 800, 600);

      this.render();

      // console.count('frame');
      this.frame++;
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  render() {
    this.entities.forEach((entity) => {
      // entity.x++;
      // entity.y++;
      entity.draw();
    });
  }

  init() {
    this.loop();
  }
}
