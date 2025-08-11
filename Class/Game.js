class Game {
  constructor() {
    this.limit = 0;
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

      // this.tick();

      this.entities.forEach((entity, index) => {
        entity.tick();
        entity.draw();
        if (entity?.ttl <= 0) {
          this.entities.splice(index, 1);
        }
      });

      // console.count('frame');
      this.frame++;
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  tick() {}

  init() {
    this.loop();
  }
}
