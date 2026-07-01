 const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

const CONTENT = {
  en: {
    "nav.home":"Home","nav.about":"About","nav.apps":"Apps","nav.collections":"Collections","nav.contact":"Contact",
    "hero.kicker":"⭐MOE KYAW AUNG ⭐ANDROID SENIOR DEVELOPER",
    "hero.title":"မိုးကျော်အောင် · Moe Kyaw Aung",
    "hero.desc":"Android Developer with nearly 12 years of hands-on experience building secure, scalable, and user-friendly mobile applications.",
    "stat.years":"Years+","stat.apps":"Apps","stat.repos":"Repos","stat.sat":"Satisfaction %",
    "cta.hire":"Hire Me","cta.explore":"Explore Apps",
    "about.kicker":"Advanced About","about.title":"Developer by passion, learner by nature","about.desc":"I focus on clean architecture, maintainable code, and practical security. Comfortable delivering features end-to-end—from UI to networking, local caching, testing, and release-ready builds.",
    "apps.kicker":"My Create App Collection","apps.title":"Senior-level app examples",
    "collections.kicker":"GitHub Collections","collections.title":"Repository network and pages",
  },
  my: {
    "nav.home":"ပင်မ","nav.about":"အကြောင်း","nav.apps":"App များ","nav.collections":"Collections","nav.contact":"ဆက်သွယ်ရန်",
    "hero.kicker":"⭐မိုးကျော်အောင် ⭐ အန်းဒရွိုက် အဆင့်မြင့် ဖွံ့ဖြိုးရေးသူ",
    "hero.title":"မိုးကျော်အောင် · Moe Kyaw Aung",
    "hero.desc":"Android အက်ပ်များကို လုံခြုံပြီး မျိုးစုံ အသုံးပြုနိုင်သော အတွေ့အကြုံများ ဖန်တီးပေးပါသည်။",
    "stat.years":"နှစ်+","stat.apps":"အက်ပ်များ","stat.repos":"Repo များ","stat.sat":"ကျေနပ်မှု %",
    "cta.hire":"အလုပ်ပေးပါ","cta.explore":"App များ ကြည့်ရန်",
    "about.kicker":"အဆင့်မြင့် အကြောင်းအရာ","about.title":"စိတ်အားထက်သန်သူ တီထွင်သူ","about.desc":"ကျွန်ုပ်သည် clean architecture နှင့် practical security ကို အလေးထားကာ UI မှ Backend အထိ အပြည့်အစုံ features များ ပေးဆောင်နိုင်ပါသည်။",
    "apps.kicker":"App စုစည်းမှု","apps.title":"Senior-level app ဥပမာများ",
    "collections.kicker":"GitHub စုစည်းမှု","collections.title":"Repository network နှင့် pages",
  }
};

const CONFIG = {
  resumeUrl: '#',
  githubAccounts: ['Dev-moe-kyawaung','moekyawaung-tech','Moekyawaung-cyber'],
  autoplayVideo: true
};

function applyLang(lang){
  document.documentElement.lang = lang;
  localStorage.setItem('siteLang', lang);
  $$('.lang-btn').forEach(btn => btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false'));
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (CONTENT[lang]?.[key]) el.textContent = CONTENT[lang][key];
  });
}

function initLang(){
  const saved = localStorage.getItem('siteLang') || 'en';
  $$('.lang-btn').forEach(btn => btn.addEventListener('click', () => applyLang(btn.dataset.lang)));
  applyLang(saved);
}

function initReveal(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('show'); });
  }, {threshold: 0.12});
  $$('.reveal').forEach(el => io.observe(el));
}

function initCounters(){
  $$('.num').forEach(el => {
    const target = +el.dataset.target || 0;
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if(en.isIntersecting){
          let n = 0;
          const step = Math.max(1, Math.ceil(target / 100));
          const t = setInterval(() => {
            n += step;
            if(n >= target){ n = target; clearInterval(t); }
            el.textContent = n.toLocaleString();
          }, 15);
          io.unobserve(el);
        }
      });
    }, {threshold: 0.5});
    io.observe(el);
  });
}

function initCursor(){
  const dot = $('#cursorDot'), ring = $('#cursorRing');
  window.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  });
}

function initParticles(){
  const canvas = $('#bgCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, pts = [];
  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    pts = Array.from({length: 80}, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.7,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    }));
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0 || p.x > w) p.vx *= -1;
      if(p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(97,240,255,.08)';
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize(); draw();
}

function initTheme(){
  const btn = $('#themeToggle');
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    btn.innerHTML = next === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
  });
}

function initMenu(){
  const btn = $('#menuBtn'), menu = $('#navMenu');
  btn?.addEventListener('click', () => {});
}

function initLightbox(){
  const box = $('#lightbox'), media = $('#lbMedia');
  document.addEventListener('click', e => {
    const trg = e.target.closest('[data-light]');
    if(!trg) return;
    const src = trg.dataset.light;
    const type = trg.dataset.type || 'image';
    box.style.display = 'grid';
    media.innerHTML = '';
    if(type === 'video'){
      const v = document.createElement('video');
      v.src = src; v.controls = true; v.autoplay = CONFIG.autoplayVideo; v.style.maxWidth = '92vw'; v.style.maxHeight = '88vh';
      media.appendChild(v);
    } else {
      const img = document.createElement('img');
      img.src = src; img.style.maxWidth = '92vw'; img.style.maxHeight = '88vh'; img.style.borderRadius = '14px';
      media.appendChild(img);
    }
  });
  $('#lbClose').addEventListener('click', () => { box.style.display = 'none'; media.innerHTML = ''; });
  box.addEventListener('click', e => { if(e.target === box){ box.style.display='none'; media.innerHTML=''; }});
}

async function fetchGitHubCards(){
  const host = $('#ghCards');
  for(const user of CONFIG.githubAccounts){
    const card = document.createElement('div');
    card.className = 'gh-card glass';
    card.innerHTML = `<div class="mono fw-bold">${user}</div><div class="mini">Loading…</div>`;
    host.appendChild(card);
    try{
      const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=4&sort=updated`);
      const repos = await res.json();
      card.innerHTML = `<div class="mono fw-bold">${user}</div><div class="mini mb-2">${repos.length} recent repos</div>` +
        repos.map(r => `<div style="border-top:1px solid var(--line);padding:.6rem 0"><a href="${r.html_url}" target="_blank" class="mono">${r.name}</a><div class="mini">${r.description || ''}</div></div>`).join('');
    } catch {
      card.innerHTML = `<div class="mono fw-bold">${user}</div><div class="mini">GitHub data unavailable.</div>`;
    }
  }
}

function initForms(){
  $('#contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    alert('Hook this form to your backend / Formspree / Firebase Functions.');
  });
}

window.addEventListener('load', () => {
  setTimeout(() => $('#preloader').style.display = 'none', 350);
  initLang();
  initReveal();
  initCounters();
  initCursor();
  initParticles();
  initTheme();
  initMenu();
  initLightbox();
  fetchGitHubCards();
  initForms();
});
