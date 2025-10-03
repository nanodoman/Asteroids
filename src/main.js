const VERSION = '2.6.0-alpha';
let INPUT = null;
let GAME = null;

(function setVersion() {
  console.log(`Asteroids JS – version ${VERSION}`);

  document.querySelector('meta[name="version"]').setAttribute('content', VERSION);

  document.querySelectorAll('[data-version]').forEach((node) => {
    node.innerText = VERSION;
  });
})();

/* Router */
function routeGuard() {
  if (!ROUTES.includes(location.hash.slice(1))) {
    switchWiew('main');
  }

  setSubheader();
}

function setSubheader() {
  document.getElementById('subheader').innerText = location.hash.slice(1);
}

function switchWiew(viewName) {
  if (viewName === '' || viewName === 'main') {
    location.hash = '';
    history.replaceState(null, null, window.location.pathname);
  } else if (ROUTES.includes(viewName)) {
    location.hash = viewName;
  } else {
    console.warn(`Wrong route name: ${viewName}`);
  }

  setSubheader();
}
/* Router end */

function initMenu() {
  window.addEventListener('hashchange', () => {
    routeGuard();
  });

  routeGuard();
}

function initGame() {
  INPUT = new Input();
  GAME = new Game();
}
