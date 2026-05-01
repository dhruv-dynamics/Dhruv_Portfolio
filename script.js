'use strict';

/* ─────────────────────────────
   DATA
───────────────────────────── */
const SKILLS = {
  frontend: [
    { icon: '🌐', name: 'HTML5', level: 95 },
    { icon: '🎨', name: 'CSS3', level: 90 },
    { icon: '⚡', name: 'JavaScript', level: 88 },
    { icon: '⚛️', name: 'React.js', level: 85 },
    { icon: '💨', name: 'Tailwind CSS', level: 90 },
  ],
  tools: [
    { icon: '🐙', name: 'Git/GitHub', level: 88 },
    { icon: '🖥️', name: 'VS Code', level: 95 },
    { icon: '📮', name: 'Postman', level: 78 },
  ],
  concepts: [
    { icon: '📱', name: 'Responsive Design', level: 92 },
    { icon: '🔌', name: 'API Integration', level: 82 },
    { icon: '🎯', name: 'UI/UX Principles', level: 80 },
    { icon: '⚡', name: 'Performance', level: 78 },
  ],
};

const PROJECTS = [
  {
    id: 1,
    emoji: '🧠',
    bg: 'linear-gradient(135deg,#0f0325 0%,#1a0533 50%,#0a1520 100%)',
    tags: ['React', 'OpenAI', 'Tailwind', 'Node.js'],
    tagStyles: ['c', '', 'c', ''],
    name: 'Smart E-Learning Platform',
    desc: 'AI-powered learning platform with personalized tutoring, adaptive quizzes, and real-time progress analytics.',
    github: 'https://github.com/dhruvs/elearning-platform',
    demo: 'https://elearning-demo.vercel.app',
    details: {
      full: 'A comprehensive frontend UI for an AI-driven e-learning experience. Students interact with an AI tutor, take adaptive quizzes that adjust to skill level, and track their learning journey through rich visual dashboards.',
      features: [
        'AI Tutor chat interface with GPT-4 integration',
        'Adaptive quiz engine with difficulty scaling',
        'Visual progress dashboard with charts',
        'Course catalog with search and filtering',
        'Dark/light theme with smooth transitions',
        'Fully responsive mobile-first design',
      ],
      stack: 'React, Tailwind CSS, OpenAI API, Chart.js, React Router',
    },
  },
  {
    id: 2,
    emoji: '💬',
    bg: 'linear-gradient(135deg,#001529 0%,#002744 50%,#001520 100%)',
    tags: ['React', 'Socket.io', 'Express', 'MongoDB'],
    tagStyles: ['c', '', 'c', ''],
    name: 'GupShup Chat App',
    desc: 'Real-time messaging app with group chats, media sharing, typing indicators, and end-to-end encryption.',
    github: 'https://github.com/dhruvs/gupshup',
    demo: 'https://gupshup-chat.vercel.app',
    details: {
      full: 'GupShup (Hindi for "gossip") is a full-featured real-time chat application built with the MERN stack. It supports personal DMs, group conversations, media uploads, and secure authentication — all wrapped in a sleek, mobile-friendly interface.',
      features: [
        'Real-time messaging via WebSockets (Socket.io)',
        'Group chats with admin roles and permissions',
        'Media sharing — images, files up to 20MB',
        'Message read receipts and typing indicators',
        'JWT-based authentication and authorization',
        'Emoji reactions and message reply threading',
      ],
      stack: 'React, Express, Socket.io, MongoDB, Cloudinary, JWT',
    },
  },
];

const CERTS = [
  { icon: '⚛️', title: 'React — The Complete Guide', issuer: 'Udemy / Maximilian Schwarzmüller', date: 'Dec 2024', url: '#' },
  { icon: '🟨', title: 'JavaScript Algorithms & Data Structures', issuer: 'freeCodeCamp', date: 'Oct 2024', url: '#' },
  { icon: '🤖', title: 'Generative AI for Everyone', issuer: 'Coursera / DeepLearning.AI', date: 'Sep 2024', url: '#' },
  { icon: '💨', title: 'Tailwind CSS Masterclass', issuer: 'Scrimba', date: 'Aug 2024', url: '#' },
  { icon: '🐙', title: 'Git & GitHub Bootcamp', issuer: 'Udemy / Colt Steele', date: 'Jul 2024', url: '#' },
];

/* ─────────────────────────────
   RENDER SKILLS
───────────────────────────── */
function renderSkills(groupId, arr) {
  const el = document.getElementById(groupId);
  arr.forEach(s => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `<span class="sk-icon">${s.icon}</span><div class="sk-name">${s.name}</div><div class="sk-bar"><div class="sk-fill" data-w="${s.level}%"></div></div>`;
    card.addEventListener('mousemove', tilt3d);
    card.addEventListener('mouseleave', resetTilt);
    el.appendChild(card);
  });
}
renderSkills('sg-frontend', SKILLS.frontend);
renderSkills('sg-tools', SKILLS.tools);
renderSkills('sg-concepts', SKILLS.concepts);

