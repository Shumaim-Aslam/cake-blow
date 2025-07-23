// Load the candle state from the URL (e.g., ?candles=11001)
function loadCandleState() {
  const params = new URLSearchParams(window.location.search);
  const state = params.get('candles');
  if (!state) return;

  const candles = document.querySelectorAll('.candle');
  for (let i = 0; i < candles.length && i < state.length; i++) {
    if (state[i] === '0') {
      candles[i].classList.add('blown');
    } else {
      candles[i].classList.remove('blown');
    }
  }
}

// Save the candle state in the URL whenever a candle is blown
function saveCandleState() {
  const candles = document.querySelectorAll('.candle');
  let state = '';
  candles.forEach(candle => {
    state += candle.classList.contains('blown') ? '0' : '1';
  });
  const newUrl = `${window.location.pathname}?candles=${state}`;
  window.history.replaceState(null, '', newUrl);
}

window.addEventListener('DOMContentLoaded', () => {
  loadCandleState();

  const candles = document.querySelectorAll('.candle');
  candles.forEach(candle => {
    candle.addEventListener('click', () => {
      if (!candle.classList.contains('blown')) {
        candle.classList.add('blown');
        saveCandleState();
      }
    });
  });
});
