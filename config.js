const VERSION = '2.5.0-alpha';

console.log(`Asteroids JS – version ${VERSION}`);

document.querySelector('meta[name="version"]').setAttribute('content', VERSION);
document.querySelectorAll('[data-version]').forEach((node) => {
  node.innerText = VERSION;
});
