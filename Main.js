console.log('Asteroids');

const INPUT = new Input();
const GAME = new Game();
GAME.entities.push(new Ship(400, 300, 10));
GAME.entities.push(new Entity(100, 100, 16));
GAME.entities.push(new Asteroid(200, 200, 16));
