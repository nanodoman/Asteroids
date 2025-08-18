class Game {
  constructor() {
    this.width = 800;
    this.height = 600;
    this.limit = 0;
    this.frame = 0;
    this.state = 'play';
    this.debug = false;
    this.spawnTreshold = 100;
    this.then = 0;
    this.ctx = this.getContext();
    this.entities = new Map();
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
      this.frame++;

      this.ctx.clearRect(this.width * -0.5, this.height * -0.5, this.width, this.height);

      this.spawnAsteroid();

      this.entities.forEach((entity, id) => {
        entity.tick();
        this.borderPassCheck(entity);
        this.ttlCheck(entity, id);
        this.collisionCheck(entity, id);
        entity.draw();
      });
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  addEntity(entity) {
    if (entity instanceof Entity) {
      this.entities.set(this.getUId(), entity);
    } else {
      throw new Error('not an entity');
    }
  }

  removeEntity(id) {
    this.entities.delete(id);
  }

  tick() {}

  init() {
    this.ctx.transform(1, 0, 0, 1, this.width * 0.5, this.height * 0.5);
    this.loop();
    this.respawn();
  }

  getUId() {
    let id;

    do {
      id = Math.random().toString().substring(2);
    } while (this.entities.has(id));

    return id;
  }

  respawn() {
    if (this.entities.values().some((entity) => entity instanceof Ship)) return;
    this.addEntity(new Ship(0, 0, 10));
  }

  borderPassCheck(entity) {
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
  }

  ttlCheck(entity, id) {
    if (entity?.ttl < 0) {
      this.removeEntity(id);
    }
  }

  collisionCheck(entity, id) {
    /* TEMP */
    this.entities.forEach((otherEntity, otherId) => {
      if (id === otherId) return;

      const entityType = entity.constructor.name;
      const otherType = otherEntity.constructor.name;
      const collision = entity.collidesWith(otherEntity);

      if (!collision) return;

      if (
        (entityType === 'Asteroid' && otherType === 'Ship') ||
        (entityType === 'Rocket' && otherType === 'Asteroid') ||
        (entityType === 'Ship' && otherType === 'Asteroid')
      ) {
        this.removeEntity(id);
        this.removeEntity(otherId);
      }
    });
  }

  spawnAsteroid() {
    if (this.frame % this.spawnTreshold !== 0) return;

    const x = this.width * 0.5 * (Math.random() - 0.5 >= 0 ? 1 : -1);
    const y = this.height * 0.5 * (Math.random() - 0.5 >= 0 ? 1 : -1);
    this.addEntity(new Asteroid(x, y, 16));
  }
}
