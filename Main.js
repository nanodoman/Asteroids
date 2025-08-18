console.log('Asteroids');

const INPUT = new Input();
const GAME = new Game();
GAME.addEntity(new Ship(0, 0, 10));
GAME.addEntity(new Asteroid(-100, -100, 16));
GAME.addEntity(new Asteroid(-100, -100, 16));
GAME.addEntity(new Asteroid(-100, -100, 16));
GAME.addEntity(new Asteroid(-100, -100, 16));
GAME.addEntity(new Asteroid(-100, -100, 16));
GAME.addEntity(new Asteroid(-100, -100, 16));