/* ─────────────────────────────
   RENDER PROJECTS
───────────────────────────── */
const pg = document.getElementById('projects-grid');
PROJECTS.forEach((p, i) => {
  const tagsHtml = p.tags.map((t, j) => `<span class="ptag ${p.tagStyles[j] || ''}">${t}</span>`).join('');
  const card = document.createElement('div');
  card.className = 'proj-card fi' + (i > 0 ? ' d' + (i + 1) : '');
  card.innerHTML = `
    <div class="proj-thumb">
      <div class="proj-thumb-bg" style="background:${p.bg};position:absolute;inset:0;"></div>
      <span style="position:relative;z-index:1;filter:drop-shadow(0 0 18px rgba(124,58,237,.6))">${p.emoji}</span>
    </div>
    <div class="proj-body">
      <div class="proj-tags">${tagsHtml}</div>
      <div class="proj-name">${p.name}</div>
      <div class="proj-desc">${p.desc}</div>
      <div class="proj-links">
        <a href="${p.github}" target="_blank" rel="noopener" class="p-btn">🐙 GitHub</a>
        <a href="${p.demo}" target="_blank" rel="noopener" class="p-btn live">🚀 Live Demo</a>
      </div>
      <button class="detail-btn" onclick="openModal(${p.id})">— View Details —</button>
    </div>`;
  card.addEventListener('mousemove', tilt3d);
  card.addEventListener('mouseleave', resetTilt);
  pg.appendChild(card);
});

/* ─────────────────────────────
   MODAL
───────────────────────────── */
function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  const feats = p.details.features.map(f => `<li>${f}</li>`).join('');
  document.getElementById('modal-body').innerHTML = `
    <span class="modal-emoji">${p.emoji}</span>
    <div class="modal-title">${p.name}</div>
    <div class="modal-sub">${p.tags.join(' · ')}</div>
    <div class="modal-sec"><h4>Overview</h4><p>${p.details.full}</p></div>
    <div class="modal-sec"><h4>Key Features</h4><ul class="feat-list">${feats}</ul></div>
    <div class="modal-sec"><h4>Tech Stack</h4><p style="font-family:var(--font-mono);font-size:13px;color:var(--cyan)">${p.details.stack}</p></div>
    <div class="modal-footer">
      <a href="${p.github}" target="_blank" rel="noopener" class="p-btn">🐙 GitHub</a>
      <a href="${p.demo}" target="_blank" rel="noopener" class="p-btn live">🚀 Live Demo</a>
    </div>`;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
document.getElementById('modal-close').onclick = closeModal;
document.getElementById('modal-overlay').onclick = e => { if (e.target === document.getElementById('modal-overlay')) closeModal(); };
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ─────────────────────────────
   RENDER CERTS
───────────────────────────── */
const cg = document.getElementById('certs-grid');
CERTS.forEach((c, i) => {
  const el = document.createElement('div');
  el.className = 'cert-card fi d' + (i + 1);
  el.innerHTML = `
    <div class="cert-icon">${c.icon}</div>
    <div class="cert-title">${c.title}</div>
    <div class="cert-issuer">${c.issuer}</div>
    <div class="cert-date">${c.date}</div>
    <a href="${c.url}" target="_blank" rel="noopener" class="view-cert-btn">↗ View Certificate</a>`;
  cg.appendChild(el);
});


/* ─────────────────────────────
   SMOOTH SCROLL HELPER
───────────────────────────── */
function smoothTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = a.getAttribute('href').slice(1);
    const el = document.getElementById(target);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ─────────────────────────────
   ACTIVE NAV + SCROLL PROGRESS
───────────────────────────── */
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const spb = document.getElementById('spb');
function onScroll() {
  const y = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  spb.style.width = (y / total * 100) + '%';
  let cur = '';
  sections.forEach(s => {
    if (y >= s.offsetTop - 100) cur = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });

/* ─────────────────────────────
   INTERSECTION OBSERVER (fade-in + skill bars)
───────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('on');
    e.target.querySelectorAll('.sk-fill').forEach(b => { b.style.width = b.dataset.w; });
  });
}, { threshold: .12 });
document.querySelectorAll('.fi').forEach(el => io.observe(el));

/* ─────────────────────────────
   3D TILT
───────────────────────────── */
function tilt3d(e) {
  const r = this.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5;
  const y = (e.clientY - r.top) / r.height - .5;
  this.style.transform = `perspective(700px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateY(-8px)`;
}
function resetTilt() { this.style.transform = ''; }

/* ─────────────────────────────
   CUSTOM CURSOR
───────────────────────────── */
const cur = document.getElementById('cur');
const curR = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * .12; ry += (my - ry) * .12;
  curR.style.left = rx + 'px'; curR.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.skill-card,.proj-card,.cert-card,.num-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('big'); curR.classList.add('big'); });
  el.addEventListener('mouseleave', () => { cur.classList.remove('big'); curR.classList.remove('big'); });
});

