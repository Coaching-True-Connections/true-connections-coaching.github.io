(function () {
  var drawer = document.getElementById('drawer');
  if (!drawer) return;

  var openButtons = Array.prototype.slice.call(document.querySelectorAll('.nav-toggle'));
  var closeButtons = Array.prototype.slice.call(document.querySelectorAll('.dclose'));
  var drawerLinks = Array.prototype.slice.call(drawer.querySelectorAll('a'));
  var lastFocusedBeforeOpen = null;
  var hasSharedNavigation = document.body.classList.contains('tc-site-rollout');
  var savedBodyOverflow = null;

  function getDrawerControls() {
    return Array.prototype.slice.call(drawer.querySelectorAll('a[href], button:not([disabled])'));
  }

  function setDrawer(open, restoreFocus) {
    if (open) lastFocusedBeforeOpen = document.activeElement;
    if (hasSharedNavigation && open && savedBodyOverflow === null) {
      savedBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else if (hasSharedNavigation && !open && savedBodyOverflow !== null) {
      document.body.style.overflow = savedBodyOverflow;
      savedBodyOverflow = null;
    }
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    openButtons.forEach(function (button) {
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    if (open) {
      var controls = getDrawerControls();
      if (controls[0]) controls[0].focus({ preventScroll: true });
    } else if (restoreFocus && lastFocusedBeforeOpen) {
      lastFocusedBeforeOpen.focus({ preventScroll: true });
    }
  }

  if (hasSharedNavigation) {
    var header = document.querySelector('.hero-nav');
    function updateStickyOffset() {
      if (header) document.body.style.setProperty('--tc-site-nav-height', header.getBoundingClientRect().height + 'px');
    }
    updateStickyOffset();
    if (window.ResizeObserver && header) new ResizeObserver(updateStickyOffset).observe(header);
    else window.addEventListener('resize', updateStickyOffset);
    window.addEventListener('pagehide', function () { setDrawer(false, false); });
    window.addEventListener('pageshow', function () { setDrawer(false, false); });
  }

  drawer.setAttribute('aria-hidden', drawer.classList.contains('open') ? 'false' : 'true');

  openButtons.forEach(function (button) {
    button.setAttribute('aria-controls', 'drawer');
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', function () { setDrawer(true); });
  });

  closeButtons.forEach(function (button) {
    button.setAttribute('aria-controls', 'drawer');
    button.addEventListener('click', function () { setDrawer(false, true); });
  });

  drawerLinks.forEach(function (link) {
    link.addEventListener('click', function () { setDrawer(false); });
  });

  document.addEventListener('keydown', function (event) {
    if (!drawer.classList.contains('open')) return;

    if (event.key === 'Escape') {
      setDrawer(false, true);
      return;
    }

    if (event.key === 'Tab') {
      var controls = getDrawerControls();
      if (!controls.length) return;
      var firstControl = controls[0];
      var lastControl = controls[controls.length - 1];

      if (event.shiftKey && document.activeElement === firstControl) {
        event.preventDefault();
        lastControl.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === lastControl) {
        event.preventDefault();
        firstControl.focus({ preventScroll: true });
      }
    }
  });
})();
