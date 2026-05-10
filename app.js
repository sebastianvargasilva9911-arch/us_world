/* ═══════════════════════════════════════════════════════
   NUESTRO MUNDO — app.js
   Con Supabase, animaciones Minecraft y magia romántica
   ═══════════════════════════════════════════════════════ */

// ─── SUPABASE CONFIG ────────────────────────────────────
// 👇 Reemplaza estos valores con los tuyos de Supabase
const SUPABASE_URL    = 'https://izyhxmtkrwcibqieokhj.supabase.co';
const SUPABASE_ANON   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6eWh4bXRrcndjaWJxaWVva2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTYxMDcsImV4cCI6MjA5Mzk5MjEwN30.hsDad0eQT0he2RRZFSpT7WOpDAgJuYcTVWIObrpq_zU';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON);

// ─── PALETAS DE FONDO ────────────────────────────────────
const PALETAS = [
  { id: 'noche-magica',  n: 'Noche Mágica',  css: 'linear-gradient(135deg,#0a0614 0%,#1a0a2e 50%,#0a0614 100%)' },
  { id: 'amor-rojo',     n: 'Amor Rojo',      css: 'linear-gradient(135deg,#1a0a0e 0%,#3d0c1a 50%,#1a0a0e 100%)' },
  { id: 'sueño-rosa',    n: 'Sueño Rosa',     css: 'linear-gradient(135deg,#14051a 0%,#3d1a2d 50%,#14051a 100%)' },
  { id: 'cosmos',        n: 'Cosmos',         css: 'linear-gradient(135deg,#020814 0%,#0a1a3d 50%,#020814 100%)' },
  { id: 'diamante',      n: 'Diamante',       css: 'linear-gradient(135deg,#021a1a 0%,#0a2e2e 50%,#021a1a 100%)' },
  { id: 'esmeralda',     n: 'Esmeralda',      css: 'linear-gradient(135deg,#020f05 0%,#0a2e10 50%,#020f05 100%)' },
  { id: 'oro',           n: 'Oro Mágico',     css: 'linear-gradient(135deg,#1a0f00 0%,#3d2a00 50%,#1a0f00 100%)' },
  { id: 'pixel-negro',   n: 'Pixel Negro',    css: 'linear-gradient(135deg,#050505 0%,#151515 50%,#050505 100%)' },
];

const LABELS = {
  'recuerda-ti':    '🎵 "Esta canción me recuerda a ti"',
  'recuerda-letra': '✍ "Esta letra me recuerda a ti"',
  'pienso':         '💭 "Cuando te pienso..."',
  'te-amo':         '♥ "Te amo tanto..."',
};

const TIPO_COLORS = {
  poema:  ['#ff6b9d', '#d4a8ff'],
  foto:   ['#5DE8F5', '#85B7EB'],
  video:  ['#4EE88A', '#97C459'],
  meme:   ['#F5C542', '#EF9F27'],
  musica: ['#ff9d5c', '#F5C542'],
};

const TIPO_BADGES = {
  poema:  ['POEMA',  'b-poema'],
  foto:   ['FOTO',   'b-foto'],
  video:  ['VIDEO',  'b-video'],
  meme:   ['MEME',   'b-meme'],
  musica: ['MÚSICA', 'b-musica'],
};

// ─── ESTADO ─────────────────────────────────────────────
let E = {
  user:     'yo',
  nombres:  { yo: 'TÚ', ella: 'ELLA' },
  fvista:   null,
  fnovia:   null,
  fondos:   { yo: 'noche-magica', ella: 'amor-rojo' },
  ok:       false,
};

let filtroAct  = 'todos';
let archB64    = null;
let archType   = null;
let archName   = null;

// ─────────────────────────────────────────────────────────
//  SPLASH — CANVAS DE ESTRELLAS
// ─────────────────────────────────────────────────────────
const starsCv  = document.getElementById('stars-canvas');
const starsCx  = starsCv.getContext('2d');
let   starParts = [];

function resizeStarsCv() {
  starsCv.width  = starsCv.offsetWidth;
  starsCv.height = starsCv.offsetHeight;
}

function mkStarPart() {
  const icons  = ['♥','★','✦','◆','▲','❋','✿','♦','·','*'];
  const colors = ['#ff6b9d','#d4a8ff','#ffe066','#5DE8F5','#4EE88A','#ff9d5c'];
  return {
    x:     Math.random() * starsCv.width,
    y:     starsCv.height + 10,
    icon:  icons[Math.random() * icons.length | 0],
    color: colors[Math.random() * colors.length | 0],
    size:  Math.random() * 10 + 6,
    vy:    -(Math.random() * 1.2 + 0.4),
    vx:    (Math.random() - 0.5) * 1.0,
    life:  1,
    decay: Math.random() * 0.003 + 0.001,
  };
}

