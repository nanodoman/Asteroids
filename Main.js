console.log('Asteroids');

const MODEL = Object.freeze({
  SHIP: new Path2D('M10,0L-6,8L-2,0L-6,-8Z'),
  ASTEROID: new Path2D('M 12 2 L 8 8L 3 13L -6 10L -12 11L -16 4L -12 -6L 0 -14L 7 -9L 14 -7Z'),
  ROCKET: new Path2D('M4 0 L2 1 L-2 1 L-4 2 L-4 -2 L-2 -1 L3 -1Z'),
});

const ROTATION = Object.freeze({
  CW: 1,
  CCW: -1,
});

const INPUT = new Input();
const GAME = new Game();
