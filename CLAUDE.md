# CLAUDE.md — QR Scanner

Contexto persistente para Claude Code durante el desarrollo de este proyecto.

## Qué es este proyecto

Lector de códigos QR que corre completamente en el navegador, sin servidor ni proceso de build. El usuario abre `index.html` directamente desde el sistema de archivos (`file://`) o desde un servidor estático y escanea QR con la cámara del dispositivo.

- Repositorio: https://github.com/AlejandroPu/claude-qr-scanner
- Versión actual: 1.0.0 (lanzada 2026-04-08)
- Licencia: MIT © 2026 Francisco Alejandro Retamal Reinoso

## Stack y dependencias

| Capa | Tecnología |
|---|---|
| Estructura | HTML5 |
| Estilos | CSS3 vanilla (sin preprocesador) |
| Lógica | JavaScript vanilla ES2020+ (sin framework, sin bundler) |
| Detección QR | [jsQR](https://github.com/cozmo/jsQR) v1.4.0 vía CDN jsDelivr |

No hay `package.json`, `node_modules`, ni paso de compilación. Todo se sirve tal como está.

## Estructura de archivos

```
claude-qr-scanner/
├── index.html      # Markup y punto de entrada; carga jsQR desde CDN y luego app.js
├── style.css       # Estilos y animación pulse del marco de escaneo
├── app.js          # Toda la lógica: cámara, loop de escaneo, resultado, clipboard
├── CLAUDE.md       # Este archivo
├── README.md
├── CHANGELOG.md    # Formato Keep a Changelog + Semver
└── LICENSE         # MIT
```

## Arquitectura de app.js

### Estado global (dos variables)

```js
let stream      = null;   // MediaStream activo
let animFrameId = null;   // ID del requestAnimationFrame en curso
```

### Flujo principal

```
startCamera()
  └─ getUserMedia({ video: { facingMode: 'environment' } })
  └─ video.play()
  └─ scanLoop()  ◄──────────────────────────────────────────┐
       └─ ctx.drawImage(video → canvas oculto)              │
       └─ jsQR(imageData)                                   │
            ├─ sin código → requestAnimationFrame(scanLoop) ┘
            └─ código detectado → showResult() + stopCamera()

stopCamera()
  └─ cancelAnimationFrame(animFrameId)
  └─ stream.getTracks().forEach(t => t.stop())
```

### Funciones públicas

| Función | Responsabilidad |
|---|---|
| `startCamera()` | Solicita permiso de cámara, arranca el video y lanza el loop |
| `stopCamera()` | Cancela el loop y libera todos los tracks de la cámara |
| `scanLoop()` | Frame-by-frame: dibuja en canvas, llama a jsQR, reencola o resuelve |
| `scanImageFile(file)` | Carga un archivo de imagen en el canvas, corre jsQR y muestra el resultado |
| `showResult(text)` | Muestra el panel de resultado con el texto decodificado |
| `btnCopy` listener | Copia al portapapeles con feedback visual de 2 s |

### Decisiones de diseño relevantes

- El `<canvas>` permanece oculto (`hidden`); solo procesa pixels, nunca se muestra.
- Al detectar un QR la cámara se detiene automáticamente (una lectura por sesión).
- `facingMode: 'environment'` prioriza la cámara trasera en móviles.
- No hay historial ni soporte para subir imagen desde el dispositivo (aún).

## Convenciones de código

- Indentación: 2 espacios.
- Punto y coma al final de cada sentencia.
- Comentarios de sección con el formato `// ── Título ───...`.
- Sin TypeScript, sin JSDoc, sin linter configurado (mantener simple).

## Compatibilidad de navegadores objetivo

| Navegador | Soporte |
|---|---|
| Chrome / Edge (desktop) | Completo |
| Chrome (Android) | Completo |
| Firefox | Completo |
| Safari iOS | Completo (requiere HTTPS o localhost) |

`file://` funciona en Chrome y Edge desktop. En Safari iOS y Firefox se necesita HTTPS.

## Historial de versiones

- **1.0.0** (2026-04-08) — MVP: cámara, detección QR en tiempo real, copiar al portapapeles, UI oscura responsiva.

## Áreas pendientes / posibles mejoras

- ~~Soporte para subir una imagen desde el dispositivo (sin cámara).~~ ✓ Implementado en 1.1.0
- Historial de escaneos (localStorage).
- Escaneo continuo sin detener la cámara tras cada lectura.
- Modo de antorcha / linterna en móviles compatibles.
- PWA (manifest + service worker) para instalación offline.
- Soporte para otros formatos de código (EAN, Code128, etc.).