function animStars() {
  starsCx.clearRect(0, 0, starsCv.width, starsCv.height);
  if (Math.random() < 0.1) starParts.push(mkStarPart());
  starParts = starParts.filter(p => {
    p.x += p.vx; p.y += p.vy; p.life -= p.decay;
    if (p.life <= 0 || p.y < -20) return false;
    starsCx.globalAlpha = p.life;
    starsCx.fillStyle   = p.color;
    starsCx.font        = `${p.size}px "Press Start 2P", monospace`;
    starsCx.textAlign   = 'center';
    starsCx.fillText(p.icon, p.x, p.y);
    return true;
  });
  starsCx.globalAlpha = 1;
  if (!document.getElementById('splash').classList.contains('hidden')) {
    requestAnimationFrame(animStars);
  }
}

resizeStarsCv();
window.addEventListener('resize', resizeStarsCv);
animStars();

// ─────────────────────────────────────────────────────────
//  SPLASH — PAREJITA CAMINANDO
// ─────────────────────────────────────────────────────────
const boyC   = document.getElementById('boy-c');
const girlC  = document.getElementById('girl-c');
const boyCtx = boyC.getContext('2d');
const girlCtx= girlC.getContext('2d');

boyC.style.width   = '32px'; boyC.style.height   = '44px';
girlC.style.width  = '32px'; girlC.style.height  = '44px';

function drawBoy(ctx, f) {
  ctx.clearRect(0, 0, 24, 32);
  const lp = f % 2;

  // Hair
  ctx.fillStyle = '#8B5E3C';
  [[2,0],[3,0],[4,0],[5,0],[6,0],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1]]
    .forEach(([x,y]) => ctx.fillRect(x, y, 1, 1));

  // Face
  ctx.fillStyle = '#FFB87A';
  [[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],
   [1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],
   [1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],
   [2,5],[3,5],[4,5],[5,5],[6,5],[7,5]].forEach(([x,y]) => ctx.fillRect(x,y,1,1));

  // Eyes
  ctx.fillStyle = '#2C1810';
  [[3,3],[6,3]].forEach(([x,y]) => ctx.fillRect(x,y,1,1));

  // Body
  ctx.fillStyle = '#3A6BC4';
  [[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],
   [1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],
   [1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],
   [2,9],[3,9],[4,9],[5,9],[6,9],[7,9]].forEach(([x,y]) => ctx.fillRect(x,y,1,1));

  // Arms
  ctx.fillStyle = '#FFB87A';
  if (lp === 0) { [[0,7],[0,8],[9,7],[9,8]].forEach(([x,y]) => ctx.fillRect(x,y,1,1)); }
  else          { [[0,6],[0,7],[9,8],[9,9]].forEach(([x,y]) => ctx.fillRect(x,y,1,1)); }

  // Pants
  ctx.fillStyle = '#1A3A6A';
  [[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[2,11],[3,11],[4,11],[5,11],[6,11],[7,11]]
    .forEach(([x,y]) => ctx.fillRect(x,y,1,1));

  // Legs & shoes
  ctx.fillStyle = '#1A3A6A';
  if (lp === 0) {
    [[2,12],[3,12],[2,13],[3,13],[5,11],[6,11],[5,12],[6,12],[5,13],[6,13]].forEach(([x,y]) => ctx.fillRect(x,y,1,1));
    ctx.fillStyle = '#2C1810';
    [[2,14],[3,14],[4,14],[5,14],[6,14],[7,14]].forEach(([x,y]) => ctx.fillRect(x,y,1,1));
  } else {
    [[2,11],[3,11],[2,12],[3,12],[2,13],[3,13],[5,12],[6,12],[5,13],[6,13]].forEach(([x,y]) => ctx.fillRect(x,y,1,1));
    ctx.fillStyle = '#2C1810';
    [[2,14],[3,14],[4,14],[5,14],[5,13],[6,13],[7,13]].forEach(([x,y]) => ctx.fillRect(x,y,1,1));
  }
}

function drawGirl(ctx, f) {
  ctx.clearRect(0, 0, 24, 32);
  const lp = (f + 1) % 2;

  // Hair
  ctx.fillStyle = '#3C1F0A';
  [[2,0],[3,0],[4,0],[5,0],[6,0],
   [1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],
   [0,2],[1,2],[7,2],[8,2],[0,3],[1,3],[7,3],[8,3],
   [0,4],[1,4],[7,4],[8,4],[0,5],[1,5],[7,5],[8,5],
   [0,6],[0,7],[8,6],[8,7]].forEach(([x,y]) => ctx.fillRect(x,y,1,1));

  // Face
  ctx.fillStyle = '#FFB87A';
  [[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],
   [2,3],[3,3],[4,3],[5,3],[6,3],[7,3],
   [2,4],[3,4],[4,4],[5,4],[6,4],[7,4],
   [2,5],[3,5],[4,5],[5,5],[6,5],[7,5]].forEach(([x,y]) => ctx.fillRect(x,y,1,1));

  // Eyes + lashes
  ctx.fillStyle = '#2C1810';
  [[3,3],[6,3]].forEach(([x,y]) => ctx.fillRect(x,y,1,1));
  ctx.fillStyle = '#5C3820';
  [[2,2],[3,2],[6,2],[7,2]].forEach(([x,y]) => ctx.fillRect(x,y,1,1));

  // Blush
  ctx.fillStyle = '#FF9999';
  [[2,4],[7,4]].forEach(([x,y]) => ctx.fillRect(x,y,1,1));

  // Dress
  ctx.fillStyle = '#E84080';
  [[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],
   [1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],
   [1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],
   [0,9],[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],[9,9],
   [0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10]].forEach(([x,y]) => ctx.fillRect(x,y,1,1));

  // Arms
  ctx.fillStyle = '#FFB87A';
  if (lp === 0) { [[0,7],[0,8],[9,7],[9,8]].forEach(([x,y]) => ctx.fillRect(x,y,1,1)); }
  else          { [[0,6],[0,7],[9,8],[9,9]].forEach(([x,y]) => ctx.fillRect(x,y,1,1)); }

  // Legs & shoes
  ctx.fillStyle = '#FFB87A';
  if (lp === 0) { [[3,11],[4,11],[3,12],[4,12],[5,11],[6,11],[5,12],[6,12]].forEach(([x,y]) => ctx.fillRect(x,y,1,1)); }
  else          { [[3,11],[4,11],[3,12],[4,12],[3,13],[5,11],[6,11],[5,12],[6,12]].forEach(([x,y]) => ctx.fillRect(x,y,1,1)); }
  ctx.fillStyle = '#C02040';
  if (lp === 0) { [[3,13],[4,13],[5,13],[5,13],[6,13],[7,13]].forEach(([x,y]) => ctx.fillRect(x,y,1,1)); }
  else          { [[2,13],[3,13],[4,13],[5,13],[5,12],[6,12],[7,12]].forEach(([x,y]) => ctx.fillRect(x,y,1,1)); }
}

