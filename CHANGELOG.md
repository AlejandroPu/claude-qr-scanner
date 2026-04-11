# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.1.0] - 2026-04-11

### Added

- Upload an image file to scan a QR code without using the camera (`scanImageFile`)
- "Cargar imagen" button with distinct blue styling

## [1.0.0] - 2026-04-08

### Added

- Device camera access via `getUserMedia` with rear-facing camera preference
- Real-time QR code detection using jsQR v1.4.0
- Copy result to clipboard with visual feedback
- Responsive dark UI with animated scan frame
- Support for direct opening from `file://` without a local server

[Unreleased]: https://github.com/AlejandroPu/claude-qr-scanner/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/AlejandroPu/claude-qr-scanner/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/AlejandroPu/claude-qr-scanner/releases/tag/v1.0.0
