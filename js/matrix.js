// Matrix effect for canvas
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const fontSize = 18;
const columns = Math.floor(width / fontSize);
const chars = '01<>[]{}|/\\-=+*#@%$&';
let drops = Array(columns).fill(1);
let speed = 40;

function drawMatrix() {
  ctx.fillStyle = 'rgba(24,24,27,0.13)';
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    const grad = ctx.createLinearGradient(0, drops[i] * fontSize, 0, (drops[i] + 1) * fontSize);
    grad.addColorStop(0, '#ff9800');
    grad.addColorStop(1, '#ff5722');
    ctx.fillStyle = grad;
    ctx.font = fontSize + 'px Fira Mono, Consolas, monospace';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
let interval = setInterval(drawMatrix, speed);

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  drops = Array(Math.floor(width / fontSize)).fill(1);
});

// Dev Mode (Matrix Boost)
document.getElementById('devModeBtn').addEventListener('click', () => {
  if (speed === 40) {
    clearInterval(interval);
    speed = 12;
    interval = setInterval(drawMatrix, speed);
  } else {
    clearInterval(interval);
    speed = 40;
    interval = setInterval(drawMatrix, speed);
  }
}); 