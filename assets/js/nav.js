(function () {
  var nav = document.querySelector('.topnav');
  if (!nav) return;

  var toggle = nav.querySelector('.topnav-toggle');
  var mobile = window.matchMedia('(max-width: 780px)');

  // Hamburger opens/closes the whole panel
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Group labels ("Tulis", "Karya", ...) toggle their submenu on tap.
  // On desktop the dropdowns are hover/focus driven, so only intercept on mobile.
  var groups = nav.querySelectorAll('.topnav-link-group');
  Array.prototype.forEach.call(groups, function (group) {
    var item = group.parentNode;

    function activate(e) {
      if (!mobile.matches) return;
      e.preventDefault();
      item.classList.toggle('is-expanded');
    }

    group.addEventListener('click', activate);
    group.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        activate(e);
      }
    });
  });

  // Tapping an actual link closes the mobile panel
  var links = nav.querySelectorAll('a.topnav-link, a.topnav-sublink');
  Array.prototype.forEach.call(links, function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Reset state when resizing back to desktop
  function onChange(e) {
    if (!e.matches) {
      nav.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      Array.prototype.forEach.call(
        nav.querySelectorAll('.topnav-item.is-expanded'),
        function (item) { item.classList.remove('is-expanded'); }
      );
    }
  }
  if (mobile.addEventListener) {
    mobile.addEventListener('change', onChange);
  } else if (mobile.addListener) {
    mobile.addListener(onChange);
  }
})();
