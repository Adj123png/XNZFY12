// 祝福语数组
const wishes = [
  '2025 新年快乐！',
  '愿你新的一年万事如意！',
  '好运连连，财源滚滚！',
  '家庭幸福，平安健康！',
  '新的一年，心想事成！',
  '梦想成真，福气满满！'
];

const messageElement = document.getElementById('message');
let currentIndex = 0;
let currentCharIndex = 0;
let typingInterval;

function typeText() {
  if (currentCharIndex < wishes[currentIndex].length) {
    messageElement.textContent += wishes[currentIndex][currentCharIndex];
    messageElement.setAttribute('data-text', messageElement.textContent); // 更新伪元素内容
    currentCharIndex++;
  } else {
    clearInterval(typingInterval);
    setTimeout(() => {
      if (currentIndex < wishes.length - 1) {
        currentIndex++;
        currentCharIndex = 0;
        messageElement.textContent = '';
        typingInterval = setInterval(typeText, 50);
      } else {
        startFireworks();
      }
    }, 1500);
  }
}

// 开始打字动画
typingInterval = setInterval(typeText, 50);

// 烟花效果
const fireworksCanvas = document.getElementById('fireworks');
const starsCanvas = document.getElementById('stars');
fireworksCanvas.width = starsCanvas.width = window.innerWidth;
fireworksCanvas.height = starsCanvas.height = window.innerHeight;
const fireworksCtx = fireworksCanvas.getContext('2d');
const starsCtx = starsCanvas.getContext('2d');
const particles = [];

// 星星效果
function createStars() {
  const starCount = 150;
  const stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      size: Math.random() * 2,
      opacity: Math.random(),
    });
  }
  return stars;
}

const stars = createStars();

function drawStars() {
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  stars.forEach(star => {
    starsCtx.beginPath();
    starsCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    starsCtx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    starsCtx.fill();
    star.opacity += Math.random() * 0.02 - 0.01;
    if (star.opacity > 1) star.opacity = 1;
    if (star.opacity < 0) star.opacity = 0;
  });
  requestAnimationFrame(drawStars);
}

// 烟花粒子
class Particle {
  constructor(x, y, color, speed, angle) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.angle = angle;
    this.size = Math.random() * 3 + 1;
    this.opacity = 1;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    this.opacity -= 0.02;
  }

  draw() {
    fireworksCtx.beginPath();
    fireworksCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    fireworksCtx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    fireworksCtx.fill();
  }
}

function createFirework() {
  const x = Math.random() * fireworksCanvas.width;
  const y = Math.random() * fireworksCanvas.height / 2;
  const colors = ['255, 99, 71', '144, 238, 144', '135, 206, 250', '238, 130, 238'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < 50; i++) {
    const speed = Math.random() * 5 + 1;
    const angle = Math.random() * Math.PI * 2;
    particles.push(new Particle(x, y, color, speed, angle));
  }
}

function drawFireworks() {
  fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.opacity <= 0) particles.splice(index, 1);
  });
  if (Math.random() < 0.05) createFirework();
  requestAnimationFrame(drawFireworks);
}

// 启动烟花和星星动画
function startFireworks() {
  drawFireworks();
  drawStars();
}
