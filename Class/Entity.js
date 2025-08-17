class Entity {
  constructor(x, y, radius, rotation = 0) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rotation = rotation;
    this.rotationSpeed = 1;
    this.speed = 1;
  }

  get angle() {
    return (this.rotation * Math.PI) / 180;
  }

  tick() {}

  draw(ctx = GAME.ctx) {
    const obj = new Path2D();
    obj.arc(this.x, this.y, this.radius, 0, Math.PI * 4);

    ctx.beginPath();
    ctx.fillStyle = '#6666';
    ctx.strokeStyle = '#fff';
    ctx.stroke(obj);
    ctx.fill(obj);
    ctx.closePath();
  }
}

class Rocket extends Entity {
  constructor(x, y, rotation) {
    super(x, y, 4, rotation);

    this.speed = 5;
    this.ttl = 200;
  }

  tick() {
    const dx = this.speed * Math.cos(this.angle);
    const dy = this.speed * Math.sin(this.angle);

    this.x += dx;
    this.y += dy;

    this.ttl--;
  }
}

class Asteroid extends Entity {
  constructor(x, y, radius) {
    super(x, y, radius);

    super.rotationSpeed = Math.random() - 0.5 * 2;
    this.dx = (Math.random() - 0.5) * 4;
    this.dy = (Math.random() - 0.5) * 4;
  }

  tick() {
    this.rotation += this.rotationSpeed;
    this.x += this.dx;
    this.y += this.dy;
  }

  draw(ctx = GAME.ctx) {
    // const model = new Path2D('M28 18L 24 24L 19 29L 10 26L 4 27L 0 20L 4 10L 16 2L 23 7L 30 9Z');
    const model = new Path2D(`
      M 12 2 
      L 8 8
      L 3 13
      L -6 10
      L -12 11
      L -16 4
      L -12 -6
      L 0 -14
      L 7 -9
      L 14 -7
      Z`);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.stroke(model);
    ctx.restore();
  }
}

class Ship extends Entity {
  constructor(x, y, radius) {
    super(x, y, radius);

    this.weaponReload = 0;
  }

  tick() {
    this.controlShip();
    if (this.weaponReload > 0) {
      this.weaponReload--;
    }
  }

  draw(ctx = GAME.ctx) {
    // const obj = new Path2D('M8 0 L -8 8 L -4 0 L -8 -8Z');
    const model = new Path2D(`
      M ${this.radius} 0
      L ${-this.radius} ${this.radius}
      L ${this.radius * -0.5} 0
      L ${-this.radius} ${-this.radius}
      Z`);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.stroke(model);
    ctx.restore();
  }

  controlShip() {
    if (INPUT.hasKey('ArrowUp')) this.throttle();
    if (INPUT.hasKey('ArrowLeft')) this.rotate(true);
    if (INPUT.hasKey('ArrowRight')) this.rotate();
    if (INPUT.hasKey('Space')) this.shoot();
  }

  throttle() {
    const dx = this.speed * Math.cos(this.angle);
    const dy = this.speed * Math.sin(this.angle);

    this.x += dx;
    this.y += dy;
  }

  rotate(reverse = false) {
    if (Math.abs(this.rotation) > 180) {
      const sign = Math.sign(this.rotation) * -1;
      this.rotation = 180 * sign;
    }

    this.rotation += this.rotationSpeed * reverse ? -1 : 1;
  }

  shoot() {
    if (this.weaponReload !== 0) return;
    const rocket = new Rocket(this.x, this.y, this.rotation);
    this.weaponReload = 25;
    GAME.entities.push(rocket);
  }
}
