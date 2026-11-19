document.addEventListener('DOMContentLoaded', () => {
  const streamResEl = document.getElementById('streamRes');
  chrome.storage.local.get(['hotstarStats'], (result) => {
    if (result.hotstarStats && result.hotstarStats.videoWidth) {
      streamResEl.textContent = `${result.hotstarStats.videoWidth} x ${result.hotstarStats.videoHeight}`;
      streamResEl.style.color = '#4ade80';
    } else {
      streamResEl.textContent = 'Play a video to test';
    }
  });
});
