// Injects inject.js into the main execution context before Hotstar scripts run
(function() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('inject.js');
  script.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);

  // Relay messages from inject.js to popup/storage
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'HOTSTAR_4K_STATS') {
      try {
        chrome.storage.local.set({ hotstarStats: event.data.stats });
      } catch (e) {}
    }
  });
})();
