/* ============================================================
   NEURAL NETWORK CANVAS
   ============================================================ */
const canvas = document.getElementById('neural-canvas');
const ctx    = canvas.getContext('2d');
let particles = [];
let raf;

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  buildParticles();
}

function buildParticles() {
  const count = Math.max(40, Math.floor((canvas.width * canvas.height) / 16000));
  particles = Array.from({ length: count }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r:  Math.random() * 1.5 + 0.8,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.018 + 0.008,
  }));
}

function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const len = particles.length;

  // connections
  for (let i = 0; i < len; i++) {
    const a = particles[i];
    for (let j = i + 1; j < len; j++) {
      const b  = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 130) * 0.13})`;
        ctx.lineWidth   = 0.6;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // nodes
  for (const p of particles) {
    p.phase += p.speed;
    const glow   = (Math.sin(p.phase) + 1) / 2;
    const alpha  = 0.25 + glow * 0.55;
    const radius = p.r + glow * 1.8;

    // halo
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 4);
    grad.addColorStop(0, `rgba(0,212,255,${alpha * 0.25})`);
    grad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius * 4, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // core
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,212,255,${alpha})`;
    ctx.fill();

    // move
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  }

  raf = requestAnimationFrame(drawFrame);
}

window.addEventListener('resize', resize);
resize();
drawFrame();

// Pause animation when tab not visible (performance)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { cancelAnimationFrame(raf); }
  else                  { drawFrame(); }
});


/* ============================================================
   FLOATING MATH EXPRESSIONS
   ============================================================ */
const MATH_EXPRS = [
  '∇L(θ) → 0',  'P(y|x; θ)',    'O(n log n)',  'argmin_{θ} L',
  '∂L/∂θ = 0',  'E[X] = μ',     '‖w‖² / 2',    'σ(Wx + b)',
  'GPU_THREADS', 'MPI_Scatter()', 'cudaMalloc()', 'speedup(p, n)',
  '__global__',  '#pragma omp',   'Σ wᵢ·xᵢ',     'softmax(z)',
  'λ₁ ≥ λ₂ ≥ λₙ','rank(A) = r', 'det(J) ≠ 0',  'Var[X] = σ²',
  'T(n) = Θ(n²)','lim x→∞ f(x)','F = −∇V(q)',  'S(p) = 1/(s+…)',
  'mAP@0.5:0.95','IoU(A,B)',     'mse_loss(ŷ,y)','conv2d(x, W)',
];

const floatContainer = document.getElementById('math-floats');

function spawnFloat() {
  const el    = document.createElement('div');
  el.className = 'math-float';
  el.textContent = MATH_EXPRS[Math.floor(Math.random() * MATH_EXPRS.length)];
  el.style.cssText = [
    `left: ${5 + Math.random() * 88}%`,
    `top:  ${20 + Math.random() * 60}%`,
    `font-size: ${0.68 + Math.random() * 0.38}rem`,
    `animation-duration: ${9 + Math.random() * 10}s`,
    `animation-delay: 0s`,
  ].join(';');
  floatContainer.appendChild(el);
  setTimeout(() => el.remove(), 20000);
}

// seed 6 immediately, then keep spawning
for (let i = 0; i < 6; i++) setTimeout(spawnFloat, i * 350);
setInterval(spawnFloat, 1400);


/* ============================================================
   TYPING ANIMATION
   ============================================================ */
const PHRASES = [
  'ML · Computer Vision · Object Detection',
  'HPC · Parallel Computing · CUDA',
  'Algorithms · Mathematical Optimization',
  'Research-Oriented Engineer @ ENSIIE',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl  = document.getElementById('type-text');

function tick() {
  const phrase = PHRASES[phraseIdx];
  if (!deleting) {
    typeEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) { deleting = true; setTimeout(tick, 2200); return; }
    setTimeout(tick, 55);
  } else {
    typeEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % PHRASES.length; }
    setTimeout(tick, 35);
  }
}
tick();


/* ============================================================
   NAVBAR SCROLL BEHAVIOR
   ============================================================ */
const navbar = document.getElementById('navbar');
const navAs  = document.querySelectorAll('.nav-links a');
const sects  = Array.from(document.querySelectorAll('section[id]'));

window.addEventListener('scroll', () => {
  // frosted glass
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // active link highlight
  const scrollMid = window.scrollY + window.innerHeight / 2;
  let current = sects[0].id;
  for (const s of sects) {
    if (s.offsetTop <= scrollMid) current = s.id;
  }
  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });


/* ============================================================
   INTERSECTION OBSERVER — fade-up + skill bars
   ============================================================ */
// Mark animatable elements
const SELECTORS = [
  '.expertise-card', '.project-card', '.stat-card',
  '.timeline-item',  '.honor-card',   '.stack-category',
  '.contact-card',
];
document.querySelectorAll(SELECTORS.join(',')).forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('in-view');
    observer.unobserve(entry.target);
  }
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// skill bars — animate width when container enters viewport
const barObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.querySelectorAll('.skill-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
    barObserver.unobserve(entry.target);
  }
}, { threshold: 0.2 });

document.querySelectorAll('.stack-category').forEach(el => barObserver.observe(el));


/* ============================================================
   SMOOTH ANCHOR SCROLL (native scroll-behavior fallback)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