/* ─────────────────────────────
   TYPING ANIMATION
───────────────────────────── */
const phrases = ['Frontend Developer', 'MERN Stack Learner', 'AI Enthusiast', 'UI/UX Craftsman', 'React Developer'];
let pi = 0, ci = 0, del = false;
const tout = document.getElementById('typing-out');
function typeTick() {
  const cur2 = phrases[pi];
  if (!del) { tout.textContent = cur2.slice(0, ++ci); if (ci === cur2.length) { del = true; setTimeout(typeTick, 1700); return; } }
  else { tout.textContent = cur2.slice(0, --ci); if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; } }
  setTimeout(typeTick, del ? 45 : 88);
}
setTimeout(typeTick, 900);

/* ─────────────────────────────
   THREE.JS HERO BACKGROUND
───────────────────────────── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  const R = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  R.setPixelRatio(Math.min(devicePixelRatio, 2));
  R.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, .1, 1000);
  cam.position.z = 6;

  // Ambient + point lights
  scene.add(new THREE.AmbientLight(0x7c3aed, .6));
  const pl1 = new THREE.PointLight(0x00e5ff, 3, 14);
  pl1.position.set(4, 4, 4);
  scene.add(pl1);
  const pl2 = new THREE.PointLight(0x7c3aed, 3, 14);
  pl2.position.set(-4, -4, -2);
  scene.add(pl2);

  // Particle sphere cloud
  const N = 2000;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.5 + Math.random() * 2;
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
    const t = Math.random();
    if (t < .5) { col[i * 3] = 0; col[i * 3 + 1] = .9; col[i * 3 + 2] = 1; }
    else { col[i * 3] = .49; col[i * 3 + 1] = .23; col[i * 3 + 2] = .93; }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: .028, vertexColors: true, transparent: true, opacity: .85 }));
  scene.add(pts);

  // Central torus knot (instead of plain sphere)
  const tkg = new THREE.TorusKnotGeometry(1, .35, 128, 16);
  const tkm = new THREE.MeshPhongMaterial({
    color: 0x7c3aed, emissive: 0x7c3aed, emissiveIntensity: .25,
    wireframe: true, transparent: true, opacity: .22,
  });
  const tk = new THREE.Mesh(tkg, tkm);
  scene.add(tk);

  // Inner solid knot
  const tki = new THREE.Mesh(
    new THREE.TorusKnotGeometry(.6, .18, 80, 12),
    new THREE.MeshPhongMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: .3, wireframe: true, transparent: true, opacity: .18 })
  );
  scene.add(tki);

  // Floating rings
  const ringM = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: .2, side: THREE.DoubleSide });
  [.8, 1.3, 1.9].forEach((rr, i) => {
    const ring = new THREE.Mesh(new THREE.RingGeometry(rr, rr + .006, 64), ringM.clone());
    ring.rotation.x = Math.PI / (3 + i); ring.rotation.z = Math.PI * i / 4;
    scene.add(ring);
    ring._i = i;
    scene._rings = scene._rings || [];
    scene._rings.push(ring);
  });

  let mx3 = 0, my3 = 0;
  document.addEventListener('mousemove', e => { mx3 = (e.clientX / innerWidth - .5) * 2; my3 = (e.clientY / innerHeight - .5) * 2; });

  let t = 0;
  (function loop() {
    requestAnimationFrame(loop); t += .004;
    pts.rotation.y = t * .12; pts.rotation.x = Math.sin(t * .07) * .15;
    tk.rotation.x = t * .25 + my3 * .4; tk.rotation.y = t * .35 + mx3 * .4;
    tki.rotation.x = -t * .4; tki.rotation.y = t * .5;
    (scene._rings || []).forEach((r, i) => { r.rotation.z += .0015 * (i + 1); });
    cam.position.x += (mx3 * .4 - cam.position.x) * .04;
    cam.position.y += (-my3 * .4 - cam.position.y) * .04;
    cam.lookAt(0, 0, 0);
    pl1.position.x = Math.sin(t) * 4; pl1.position.z = Math.cos(t) * 4;
    R.render(scene, cam);
  })();

  window.addEventListener('resize', () => {
    cam.aspect = innerWidth / innerHeight;
    cam.updateProjectionMatrix();
    R.setSize(innerWidth, innerHeight);
  });
})();

/* ─────────────────────────────
   LOADER DISMISS
───────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('out'), 2400);
});