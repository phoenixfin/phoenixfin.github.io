// Client-side pagination for shelf and list pages.
// Opt in by putting data-paginate="N" on the container; sections (.rack)
// that end up empty on a page are hidden, and a section split across pages
// keeps its label on every page. Without JS the full list stays visible.
(function () {
  function init(container) {
    var perPage = parseInt(container.getAttribute('data-paginate'), 10);
    if (!perPage || perPage < 1) return;

    var items = container.querySelectorAll('.book, .slide, .item');
    if (items.length <= perPage) return;

    var racks = container.querySelectorAll('.rack');
    var pageCount = Math.ceil(items.length / perPage);
    var current = 1;

    var nav = document.createElement('nav');
    nav.className = 'pagination';
    nav.setAttribute('aria-label', 'Navigasi halaman');
    container.parentNode.insertBefore(nav, container.nextSibling);

    function goTo(page) {
      current = page;
      render();
      var top = container.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo(0, top > 0 ? top : 0);
    }

    function control(label, page, cls, inactive) {
      var el = document.createElement(inactive ? 'span' : 'a');
      el.textContent = label;
      el.className = inactive ? cls + ' disabled' : cls;
      if (!inactive) {
        el.href = '#';
        el.addEventListener('click', function (e) {
          e.preventDefault();
          goTo(page);
        });
      }
      nav.appendChild(el);
    }

    function render() {
      var start = (current - 1) * perPage;
      var end = current * perPage;

      Array.prototype.forEach.call(items, function (el, i) {
        el.style.display = (i >= start && i < end) ? '' : 'none';
      });

      Array.prototype.forEach.call(racks, function (rack) {
        var visible = false;
        var rackItems = rack.querySelectorAll('.book, .slide, .item');
        Array.prototype.forEach.call(rackItems, function (el) {
          if (el.style.display !== 'none') visible = true;
        });
        rack.style.display = visible ? '' : 'none';
      });

      nav.innerHTML = '';
      control('‹', current - 1, 'previous', current === 1);
      for (var p = 1; p <= pageCount; p++) {
        control(String(p), p, p === current ? 'page-link current' : 'page-link', p === current);
      }
      control('›', current + 1, 'next', current === pageCount);
    }

    render();
  }

  var containers = document.querySelectorAll('[data-paginate]');
  Array.prototype.forEach.call(containers, init);
})();