// Walk animation state
let walkProgress  = 0;
let walkFrame     = 0;
let walkAnimId    = null;
let lastTrailTime = 0;
const scene       = document.getElementById('walk-scene');
const coupleWrap  = document.getElementById('couple-wrap');
const pathLine    = document.getElementById('walk-path');
const progTxt     = document.getElementById('walk-progress-txt');

const WALK_MSGS = [
  'construyendo bloques de amor...',
  'sembrando recuerdos...',
  'preparando magia...',
  'casi listos, mi amor...',
  '¡ya llegamos! ♥',
];

function spawnTrailPart(timestamp) {
  if (timestamp - lastTrailTime < 120) return;
  lastTrailTime = timestamp;
  const icons  = ['♥','✨','★','·','◆','✦'];
  const colors = ['#ff6b9d','#d4a8ff','#ffe066','#5DE8F5'];
  const t      = document.createElement('div');
  t.className  = 'trail-particle';
  t.textContent = icons[Math.random() * icons.length | 0];
  t.style.color  = colors[Math.random() * colors.length | 0];
  t.style.left   = (coupleWrap.offsetLeft + Math.random() * 28) + 'px';
  t.style.bottom = (32 + 10 + Math.random() * 20) + 'px';
  t.style.fontSize = (7 + Math.random() * 8) + 'px';
  scene.appendChild(t);
  setTimeout(() => t.remove(), 900);
}

function walkStep(timestamp) {
  spawnTrailPart(timestamp);
  walkFrame++;

  drawBoy(boyCtx,  Math.floor(walkFrame / 7));
  drawGirl(girlCtx, Math.floor(walkFrame / 7));

  const bounce = Math.sin(walkFrame * 0.4) * 2;
  coupleWrap.style.transform = `translateY(${bounce}px)`;

  const sceneW = scene.offsetWidth;
  const targetX = walkProgress * (sceneW - 90) / 100;
  coupleWrap.style.left = targetX + 'px';
  pathLine.style.width  = walkProgress + '%';

  const pct     = Math.round(walkProgress);
  const msgIdx  = Math.min(Math.floor(pct / 25), WALK_MSGS.length - 1);
  progTxt.textContent = WALK_MSGS[msgIdx] + ' ' + pct + '%';

  if (walkProgress < 100) {
    walkAnimId = requestAnimationFrame(walkStep);
  } else {
    coupleWrap.style.display = 'none';
    pathLine.style.display   = 'none';
    progTxt.style.display    = 'none';
    setTimeout(showFinale, 200);
  }
}

// Progress tick
const progInterval = setInterval(() => {
  walkProgress = Math.min(walkProgress + (Math.random() * 1.4 + 0.4), 100);
  if (walkProgress >= 100) clearInterval(progInterval);
}, 55);

requestAnimationFrame(walkStep);

// ─── FINALE ──────────────────────────────────────────────
function showFinale() {
  const finale  = document.getElementById('heart-finale');
  const bigH    = document.getElementById('big-heart');
  const msg     = document.getElementById('finale-msg');
  const btnE    = document.getElementById('btn-entrar');

  finale.style.display = 'flex';

  let size = 10;
  const growI = setInterval(() => {
    size = Math.min(size + 6, 90);
    bigH.style.fontSize  = size + 'px';
    bigH.style.textShadow = `0 0 ${size/3}px #ff6b9d, 0 0 ${size}px rgba(255,107,157,0.3)`;
    if (size >= 90) {
      clearInterval(growI);
      burstConfetti();
      msg.classList.add('show');
      btnE.classList.add('show');
    }
  }, 18);
}

