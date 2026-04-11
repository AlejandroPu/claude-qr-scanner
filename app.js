const video     = document.getElementById('video');
const canvas    = document.getElementById('canvas');
const ctx       = canvas.getContext('2d');
const btnStart  = document.getElementById('btn-start');
const btnStop   = document.getElementById('btn-stop');
const btnUpload = document.getElementById('btn-upload');
const fileInput = document.getElementById('file-input');
const resultBox = document.getElementById('result');
const resultTxt = document.getElementById('result-text');
const btnCopy   = document.getElementById('btn-copy');

let stream      = null;
let animFrameId = null;

// ── Start camera ──────────────────────────────────────────────────────────────
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    video.srcObject = stream;
    await video.play();

    btnStart.disabled = true;
    btnStop.disabled  = false;

    scanLoop();
  } catch (err) {
    alert('No se pudo acceder a la cámara: ' + err.message);
  }
}

// ── Stop camera ───────────────────────────────────────────────────────────────
function stopCamera() {
  if (animFrameId) cancelAnimationFrame(animFrameId);
  if (stream) stream.getTracks().forEach(t => t.stop());
  video.srcObject = null;
  stream = null;

  btnStart.disabled = false;
  btnStop.disabled  = true;
}

// ── Scan loop ─────────────────────────────────────────────────────────────────
function scanLoop() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    });

    if (code) {
      showResult(code.data);
      stopCamera();
      return;
    }
  }
  animFrameId = requestAnimationFrame(scanLoop);
}

// ── Show result ───────────────────────────────────────────────────────────────
function showResult(text) {
  resultTxt.textContent = text;
  resultBox.hidden = false;
}

// ── Copy to clipboard ─────────────────────────────────────────────────────────
btnCopy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(resultTxt.textContent);
    btnCopy.textContent = '¡Copiado!';
    setTimeout(() => (btnCopy.textContent = 'Copiar'), 2000);
  } catch {
    alert('No se pudo copiar al portapapeles.');
  }
});

// ── Scan from image file ──────────────────────────────────────────────────────
function scanImageFile(file) {
  stopCamera();

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
      if (code) {
        showResult(code.data);
      } else {
        alert('No se encontró ningún código QR en la imagen.');
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ── Events ────────────────────────────────────────────────────────────────────
btnStart.addEventListener('click', startCamera);
btnStop.addEventListener('click', stopCamera);
btnUpload.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) scanImageFile(file);
  fileInput.value = '';
});
