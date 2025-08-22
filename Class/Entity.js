class Entity {
  constructor(x, y, radius, rotation = -90) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rotation = rotation;
    this.rotationSpeed = 1;
    this.topSpeed = 1;
    this.model = new Path2D(`
      M ${-this.radius} 0
      A ${this.radius} ${this.radius} 0 0 0 ${this.radius} 0
      M ${-this.radius} 0
      A ${this.radius} ${this.radius} 0 0 1 ${this.radius} 0
    `);
    this.isColliding = false;
  }

  get angle() {
    return (this.rotation * Math.PI) / 180;
  }

  tick() {}

  draw(ctx = GAME.ctx) {
    ctx.save();
    if (GAME.debug === true) {
      const hitbox = new Path2D();
      hitbox.arc(this.x, this.y, this.radius, 0, Math.PI * 4);
      ctx.strokeStyle = this.isColliding ? '#f7b' : '#48b';
      ctx.stroke(hitbox);
    }
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.strokeStyle = '#fff';
    ctx.stroke(this.model);
    ctx.fillStyle = '#6666';
    ctx.fill(this.model);
    ctx.restore();
  }

  collidesWith(other) {
    const distance = Math.hypot(this.x - other.x, this.y - other.y);
    return (this.isColliding = distance < this.radius + other.radius);
  }
}

class Rocket extends Entity {
  constructor(x, y, rotation, owner) {
    super(x, y, 4, rotation);
    super.topSpeed = 5;
    super.model = MODEL.ROCKET;
    this.owner = owner;
    this.ttl = 200;
  }

  tick() {
    const dx = this.topSpeed * Math.cos(this.angle);
    const dy = this.topSpeed * Math.sin(this.angle);

    this.x += dx;
    this.y += dy;

    this.ttl--;
  }
}

class Asteroid extends Entity {
  constructor(x, y, radius) {
    super(x, y, radius);
    super.rotationSpeed = Math.random() - 0.5 * 2;
    super.model = MODEL.ASTEROID;
    this.dx = (Math.random() - 0.5) * 4;
    this.dy = (Math.random() - 0.5) * 4;
  }

  tick() {
    this.rotation += this.rotationSpeed;
    this.x += this.dx;
    this.y += this.dy;
  }
}

class Ship extends Entity {
  constructor(x, y, radius, controlSet) {
    super(x, y, radius);
    super.rotationSpeed = 2;
    super.topSpeed = 2;
    super.model = new Path2D(`
      M ${this.radius} 0
      L ${-this.radius} ${this.radius}
      L ${this.radius * -0.5} 0
      L ${-this.radius} ${-this.radius}
      Z
    `);
    this.controlSet = controlSet;
    this.acceleration = 0.1;
    this.isthrusting = false;
    this.weaponReload = 0;
    this.dx = 0;
    this.dy = 0;
  }

  tick() {
    this.controlShip();
    if (this.weaponReload > 0) {
      this.weaponReload--;
    }

    this.x += this.dx;
    this.y += this.dy;

    const stopTreshold = 0.01;
    if (!this.isthrusting) {
      this.dx *= Math.abs(this.dx) <= stopTreshold ? 0 : 0.99;
      this.dy *= Math.abs(this.dx) <= stopTreshold ? 0 : 0.99;
    }
  }

  controlShip() {
    if (this.controlSet === 'player1') {
      INPUT.hasKey('KeyW') ? this.throttle() : (this.isthrusting = false);
      if (INPUT.hasKey('KeyA')) this.rotate(ROTATION.CCW);
      if (INPUT.hasKey('KeyD')) this.rotate(ROTATION.CW);
      if (INPUT.hasKey('KeyF')) this.shoot();
    } else if (this.controlSet === 'player2') {
      INPUT.hasKey('ArrowUp') ? this.throttle() : (this.isthrusting = false);
      if (INPUT.hasKey('ArrowLeft')) this.rotate(ROTATION.CCW);
      if (INPUT.hasKey('ArrowRight')) this.rotate(ROTATION.CW);
      if (INPUT.hasKey('Slash')) this.shoot();
    }
  }

  throttle() {
    this.isthrusting = true;
    const thrustX = Math.cos(this.angle) * this.acceleration;
    const thrustY = Math.sin(this.angle) * this.acceleration;

    this.dx += thrustX;
    this.dy += thrustY;

    const speed = Math.hypot(this.dx, this.dy);
    if (speed > this.topSpeed) {
      const scale = this.topSpeed / speed;
      this.dx *= scale;
      this.dy *= scale;
    }
  }

  rotate(direction) {
    if (Math.abs(this.rotation) > 180) {
      const sign = Math.sign(this.rotation) * -1;
      this.rotation = 180 * sign;
    }

    this.rotation += this.rotationSpeed * direction;
  }

  shoot() {
    if (this.weaponReload !== 0) return;
    const rocket = new Rocket(this.x, this.y, this.rotation, this.controlSet);
    this.weaponReload = 25;
    GAME.addEntity(rocket);
  }
}
