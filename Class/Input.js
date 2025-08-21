class Input {
  #keys;
  constructor() {
    this.#keys = new Set();

    document.addEventListener('keydown', this.addKey.bind(this));
    document.addEventListener('keyup', this.deleteKey.bind(this));
    window.addEventListener('blur', this.clearKeys.bind(this));
  }

  get keys() {
    return this.#keys;
  }

  hasKey(key) {
    return this.#keys.has(key);
  }

  addKey(e) {
    if (e.repeat) return;
    this.#keys.add(e.code);

    /* TEMP */
    switch (e.code) {
      case 'F2':
        GAME ? (GAME.debug = !GAME.debug) : undefined;
        break;
      case 'Enter':
        GAME.respawn('player1');
        break;
      case 'Space':
        GAME.respawn('player2');
        break;
      default:
        break;
    }
  }

  deleteKey({ code }) {
    this.#keys.delete(code);
  }

  clearKeys() {
    this.#keys.clear();
  }
}
