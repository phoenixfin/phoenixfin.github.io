(function () {
  var bar = document.querySelector('.read-progress > div');
  if (!bar) return;

  function update() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var pct = max > 0 ? Math.min(100, Math.max(0, (window.pageYOffset / max) * 100)) : 0;
    bar.style.width = pct + '%';
    bar.parentNode.setAttribute('aria-valuenow', Math.round(pct));
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
