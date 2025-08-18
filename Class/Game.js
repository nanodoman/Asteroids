class Game {
  constructor() {
    this.width = 800;
    this.height = 600;
    this.limit = 0;
    this.frame = 0;
    this.state = 'play';
    this.debug = false;
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

      this.ctx.clearRect(this.width * -0.5, this.height * -0.5, this.width, this.height);

      // this.tick();

      this.entities.forEach((entity, index) => {
        if (entity.x >= this.width * 0.5 + entity.radius) {
          entity.x -= this.width + entity.radius * 2;
        }
        if (entity.x < this.width * -0.5 - entity.radius) {
          entity.x += this.width + entity.radius * 2;
        }
        if (entity.y >= this.height * 0.5 + entity.radius) {
          entity.y -= this.height + entity.radius * 2;
        }
        if (entity.y < this.height * -0.5 - entity.radius) {
          entity.y += this.height + entity.radius * 2;
        }
        entity.tick();
        entity.draw();
        if (entity?.ttl <= 0) {
          this.entities.splice(index, 1);
        }
        /* TEMP */
        this.entities.forEach((entity2, index2) => {
          if (index !== index2) {
            entity.collidesWith(entity2);
          }
        });
      });

      // console.count('frame');
      this.frame++;
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  tick() {}

  init() {
    this.ctx.transform(1, 0, 0, 1, this.width * 0.5, this.height * 0.5);
    this.loop();
  }
}
