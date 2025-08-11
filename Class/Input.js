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

  addKey({ code }) {
    this.#keys.add(code);
  }

  deleteKey({ code }) {
    this.#keys.delete(code);
  }

  clearKeys() {
    this.#keys.clear();
  }
}
