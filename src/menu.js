const routes = Object.freeze(['main', 'controls', 'about']);

function routeGuard() {
  if (!routes.includes(location.hash.slice(1))) {
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
  } else if (routes.includes(viewName)) {
    location.hash = viewName;
  } else {
    console.warn(`Wrong route name: ${viewName}`);
  }

  setSubheader();
}

window.addEventListener('hashchange', () => {
  routeGuard();
});

routeGuard();
