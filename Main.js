console.log('Asteroids');

const INPUT = new Input();
const GAME = new Game();
GAME.entities.push(new Ship(0, 0, 10));
GAME.entities.push(new Entity(200, 150, 16));
GAME.entities.push(new Asteroid(-100, -100, 16));
GAME.entities.push(new Asteroid(-100, -100, 16));
GAME.entities.push(new Asteroid(-100, -100, 16));
GAME.entities.push(new Asteroid(-100, -100, 16));
GAME.entities.push(new Asteroid(-100, -100, 16));
GAME.entities.push(new Asteroid(-100, -100, 16));
