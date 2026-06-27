var REVEAL_DATE = new Date(2026, 6, 5, 0, 0, 0);
var PASSWORD    = 'rahasia';

function init() {
  var now = new Date();
  if (now < REVEAL_DATE) {
    startCountdown();
  } else {
    document.getElementById('countdown-section').style.display = 'none';
    document.getElementById('password-note').textContent = 'Waktunya sudah tiba. Kamu pasti tahu kata sandinya.';
    document.getElementById('password-input').focus();
  }
}

function showReveal() {
  document.getElementById('state-locked').style.display = 'none';
  document.getElementById('state-reveal').style.display = '';
}

function checkPassword() {
  var input = document.getElementById('password-input').value;
  var error = document.getElementById('password-error');
  if (input === PASSWORD) {
    showReveal();
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
    if (diff <= 0) {
      document.getElementById('countdown-section').style.display = 'none';
      document.getElementById('password-note').textContent = 'Waktunya sudah tiba. Kamu pasti tahu kata sandinya.';
      document.getElementById('password-input').focus();
      return;
    }
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
