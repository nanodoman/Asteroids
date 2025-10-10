# TODO: Asteroids JS

## Functions

- [x] game menu
- [x] add global version (configuration) and copy into html
- [ ] sounds
- [ ] missions/objectives
- [ ] game over screen
- [ ] add license
- [ ] add analitics (count views)?
- [ ] favicon

## Refactor

- [x] paths/files namings
- [x] game scene into grid layout, delete z-indexes reorder layers (besides dialog)
- [ ] decision:
  - [ ] split entities to separate files - asteroids/rockets/ships
  - [ ] keep entities in one file and rename it
- [ ] collisions (shaped collisions instead of circle collisions)
- [ ] private properties with getters/setters
- [ ] add JSDocs
- [ ] error handling
- [ ] refactor router, switch to classes
- [ ] refactor game and input, declare as consts and init via initGame()

## Fix

- [ ] rocket glitch before disapear
- [ ] upward movement not affected by innertia