function burstConfetti() {
  const colors = ['#ff6b9d','#d4a8ff','#ffe066','#5DE8F5','#4EE88A','#ff9d5c'];
  const shapes = ['♥','★','◆','▲','●','✦'];
  for (let i = 0; i < 45; i++) {
    const c = document.createElement('div');
    c.className  = 'confetti-piece';
    c.textContent = shapes[Math.random() * shapes.length | 0];
    c.style.color = colors[Math.random() * colors.length | 0];
    c.style.left  = (20 + Math.random() * 60) + '%';
    c.style.top   = (5  + Math.random() * 30) + '%';
    c.style.fontSize = (8 + Math.random() * 14) + 'px';
    c.style.animationDuration = (0.7 + Math.random() * 1.2) + 's';
    c.style.animationDelay    = (Math.random() * 0.4) + 's';
    document.getElementById('splash').appendChild(c);
    setTimeout(() => c.remove(), 2000);
  }
}

// ─────────────────────────────────────────────────────────
//  CONTADORES MÁGICOS
// ─────────────────────────────────────────────────────────
function diasDesde(fecha) {
  if (!fecha) return '???';
  const d = Math.floor((Date.now() - new Date(fecha)) / 86400000);
  return d >= 0 ? d.toLocaleString('es-ES') : '???';
}

function tiempoTotal(fecha) {
  if (!fecha) return '???';
  const ms = Date.now() - new Date(fecha);
  if (ms < 0) return '???';
  const d  = Math.floor(ms / 86400000);
  const h  = Math.floor((ms % 86400000) / 3600000);
  const m  = Math.floor((ms % 3600000)  / 60000);
  return `${d.toLocaleString('es-ES')}d ${h}h ${m}m`;
}

function actualizarContadores() {
  const dv = diasDesde(E.fvista);
  const dn = diasDesde(E.fnovia);

  const elVista = document.getElementById('sc-vista');
  const elNovia = document.getElementById('sc-novia');
  const elTotal = document.getElementById('sc-total');
  const elHDias = document.getElementById('h-dias');

  if (elVista) elVista.textContent = dv === '???' ? '???' : dv + ' días';
  if (elNovia) elNovia.textContent = dn === '???' ? '???' : dn + ' días';
  if (elTotal) elTotal.textContent = tiempoTotal(E.fnovia || E.fvista);
  if (elHDias) elHDias.textContent = dn === '???' ? '0' : diasDesde(E.fnovia);
}

// ─────────────────────────────────────────────────────────
//  ENTRAR A LA APP
// ─────────────────────────────────────────────────────────
async function entrar() {
  // Fade out splash
  const splash = document.getElementById('splash');
  splash.style.transition = 'opacity 0.6s ease';
  splash.style.opacity = '0';
  setTimeout(() => {
    splash.classList.add('hidden');
    starParts = [];
  }, 620);

  // Load config from Supabase
  await loadConfig();

  document.getElementById('app').classList.remove('hidden');
  document.getElementById('app-bg').style.cssText = '';

  if (!E.ok) {
    document.getElementById('setup-overlay').classList.remove('hidden');
  } else {
    iniciar();
  }
}

// ─────────────────────────────────────────────────────────
//  SUPABASE — CONFIGURACIÓN
// ─────────────────────────────────────────────────────────
async function loadConfig() {
  try {
    const { data } = await db.from('config').select('*').eq('id', 1).single();
    if (data) {
      E.nombres.yo   = data.nombre_yo   || E.nombres.yo;
      E.nombres.ella = data.nombre_ella || E.nombres.ella;
      E.fvista       = data.fecha_vista  || null;
      E.fnovia       = data.fecha_novia  || null;
      E.fondos       = data.fondos       ? JSON.parse(data.fondos) : E.fondos;
      E.ok           = data.ok           || false;
    }
  } catch (e) {
    console.warn('Config no encontrada, primera vez:', e.message);
  }
}

async function saveConfigDB() {
  try {
    await db.from('config').upsert({
      id:          1,
      nombre_yo:   E.nombres.yo,
      nombre_ella: E.nombres.ella,
      fecha_vista: E.fvista,
      fecha_novia: E.fnovia,
      fondos:      JSON.stringify(E.fondos),
      ok:          true,
    });
  } catch (e) {
    console.error('Error guardando config:', e);
  }
}

// ─────────────────────────────────────────────────────────
//  SETUP INICIAL
// ─────────────────────────────────────────────────────────
async function guardarSetup() {
  const n1  = document.getElementById('s-n1').value.trim();
  const n2  = document.getElementById('s-n2').value.trim();
  const fv  = document.getElementById('s-fvista').value;
  const fn  = document.getElementById('s-fnovia').value;

  if (!n1 || !n2 || !fv || !fn) { toast('Completa todos los campos 💕'); return; }

  E.nombres.yo   = n1.toUpperCase();
  E.nombres.ella = n2.toUpperCase();
  E.fvista = fv;
  E.fnovia = fn;
  E.ok     = true;

  await saveConfigDB();
  document.getElementById('setup-overlay').classList.add('hidden');
  iniciar();
  toast('¡Nuestro mundo fue creado! ♥');
}

