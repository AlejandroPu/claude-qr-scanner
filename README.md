# QR Scanner

A browser-based QR code reader that requires no installation or server setup. It accesses the device camera, detects QR codes in real time, and lets you copy the result to the clipboard in one click.

## Features

- Camera access with preference for the rear-facing camera (optimized for mobile)
- Automatic real-time QR code detection
- One-click copy to clipboard
- Works directly from `file://` — no local server needed
- Responsive UI with a dark theme

## Tech Stack

- HTML5 (`getUserMedia`, `Canvas API`)
- CSS3 (animations, `aspect-ratio`)
- JavaScript (Vanilla ES2020+)
- [jsQR](https://github.com/cozmo/jsQR) v1.4.0 — QR detection library (via CDN)

## Usage

1. Clone or download the repository
2. Open `index.html` in Chrome or Edge
3. Click **Start camera** and grant camera permission
4. Point the camera at a QR code
5. The result appears automatically — click **Copy** to copy it to the clipboard

> The camera stops automatically once a QR code is detected.

## Browser Compatibility

| Browser | Support |
|---|---|
| Chrome / Edge (desktop) | Full |
| Chrome (Android) | Full |
| Firefox | Full |
| Safari (iOS) | Full (requires HTTPS or localhost) |

## Project Structure

```
claude-qr-scanner/
├── index.html      # UI structure and elements
├── style.css       # Styles and animations
├── app.js          # Camera logic and QR detection
├── CHANGELOG.md
└── LICENSE
```

## Built With

This project was created with AI assistance:

- **[Cursor](https://cursor.sh)** v0.3.12 — AI-powered code editor
- **[Claude Code](https://claude.ai/code)** v2.1.94 — Anthropic's agentic coding tool

## License

MIT © 2026 Francisco Alejandro Retamal Reinoso — see [LICENSE](LICENSE) for details.
