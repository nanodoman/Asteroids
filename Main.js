console.log('Asteroids');

const GAME = new Game();
GAME.entities.push(new Ship(400, 300, 8));
GAME.entities.push(new Entity(100, 100, 16));
