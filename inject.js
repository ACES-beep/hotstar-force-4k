// Hotstar 4K Optimizer - Main Capability Injection Script
// Inspired by netflix-force-4k by Pickle-Pixel
(function() {
  'use strict';

  console.log('[Hotstar 4K] ==========================================');
  console.log('[Hotstar 4K] Initializing Hotstar 4K & Quality Optimizer');
  console.log('[Hotstar 4K] ==========================================');

  // 1. SPOOF 4K SCREEN RESOLUTION
  const spoofProperties = {
    width: 3840,
    height: 2160,
    availWidth: 3840,
    availHeight: 2160,
    colorDepth: 48,
    pixelDepth: 48
  };

  for (const [prop, val] of Object.entries(spoofProperties)) {
    try {
      Object.defineProperty(window.screen, prop, {
        get: () => val,
        configurable: true
      });
    } catch (e) {}
  }

  try {
    Object.defineProperty(window, 'devicePixelRatio', { get: () => 1, configurable: true });
    Object.defineProperty(window, 'outerWidth', { get: () => 3840, configurable: true });
    Object.defineProperty(window, 'outerHeight', { get: () => 2160, configurable: true });
  } catch (e) {}

  console.log('[Hotstar 4K] Screen spoofed to 3840x2160 (4K UHD)');

  // 2. SPOOF MEDIA CAPABILITIES API (HEVC, AV1, VP9 4K)
  if (navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo) {
    const originalDecodingInfo = navigator.mediaCapabilities.decodingInfo.bind(navigator.mediaCapabilities);

    navigator.mediaCapabilities.decodingInfo = async function(config) {
      const is4KTarget = config && config.video && (
        config.video.width >= 1920 ||
        config.video.height >= 1080 ||
        /hev1|hvc1|av01|vp09/i.test(config.video.contentType || '')
      );

      try {
        const result = await originalDecodingInfo(config);
        if (is4KTarget) {
          return {
            supported: true,
            smooth: true,
            powerEfficient: true,
            keySystemAccess: result ? result.keySystemAccess : null
          };
        }
        return result;
      } catch (e) {
        if (is4KTarget) {
          return { supported: true, smooth: true, powerEfficient: true };
        }
        throw e;
      }
    };
    console.log('[Hotstar 4K] MediaCapabilities API spoofed for 4K HEVC/AV1/VP9');
  }

  // 3. SPOOF MEDIA KEY SYSTEM ACCESS (PLAYREADY & WIDEVINE L1)
  if (navigator.requestMediaKeySystemAccess) {
    const origRequestKey = navigator.requestMediaKeySystemAccess.bind(navigator);
    navigator.requestMediaKeySystemAccess = async function(keySystem, supportedConfigurations) {
      // Prioritize PlayReady on Edge if available
      return origRequestKey(keySystem, supportedConfigurations);
    };
  }

  // 4. PLAYER HOOKS & BITRATE UNLOCK
  function hookPlayer() {
    // Intercept Shaka Player if present
    if (window.shaka && window.shaka.Player) {
      const origInit = window.shaka.Player.prototype.configure;
      window.shaka.Player.prototype.configure = function(config, value) {
        if (config && typeof config === 'object') {
          if (config.abr) {
            config.abr.enabled = true;
            config.abr.defaultBandwidthEstimate = 25000000; // 25 Mbps
          }
          if (config.streaming) {
            config.streaming.rebufferingGoal = 10;
            config.streaming.bufferingGoal = 30;
          }
        }
        return origInit.apply(this, arguments);
      };
      console.log('[Hotstar 4K] Shaka Player configured with high bandwidth & buffer profile');
    }

    // Monitor video elements
    const videos = document.querySelectorAll('video');
    videos.forEach(v => {
      if (!v.__hotstar4kHooked) {
        v.__hotstar4kHooked = true;
        v.addEventListener('resize', () => {
          window.postMessage({
            type: 'HOTSTAR_4K_STATS',
            stats: {
              active: true,
              videoWidth: v.videoWidth,
              videoHeight: v.videoHeight,
              url: location.href
            }
          }, '*');
        });
      }
    });
  }

  setInterval(hookPlayer, 1500);
})();