// ─────────────────────────────────────────────────────────
//  INICIAR APP
// ─────────────────────────────────────────────────────────
function iniciar() {
  aplicarFondo();
  actualizarNombres();
  actualizarContadores();
  renderPaletas();
  loadConfigUI();
  cargarPosts();
  cargarSuenos();
  agregarAmbientParticles();
  iniciarHoverSparks();
  setInterval(actualizarContadores, 30000);

  // App background div
  let bg = document.getElementById('app-bg');
  if (!bg) {
    bg = document.createElement('div');
    bg.id = 'app-bg';
    document.getElementById('app').prepend(bg);
  }
  aplicarFondo();
}

function actualizarNombres() {
  document.getElementById('cy-n').textContent = E.nombres.yo;
  document.getElementById('ce-n').textContent = E.nombres.ella;
  const lbl = document.getElementById('cfg-user-lbl');
  if (lbl) lbl.textContent = E.nombres[E.user];
}

function aplicarFondo() {
  const id  = E.fondos[E.user] || 'noche-magica';
  const pal = PALETAS.find(p => p.id === id) || PALETAS[0];
  const bg  = document.getElementById('app-bg');
  if (bg) bg.style.background = pal.css;
  else document.getElementById('app').style.background = pal.css;
}

// ─────────────────────────────────────────────────────────
//  USUARIO
// ─────────────────────────────────────────────────────────
function cambiarUser(u) {
  E.user = u;
  document.getElementById('chip-yo').className   = 'uchip uchip-yo'   + (u==='yo'   ? ' active-yo'   : '');
  document.getElementById('chip-ella').className = 'uchip uchip-ella' + (u==='ella' ? ' active-ella' : '');
  aplicarFondo();
  actualizarNombres();
  renderPaletas();
  saveConfigDB();
}

