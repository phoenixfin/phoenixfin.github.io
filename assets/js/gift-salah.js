var REVEAL_DATE = new Date(2026, 6, 5, 0, 0, 0);
var PASSWORD    = 'rahasia';
var STORAGE_KEY = 'gift_salah_v1';

function init() {
  var now        = new Date();
  var isRevealed = now >= REVEAL_DATE;
  var isUnlocked = localStorage.getItem(STORAGE_KEY) === '1';

  if (!isRevealed) {
    show('state-countdown');
    startCountdown();
  } else if (!isUnlocked) {
    show('state-password');
  } else {
    show('state-reveal');
  }
}

function show(id) {
  ['state-countdown', 'state-password', 'state-reveal'].forEach(function(s) {
    document.getElementById(s).style.display = 'none';
  });
  document.getElementById(id).style.display = '';
}

function checkPassword() {
  var input = document.getElementById('password-input').value;
  var error = document.getElementById('password-error');
  if (input === PASSWORD) {
    localStorage.setItem(STORAGE_KEY, '1');
    show('state-reveal');
  } else {
    error.style.display = 'block';
    document.getElementById('password-input').value = '';
    document.getElementById('password-input').focus();
  }
}

function pad(n) { return n < 10 ? '0' + n : '' + n; }

function startCountdown() {
  function tick() {
    var diff = REVEAL_DATE - new Date();
    if (diff <= 0) { location.reload(); return; }
    var days    = Math.floor(diff / 86400000);
    var hours   = Math.floor((diff % 86400000) / 3600000);
    var minutes = Math.floor((diff % 3600000)  / 60000);
    var seconds = Math.floor((diff % 60000)    / 1000);
    document.getElementById('cd-days').textContent    = pad(days);
    document.getElementById('cd-hours').textContent   = pad(hours);
    document.getElementById('cd-minutes').textContent = pad(minutes);
    document.getElementById('cd-seconds').textContent = pad(seconds);
  }
  tick();
  setInterval(tick, 1000);
}

init();
