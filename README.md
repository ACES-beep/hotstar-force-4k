# Hotstar 4K & Max Quality Optimizer

A browser extension that optimizes Hotstar streaming on 4K hardware by spoofing capabilities and forcing high-bitrate profiles.

Adapted from [Pickle-Pixel/netflix-force-4k](https://github.com/Pickle-Pixel/netflix-force-4k).

## Features

- **4K Screen Spoofing:** Overrides display metrics to 3840x2160 UHD.
- **MediaCapabilities Optimization:** Spoofs hardware support for 4K HEVC, AV1, and VP9.
- **Bandwidth Override:** Sets Shaka Player / DASH player target bandwidth to 25 Mbps.
- **Live Stats Popup:** Tracks real-time video resolution and playback parameters.

## Usage

Load unpacked in Microsoft Edge (`edge://extensions/`) or launch directly via:
```bash
msedge.exe --load-extension="path/to/hotstar-force-4k" --app="https://www.hotstar.com"
```

## License

MIT
