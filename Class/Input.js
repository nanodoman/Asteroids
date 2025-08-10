class Input {
  constructor() {
    this.keys = new Set();

    document.addEventListener('keydown', this.addKey.bind(this));
    document.addEventListener('keyup', this.deleteKey.bind(this));
    window.addEventListener('blur', this.clearKeys.bind(this));
  }

  hasKey(key) {
    return this.keys.has(key);
  }

  addKey({ key }) {
    this.keys.add(key);
  }

  deleteKey({ key }) {
    this.keys.delete(key);
  }

  clearKeys() {
    this.keys.clear();
  }
}
