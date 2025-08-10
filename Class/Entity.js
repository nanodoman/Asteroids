class Entity {
  constructor(x, y, radius, rotation = 0) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rotation = rotation;
  }

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

class Asteroid extends Entity {}

class Ship extends Entity {
  constructor(x, y, r) {
    super(x, y, r);
  }

  draw(ctx = GAME.ctx) {
    const obj = new Path2D('M8 0 L -8 8 L -4 0 L -8 -8Z');
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.stroke(obj);
    ctx.restore();
  }

  controlShip() {
    if (INPUT.hasKey('ArrowUp')) this.throttle();
    if (INPUT.hasKey('ArrowLeft')) this.rotate('ccw');
    if (INPUT.hasKey('ArrowRight')) this.rotate();
  }

  throttle() {
    const vec = [Math.cos((this.rotation * Math.PI) / 180), Math.sin((this.rotation * Math.PI) / 180)];
    this.x += 1 * vec[0];
    this.y += 1 * vec[1];
  }

  rotate(direction = 'cw') {
    const dir = direction === 'cw' ? 1 : -1;
    this.rotation += dir;
  }
}
