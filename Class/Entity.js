class Entity {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  draw(ctx = GAME.ctx) {
    const obj = new Path2D();
    obj.arc(this.x, this.y, this.r, 0, Math.PI * 4);

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
    const obj = new Path2D('M0 -8 l 8 16 l -8 -4 l -8 4Z');
    ctx.save();
    ctx.translate(this.x, this.y);
    // ctx.rotate(Math.PI / 4);
    ctx.stroke(obj);
    ctx.restore();
  }
}
