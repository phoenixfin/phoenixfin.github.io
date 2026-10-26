(function () {
  var box = document.getElementById('home-quote');
  var src = document.getElementById('home-quotes');
  if (!box || !src) return;

  var quotes;
  try { quotes = JSON.parse(src.textContent); } catch (e) { return; }
  if (!quotes || !quotes.length) return;

  var pick = quotes[Math.floor(Math.random() * quotes.length)];
  var text = box.querySelector('blockquote');
  var cite = box.querySelector('figcaption');
  if (text) text.textContent = '“' + pick.text + '”';
  if (cite) cite.textContent = pick.cite;
})();
