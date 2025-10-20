/* Menu */
const ROUTES = Object.freeze(['main', /* 'start', */ 'settings', 'controls', 'about']);

/* Game */
const ENTITY_TYPES = Object.freeze({
  DEAFULT: 'default',
  NEUTRAL: 'neutral',
  PLAYER: 'player',
  ADVERSARY: 'adversary',
  MISCELLANEOUS: 'miscellaneous',
  OBJECTIVE: 'objective',
  WEAPON: 'weapon',
});

const MODEL = Object.freeze({
  SHIP: new Path2D('M15,0 L-8,13 L-12,9 L-8,4 L-10,0 L-8,-4 L-12,-9 L-8,-13Z'),
  CARGO: new Path2D('M16,0L11,11L-10,11L-5,0L-10,-12L11,-12Z'),
  ASTEROID: new Path2D('M 12 2 L 8 8L 3 13L -6 10L -12 11L -16 4L -12 -6L 0 -14L 7 -9L 14 -7Z'),
  ROCKET: new Path2D('M4 0 L2 1 L-2 1 L-4 2 L-4 -2 L-2 -1 L3 -1Z'),
});

const ROTATION = Object.freeze({
  CCW: -1,
  NONE: 0,
  CW: 1,
});
