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
  CARGO: new Path2D('M16,0 L11,11 L-10,11 L-5,0 L-10,-12 L11,-12Z'),
  ASTEROID: new Path2D('M12,2 L8,8 L3,13 L-6,10 L-12,11 L-16,4 L-12,-6 L0,-14 L7,-9 L14,-7Z'),
  ROCKET: new Path2D('M4,0 L2,1 L-2,1 L-4,2 L-4,-2 L-2,-1 L3,-1Z'),
});

const ROTATION = Object.freeze({
  CCW: -1,
  NONE: 0,
  CW: 1,
});
