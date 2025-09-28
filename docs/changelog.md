# Changelog

<!-- Added, Changed, Fixed, Removed -->

## [2.0.0-alpha] – 28.09.2025

### Added

- Routing – simple hash-based routing system
- Main menu – main screen with navigation options
- Pause window – in-game pause overlay
- Pause key – ability to pause the game using the `P` key
- UI stylesheets – multiple layered stylesheets for interface elements
- Custom cursor – personalized pointer for game UI
- Controls section – dedicated screen for keybindings
- About section – includes placeholder Lorem Ipsum content

### Changed

- Layout – entire game now fits into a classic 800×600 pixel scene
- Pages – split game into index screen and gameplay screen

## [1.10.0-alpha] – 14.09.2025

### Changed

- Breaking: refactor ship rotation
- Entity props and behavior - move universal props and methods up to base class

## [1.9.0-alpha] – 28.08.2025

### Added

- New entity - Cargo ship (50 points for destroying)

### Changed

- Breaking: Extended `addPoint(player)` to `addPoints(player, bonus = 0, multi = 1)`