// ─────────────────────────────────────────────────────────
//  NAVEGACIÓN
// ─────────────────────────────────────────────────────────
function irSec(id, btn) {
  document.querySelectorAll('.sec').forEach(s => s.classList.remove('act'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('act'));
  document.getElementById('sec-' + id).classList.add('act');
  if (btn) btn.classList.add('act');
}

// ─────────────────────────────────────────────────────────
//  PUBLICAR
// ─────────────────────────────────────────────────────────
function tipoCambio() {
  const t = document.getElementById('p-tipo').value;
  const show = (id, vis) => document.getElementById(id).classList.toggle('hidden', !vis);
  show('p-txt-wrap',     t === 'poema');
  show('p-file-wrap',    ['foto','video','meme'].includes(t));
  show('p-spotify-wrap', t === 'musica');
  show('p-label-wrap',   t === 'musica');
  if (['foto','video','meme'].includes(t)) {
    document.getElementById('p-file').accept = t === 'video' ? 'video/*' : 'image/*';
  }
}

function labelCambio() {
  const v = document.getElementById('p-label').value;
  document.getElementById('p-custom-wrap').classList.toggle('hidden', v !== 'custom');
}

function prevFile(inp) {
  const f = inp.files[0];
  if (!f) return;
  archName = f.name;
  archType = f.type;
  const r  = new FileReader();
  r.onload = e => {
    archB64 = e.target.result;
    const c = document.getElementById('p-preview');
    if (f.type.startsWith('video'))
      c.innerHTML = `<video src="${archB64}" class="preview-vid" controls></video>`;
    else
      c.innerHTML = `<img src="${archB64}" class="preview-img" alt="preview">`;
  };
  r.readAsDataURL(f);
}

async function publicar() {
  const t      = document.getElementById('p-tipo').value;
  const txt    = document.getElementById('p-txt').value.trim();
  const lv     = document.getElementById('p-label').value;
  let   label  = '';

  if (lv === 'custom') label = document.getElementById('p-custom-txt').value.trim();
  else if (lv)          label = LABELS[lv] || '';

  if (t === 'poema' && !txt)    { toast('Escribe algo bonito 🌹'); return; }
  if (['foto','video','meme'].includes(t) && !archB64) { toast('Selecciona un archivo 📁'); return; }
  if (t === 'musica' && !document.getElementById('p-sp-n').value.trim()) {
    toast('Escribe el nombre de la canción 🎵'); return;
  }

  const btn = document.getElementById('btn-publicar');
  btn.textContent = '[ PUBLICANDO... ]';
  btn.disabled = true;

  try {
    let archivo_url = null;

    // Upload file to Supabase Storage if exists
    if (archB64 && archName) {
      archivo_url = await subirArchivo(archB64, archName);
    }

    const post = {
      tipo:    t,
      autor:   E.user,
      txt:     txt || null,
      archivo_url,
      arch_type: archType || null,
      label:   label || null,
      likes:   0,
      spotify: t === 'musica' ? JSON.stringify({
        n: document.getElementById('p-sp-n').value.trim(),
        a: document.getElementById('p-sp-a').value.trim(),
        l: document.getElementById('p-sp-l').value.trim(),
      }) : null,
    };

    const { error } = await db.from('posts').insert(post);
    if (error) throw error;

    // Reset form
    document.getElementById('p-txt').value = '';
    ['p-sp-n','p-sp-a','p-sp-l','p-custom-txt'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('p-preview').innerHTML = '';
    document.getElementById('p-file').value = '';
    document.getElementById('p-label').value = '';
    document.getElementById('p-custom-wrap').classList.add('hidden');
    archB64 = null; archType = null; archName = null;

    await cargarPosts();
    irSec('feed', document.querySelector('.nav-btn'));
    document.querySelector('.nav-btn').classList.add('act');
    toast('¡Publicado con amor! ♥');
    burstConfettiSmall();

  } catch(e) {
    console.error(e);
    toast('Error al publicar 😢');
  } finally {
    btn.textContent = '[ PUBLICAR CON AMOR ] ♥';
    btn.disabled = false;
  }
}

async function subirArchivo(b64, nombre) {
  // Convert base64 to blob
  const res   = await fetch(b64);
  const blob  = await res.blob();
  const ext   = nombre.split('.').pop();
  const path  = `${Date.now()}_${Math.random().toString(36).substr(2,6)}.${ext}`;

  // Show progress (simulated)
  const upBar = document.getElementById('upload-progress');
  const fill  = document.getElementById('upload-bar-fill');
  const pct   = document.getElementById('upload-pct');
  upBar.classList.remove('hidden');

  let prog = 0;
  const progI = setInterval(() => {
    prog = Math.min(prog + Math.random() * 15 + 5, 95);
    fill.style.width = prog + '%';
    pct.textContent  = Math.round(prog) + '%';
  }, 200);

  const { data, error } = await db.storage
    .from('media')
    .upload(path, blob, { contentType: blob.type, upsert: false });

  clearInterval(progI);
  fill.style.width = '100%'; pct.textContent = '100%';
  setTimeout(() => upBar.classList.add('hidden'), 800);

  if (error) throw error;

  const { data: { publicUrl } } = db.storage.from('media').getPublicUrl(path);
  return publicUrl;
}

// ─────────────────────────────────────────────────────────
//  RENDER POSTS
// ─────────────────────────────────────────────────────────
let todosLosPosts = [];

async function cargarPosts() {
  const loading = document.getElementById('loading-posts');
  loading.classList.remove('hidden');

  try {
    const { data, error } = await db
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    todosLosPosts = data || [];
    renderPosts();
  } catch(e) {
    console.error(e);
    toast('Error cargando posts 😢');
  } finally {
    loading.classList.add('hidden');
  }
}

function filtrar(f, btn) {
  filtroAct = f;
  document.querySelectorAll('.filtro').forEach(b => b.classList.remove('act'));
  if (btn) btn.classList.add('act');
  renderPosts();
}

function renderPosts() {
  const wrap = document.getElementById('posts-wrap');
  const ps   = filtroAct === 'todos'
    ? todosLosPosts
    : todosLosPosts.filter(p => p.tipo === filtroAct);

  if (!ps.length) {
    wrap.innerHTML = `
      <div class="empty-state">
        <span class="es-icon">💌</span>
        <p>Aquí aparecerán todos<br>los recuerdos que compartan.<br>¡Empieza publicando algo!</p>
      </div>`;
    return;
  }

  wrap.innerHTML = ps.map((p, i) => postHTML(p, i)).join('');

  // Stagger animation
  wrap.querySelectorAll('.post-card').forEach((el, i) => {
    el.style.animationDelay = (i * 0.05) + 's';
  });
}

function postHTML(p, i) {
  const [c1, c2]   = TIPO_COLORS[p.tipo] || ['#ff6b9d','#d4a8ff'];
  const [bn, bc]   = TIPO_BADGES[p.tipo] || ['POST', 'b-poema'];
  const avColor    = p.autor === 'yo' ? '#ff6b9d' : '#ffe066';
  const avLetter   = (E.nombres[p.autor] || p.autor).charAt(0);
  const autorName  = E.nombres[p.autor] || p.autor;
  const fecha      = p.created_at
    ? new Date(p.created_at).toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric' })
    : '';

  let body = '';

  if (p.tipo === 'poema' && p.txt) {
    body += `<div class="post-text">${p.txt}</div>`;
  }

  if (p.archivo_url) {
    if (p.arch_type && p.arch_type.startsWith('video')) {
      body += `<video src="${p.archivo_url}" class="post-vid" controls playsinline></video>`;
    } else {
      body += `<img src="${p.archivo_url}" class="post-img" alt="imagen" onclick="verImagen(this.src)">`;
    }
  }

  if (p.spotify) {
    let sp;
    try { sp = typeof p.spotify === 'string' ? JSON.parse(p.spotify) : p.spotify; } catch { sp = {}; }
    const href = sp.l ? `href="${sp.l}" target="_blank" rel="noopener"` : '';
    body += `
      <a class="spotify-card" ${href}>
        <span class="sp-icon">🎵</span>
        <div>
          <div class="sp-nombre">${sp.n || ''}</div>
          ${sp.a ? `<div class="sp-artista">${sp.a}</div>` : ''}
          ${sp.l ? `<div class="sp-link">Abrir en Spotify ↗</div>` : ''}
        </div>
      </a>`;
  }

  if (p.label) {
    body += `<div class="post-label">${p.label}</div>`;
  }

  return `
    <div class="post-card" style="animation-delay:${i*0.05}s">
      <div class="post-accent" style="--c1:${c1};--c2:${c2};background:repeating-linear-gradient(90deg,${c1} 0 8px,${c2} 8px 16px)"></div>
      <div class="post-head">
        <div class="post-avatar" style="border-color:${avColor};color:${avColor}">${avLetter}</div>
        <div class="post-meta">
          <div class="post-autor">${autorName}</div>
          <div class="post-fecha">${fecha}</div>
        </div>
        <span class="post-badge ${bc}">${bn}</span>
      </div>
      <div class="post-body">${body}</div>
      <div class="post-foot">
        <button class="btn-like" onclick="darLike(${p.id}, this)" title="Me encanta">♥</button>
        <span class="like-cnt" id="lk-${p.id}">${p.likes || 0}</span>
        <button class="btn-del" onclick="borrarPost(${p.id})" title="Borrar">✕</button>
      </div>
    </div>`;
}

async function darLike(id, btn) {
  const post = todosLosPosts.find(p => p.id === id);
  if (!post) return;
  post.likes = (post.likes || 0) + 1;
  const el = document.getElementById('lk-' + id);
  if (el) el.textContent = post.likes;
  btn.classList.add('liked');
  setTimeout(() => btn.classList.remove('liked'), 350);
  sparkBurst(btn);
  await db.from('posts').update({ likes: post.likes }).eq('id', id);
}

async function borrarPost(id) {
  if (!confirm('¿Borrar este recuerdo?')) return;
  const post = todosLosPosts.find(p => p.id === id);
  if (post?.archivo_url) {
    try {
      const path = post.archivo_url.split('/media/')[1];
      if (path) await db.storage.from('media').remove([path]);
    } catch(e) {}
  }
  const { error } = await db.from('posts').delete().eq('id', id);
  if (!error) {
    todosLosPosts = todosLosPosts.filter(p => p.id !== id);
    renderPosts();
    toast('Recuerdo borrado 🗑️');
  }
}

// Image viewer
function verImagen(src) {
  let v = document.getElementById('img-viewer');
  if (!v) {
    v = document.createElement('div');
    v.id = 'img-viewer';
    v.onclick = () => v.classList.add('hidden');
    document.body.appendChild(v);
  }
  v.innerHTML = `<img src="${src}" alt="imagen">`;
  v.classList.remove('hidden');
}

// ─────────────────────────────────────────────────────────
//  SUEÑOS
// ─────────────────────────────────────────────────────────
async function cargarSuenos() {
  try {
    const { data } = await db.from('suenos').select('*').order('created_at', { ascending: true });
    renderSuenos(data || []);
  } catch(e) { console.error(e); }
}

async function addDream() {
  const txt = document.getElementById('d-txt').value.trim();
  const em  = document.getElementById('d-em').value.trim() || '⭐';
  if (!txt) { toast('¿Cuál es nuestro sueño? 💕'); return; }

  const { error } = await db.from('suenos').insert({ txt, emoji: em, done: false, autor: E.user });
  if (!error) {
    document.getElementById('d-txt').value = '';
    document.getElementById('d-em').value  = '';
    cargarSuenos();
    toast('¡Sueño agregado! ⭐');
    burstConfettiSmall();
  }
}

async function toggleDream(id, done) {
  await db.from('suenos').update({ done: !done }).eq('id', id);
  if (!done) toast('¡Sueño cumplido! 🎉♥');
  cargarSuenos();
}

async function borrarDream(id) {
  await db.from('suenos').delete().eq('id', id);
  cargarSuenos();
  toast('Sueño borrado 🗑️');
}

function renderSuenos(list) {
  const tot  = list.length;
  const done = list.filter(d => d.done).length;
  document.getElementById('ds-total').textContent = tot;
  document.getElementById('ds-done').textContent  = done;
  document.getElementById('ds-pend').textContent  = tot - done;

  const wrap = document.getElementById('dreams-list');
  if (!tot) {
    wrap.innerHTML = `<div class="empty-state"><span class="es-icon">⭐</span><p>Aún no tienen sueños guardados.<br>¡Agrega el primero!</p></div>`;
    return;
  }

  wrap.innerHTML = list.map(d => `
    <div class="dream-item">
      <div class="dream-check${d.done ? ' done' : ''}" onclick="toggleDream(${d.id}, ${d.done})">${d.done ? '✓' : ''}</div>
      <span class="dream-emoji">${d.emoji || '⭐'}</span>
      <span class="dream-txt${d.done ? ' done' : ''}">${d.txt}</span>
      <button class="btn-del" onclick="borrarDream(${d.id})">✕</button>
    </div>`).join('');
}

// ─────────────────────────────────────────────────────────
//  CONFIGURACIÓN
// ─────────────────────────────────────────────────────────
function renderPaletas() {
  const wrap = document.getElementById('paletas-wrap');
  if (!wrap) return;
  const act = E.fondos[E.user];
  wrap.innerHTML = PALETAS.map(p => `
    <button class="paleta-btn${p.id === act ? ' sel' : ''}"
      style="background:${p.css}"
      onclick="selFondo('${p.id}')">
      <span>${p.n}</span>
    </button>`).join('');
}

function selFondo(id) {
  E.fondos[E.user] = id;
  aplicarFondo();
  renderPaletas();
  saveConfigDB();
  toast('Fondo actualizado ♥');
}

function loadConfigUI() {
  const n1 = document.getElementById('cfg-n1');
  const n2 = document.getElementById('cfg-n2');
  const fv = document.getElementById('cfg-fv');
  const fn = document.getElementById('cfg-fn');
  if (n1) n1.value = E.nombres.yo;
  if (n2) n2.value = E.nombres.ella;
  if (fv && E.fvista) fv.value = E.fvista;
  if (fn && E.fnovia) fn.value = E.fnovia;
}

async function saveConfig() {
  const n1 = document.getElementById('cfg-n1').value.trim();
  const n2 = document.getElementById('cfg-n2').value.trim();
  const fv = document.getElementById('cfg-fv').value;
  const fn = document.getElementById('cfg-fn').value;

  if (n1) E.nombres.yo   = n1.toUpperCase();
  if (n2) E.nombres.ella = n2.toUpperCase();
  if (fv) E.fvista = fv;
  if (fn) E.fnovia = fn;

  await saveConfigDB();
  actualizarNombres();
  actualizarContadores();
  toast('¡Guardado con amor! ♥');
}

// ─────────────────────────────────────────────────────────
//  ANIMACIONES — HOVER SPARKS EN BOTONES
// ─────────────────────────────────────────────────────────
function sparkBurst(el) {
  const rect    = el.getBoundingClientRect();
  const cx      = rect.left + rect.width  / 2;
  const cy      = rect.top  + rect.height / 2;
  const icons   = ['★','✨','♥','◆','✦','🎵','⭐','💫'];
  const colors  = ['#ff6b9d','#ffe066','#d4a8ff','#5DE8F5','#4EE88A'];
  const cont    = document.getElementById('spark-container');

  for (let i = 0; i < 8; i++) {
    const s    = document.createElement('div');
    s.className = 'spark-burst';
    const angle = (i / 8) * Math.PI * 2;
    const dist  = 28 + Math.random() * 28;
    s.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    s.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    s.textContent  = icons[Math.random() * icons.length | 0];
    s.style.color  = colors[Math.random() * colors.length | 0];
    s.style.left   = cx + 'px';
    s.style.top    = cy + 'px';
    s.style.animationDelay = (i * 0.04) + 's';
    cont.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }
}

function iniciarHoverSparks() {
  document.body.addEventListener('mouseenter', e => {
    const el = e.target;
    if (el.matches('.btn-pixel, .nav-btn, .filtro, .uchip, .paleta-btn, .btn-like, .dream-check')) {
      sparkBurst(el);
    }
  }, true);
}

// ─────────────────────────────────────────────────────────
//  ANIMACIONES — PARTÍCULAS AMBIENTE
// ─────────────────────────────────────────────────────────
function agregarAmbientParticles() {
  const wrap  = document.getElementById('ambient-particles');
  const icons = ['♥','✨','★','◆','·','✦','💕'];
  const cols  = ['#ff6b9d','#d4a8ff','#ffe066','#5DE8F5'];

  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'amb-p';
    p.textContent = icons[Math.random() * icons.length | 0];
    p.style.color = cols[Math.random() * cols.length | 0];
    p.style.left  = Math.random() * 100 + 'vw';
    p.style.fontSize = (10 + Math.random() * 10) + 'px';
    p.style.animationDuration = (12 + Math.random() * 14) + 's';
    p.style.animationDelay    = (Math.random() * -20) + 's';
    wrap.appendChild(p);
  }
}

// ─────────────────────────────────────────────────────────
//  CONFETTI PEQUEÑO (para publicaciones)
// ─────────────────────────────────────────────────────────
function burstConfettiSmall() {
  const colors = ['#ff6b9d','#d4a8ff','#ffe066','#5DE8F5'];
  const shapes = ['♥','★','◆','✦'];
  for (let i = 0; i < 20; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.textContent = shapes[Math.random() * shapes.length | 0];
    c.style.color = colors[Math.random() * colors.length | 0];
    c.style.position = 'fixed';
    c.style.left  = (30 + Math.random() * 40) + 'vw';
    c.style.top   = (10 + Math.random() * 20) + 'vh';
    c.style.fontSize = (8 + Math.random() * 10) + 'px';
    c.style.animationDuration = (0.6 + Math.random() * 1) + 's';
    c.style.animationDelay    = (Math.random() * 0.3) + 's';
    c.style.zIndex = 9990;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1500);
  }
}

// ─────────────────────────────────────────────────────────
//  TOAST
// ─────────────────────────────────────────────────────────
let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

// ─────────────────────────────────────────────────────────
//  REAL-TIME SUPABASE (ver publicaciones en vivo)
// ─────────────────────────────────────────────────────────
function iniciarRealtime() {
  db.channel('posts-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
      cargarPosts();
    })
    .subscribe();

  db.channel('suenos-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'suenos' }, () => {
      cargarSuenos();
    })
    .subscribe();
}

// Init realtime after app loads
document.addEventListener('DOMContentLoaded', () => {
  // Counters update while on splash
  actualizarContadores();
  setInterval(actualizarContadores, 30000);
});

// Start realtime on entrar
const _origEntrar = entrar;
window.entrar = async function() {
  await _origEntrar();
  setTimeout(iniciarRealtime, 2000);
};
