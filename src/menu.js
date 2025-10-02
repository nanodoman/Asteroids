const routes = Object.freeze(['controls', 'about']);

function switchWiew(viewName) {
  if (viewName === '') {
    location.hash = '';
    history.replaceState(null, null, window.location.pathname);
  } else if (routes.includes(viewName)) {
    location.hash = viewName;
  } else {
    console.warn(`Wrong route name: ${viewName}`);
  }

  document.getElementById('subheader').innerText = location.hash.slice(1);
}
