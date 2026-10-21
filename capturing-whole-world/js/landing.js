/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * Landing Page Master Controller
 * Direct Reference: jesperlandberg.com (Editorial Minimalism, Motion & Rhythm)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Subsystems
  initLandingLoader();
  initCustomCursor();
  initFilmGrain();
  initSmoothScroll();
  initHeroMotion();
  initStatementWordReveal();
  initProjectExpansion();
  initWorldSection();
  initAudioAmbientEngine();
  initNavbarScroll();
  initLiveTimecode();
});

/**
 * 1. INITIAL LOADING EXPERIENCE
 * Short, elegant loading sequence (~1.5s), opening like a film.
 */
function initLandingLoader() {
  const loader = document.getElementById('landingLoader');
  const heroTitles = document.querySelectorAll('.hero-title-text');

  setTimeout(() => {
    if (loader) {
      loader.classList.add('loaded');
    }
    // Animate hero title text into position
    heroTitles.forEach(t => t.classList.add('loaded'));
  }, 1600);
}

/**
 * 2. CUSTOM CURSOR (DESKTOP ONLY)
 * Default: small dot.
 * Project Hover: expands smoothly into a circle with "VIEW PROJECT".
 */
function initCustomCursor() {
  const coreDot = document.querySelector('.cursor-dot-center');
  const follower = document.querySelector('.cursor-follower-ring');
  const textInside = document.querySelector('.cursor-text-inside');

  // Disable completely on mobile / touch
  const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
  if (isTouch || !coreDot || !follower) return;

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const corePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const followerPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (coreDot.classList.contains('cursor-hidden')) {
      coreDot.classList.remove('cursor-hidden');
      follower.classList.remove('cursor-hidden');
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    coreDot.classList.add('cursor-hidden');
    follower.classList.add('cursor-hidden');
  });

  document.addEventListener('mouseenter', () => {
    coreDot.classList.remove('cursor-hidden');
    follower.classList.remove('cursor-hidden');
  });

  // Dynamic Hover States
  document.addEventListener('mouseover', (e) => {
    const projectTarget = e.target.closest('[data-cursor="project"]');
    const mediaTarget = e.target.closest('[data-cursor="media"]');
    const linkTarget = e.target.closest('a, button, [data-cursor="link"], .clickable');

    if (projectTarget) {
      follower.className = 'cursor-follower-ring hovering-project';
      coreDot.className = 'cursor-dot-center hovering-project';
      textInside.textContent = 'VIEW PROJECT';
    } else if (mediaTarget) {
      follower.className = 'cursor-follower-ring hovering-media';
      coreDot.className = 'cursor-dot-center';
      textInside.textContent = '';
    } else if (linkTarget) {
      follower.className = 'cursor-follower-ring hovering-link';
      coreDot.className = 'cursor-dot-center';
      textInside.textContent = '';
    } else {
      resetCursor();
    }
  });

  document.addEventListener('mouseout', (e) => {
    const interactive = e.target.closest('[data-cursor], a, button');
    if (interactive) {
      resetCursor();
    }
  });

  function resetCursor() {
    follower.className = 'cursor-follower-ring';
    coreDot.className = 'cursor-dot-center';
    textInside.textContent = '';
  }

  // Animation Loop with lerp physics
  function renderCursor() {
    corePos.x += (mouse.x - corePos.x) * 0.45;
    corePos.y += (mouse.y - corePos.y) * 0.45;
    coreDot.style.transform = `translate3d(${corePos.x}px, ${corePos.y}px, 0) translate(-50%, -50%)`;

    followerPos.x += (mouse.x - followerPos.x) * 0.16;
    followerPos.y += (mouse.y - followerPos.y) * 0.16;
    follower.style.transform = `translate3d(${followerPos.x}px, ${followerPos.y}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);
}

/**
 * 3. SMOOTH SCROLLING (Lenis CDN + Fallback)
 */
function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

/**
 * 4. HERO MOTION
 * Mouse parallax displacement, slow image movement, and scroll-based scaling down.
 */
function initHeroMotion() {
  const heroImage = document.querySelector('.hero-image-film-still');
  const heroWrapper = document.querySelector('.hero-wrapper');
  if (!heroImage || !heroWrapper) return;

  // Mouse Parallax on Desktop
  window.addEventListener('mousemove', (e) => {
    if (window.scrollY < window.innerHeight) {
      const xOffset = (e.clientX / window.innerWidth - 0.5) * -22;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * -18;
      heroImage.style.transform = `scale(1.08) translate3d(${xOffset}px, ${yOffset}px, 0)`;
    }
  }, { passive: true });

  // Scroll Transition: Hero image slowly scales down
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    if (scrollY <= windowH * 1.5) {
      // Scale from 1.08 down to 0.95 and translate slightly
      const progress = Math.min(1, scrollY / windowH);
      const scaleVal = 1.08 - progress * 0.12;
      const yVal = scrollY * 0.35;
      heroImage.style.transform = `scale(${scaleVal}) translate3d(0, ${yVal}px, 0)`;
    }
  }, { passive: true });
}

/**
 * 5. INTRODUCTION STATEMENT PROGRESSIVE WORD REVEAL
 * Lines reveal progressively with opacity, vertical translation, and blur-to-sharp transition.
 */
function initStatementWordReveal() {
  const words = document.querySelectorAll('.statement-word');
  if (!words.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        words.forEach((word, index) => {
          setTimeout(() => {
            word.classList.add('revealed');
          }, index * 120);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  const section = document.querySelector('.intro-statement-section');
  if (section) {
    observer.observe(section);
  }
}

/**
 * 6. IMAGE TRANSITION & PROJECT EXPANSION
 * Clicking a project expands the image and opens a seamless in-page short film view.
 */
function initProjectExpansion() {
  const drawer = document.getElementById('projectDrawer');
  const stage = document.getElementById('drawerStage');
  const closeBtn = document.getElementById('drawerCloseBtn');

  if (!drawer || !stage) return;

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-story-slug]');
    if (trigger) {
      e.preventDefault();
      const slug = trigger.getAttribute('data-story-slug');
      openProjectDrawer(slug);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeProjectDrawer());
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeProjectDrawer();
    }
  });

  function openProjectDrawer(slug) {
    const project = window.PROJECTS_DATA.find(p => p.slug === slug);
    if (!project) return;

    stage.innerHTML = `
      <section class="drawer-hero-screen">
        <div class="drawer-hero-media">
          <img src="${project.heroImage}" alt="${project.title}">
        </div>
        <div class="drawer-hero-gradient"></div>

        <div class="drawer-hero-text-block">
          <div class="drawer-meta-pills">
            <span>${project.categoryShort}</span>
            <span>•</span>
            <span>${project.location}</span>
            <span>•</span>
            <span>${project.year}</span>
          </div>

          <h1 class="drawer-title-large">${project.title}</h1>
          <p class="drawer-quote-serif">"${project.tagline}"</p>
        </div>
      </section>

      <div class="container">
        <!-- Blueprint specs -->
        <div style="border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); padding: 3rem 0; margin: 3rem 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 2rem;">
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--color-text-muted); letter-spacing: 0.2em; text-transform: uppercase;">Primary Rig</div>
            <div style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--color-text); margin-top: 0.35rem;">${project.cameraSpecs.camera}</div>
          </div>
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--color-text-muted); letter-spacing: 0.2em; text-transform: uppercase;">Optics</div>
            <div style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--color-text); margin-top: 0.35rem;">${project.cameraSpecs.lenses}</div>
          </div>
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--color-text-muted); letter-spacing: 0.2em; text-transform: uppercase;">Format</div>
            <div style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--color-text); margin-top: 0.35rem;">${project.cameraSpecs.format}</div>
          </div>
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--color-text-muted); letter-spacing: 0.2em; text-transform: uppercase;">Color Grade</div>
            <div style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--color-text); margin-top: 0.35rem;">${project.cameraSpecs.colorProfile}</div>
          </div>
        </div>

        <!-- Synopsis Narrative -->
        <div style="max-width: 840px; margin: 3rem 0 5rem;">
          <span class="section-label-chip">EDITORIAL LOGLINE</span>
          <p style="font-family: var(--font-sans); font-size: 1.25rem; line-height: 1.7; color: var(--color-text-dim); margin-top: 1rem; font-weight: 300;">
            ${project.description}
          </p>
        </div>

        <!-- Mixed Gallery Sequence -->
        <div class="drawer-gallery-sequence">
          ${project.gallery.map(item => {
            if (item.type === 'fullscreen') {
              return `
                <div class="drawer-frame-fullscreen" data-cursor="media">
                  <img src="${item.url}" alt="${item.caption}" loading="lazy">
                  <div class="drawer-image-caption-text container">${item.caption}</div>
                </div>
              `;
            } else if (item.type === 'ultrawide') {
              return `
                <div class="drawer-frame-ultrawide" data-cursor="media">
                  <img src="${item.url}" alt="${item.caption}" loading="lazy">
                  <div class="drawer-image-caption-text">${item.caption}</div>
                </div>
              `;
            } else if (item.type === 'vertical') {
              return `
                <div class="drawer-frame-split">
                  <div class="drawer-frame-vertical" data-cursor="media">
                    <img src="${item.url}" alt="${item.caption}" loading="lazy">
                    <div class="drawer-image-caption-text">${item.caption}</div>
                  </div>
                  <div style="padding: 2rem;">
                    <span class="section-label-chip">ATMOSPHERIC STILL</span>
                    <p style="margin-top: 1rem; font-family: var(--font-sans); color: var(--color-text-dim); line-height: 1.7;">
                      "Captured in raw mountain light. When the elements speak, the camera only listens."
                    </p>
                  </div>
                </div>
              `;
            } else {
              return `
                <div class="drawer-frame-small" data-cursor="media">
                  <img src="${item.url}" alt="${item.caption}" loading="lazy">
                  <div class="drawer-image-caption-text">${item.caption}</div>
                </div>
              `;
            }
          }).join('')}
        </div>

        <!-- Close & Back to Stories -->
        <div style="text-align: center; padding: 4rem 0 8rem; border-top: 1px solid var(--border-subtle);">
          <button class="drawer-close-action" id="drawerBottomCloseBtn" style="margin: 0 auto;">
            <span>← RETURN TO SELECTED STORIES</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('drawerBottomCloseBtn')?.addEventListener('click', closeProjectDrawer);

    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
    drawer.scrollTo({ top: 0, behavior: 'instant' });
    window.history.pushState({ slug }, project.title, `#project/${slug}`);
  }

  function closeProjectDrawer() {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
    window.history.pushState({}, 'Capturing Whole World', '#');
  }
}

/**
 * 7. THE WORLD SECTION (INTERACTIVE LOCATION BACKDROP SWITCHER)
 */
function initWorldSection() {
  const items = document.querySelectorAll('.world-location-item');
  const backdrops = document.querySelectorAll('.world-backdrop-frame');

  if (!items.length || !backdrops.length) return;

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const targetId = item.getAttribute('data-backdrop');

      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      backdrops.forEach(b => {
        if (b.id === targetId) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    });
  });
}

/**
 * 8. AMBIENT AUDIO ENGINE (432Hz Binaural Cinema Drone)
 */
function initAudioAmbientEngine() {
  const btn = document.getElementById('audioToggleBtn');
  const status = document.getElementById('audioStatusText');
  if (!btn) return;

  let ctx = null;
  let isPlaying = false;
  let masterGain = null;
  const oscs = [];

  btn.addEventListener('click', () => {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioCtx();
      masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Low 432Hz harmonic drone layers: 54Hz, 108Hz, 216Hz
      const freqs = [54, 54.4, 108, 162];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        g.gain.setValueAtTime(idx === 0 ? 0.22 : 0.06, ctx.currentTime);
        osc.connect(g);
        g.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });
    }

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (isPlaying) {
      masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      btn.classList.remove('playing');
      if (status) status.textContent = 'SOUND: OFF';
      isPlaying = false;
    } else {
      masterGain.gain.exponentialRampToValueAtTime(0.32, ctx.currentTime + 2.5);
      btn.classList.add('playing');
      if (status) status.textContent = 'SOUND: ON (432Hz)';
      isPlaying = true;
    }
  });
}

/**
 * 9. NAVBAR SCROLL STICKY BLUR
 */
function initNavbarScroll() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * 10. 24.000 FPS TIMECODE GENERATOR
 */
function initLiveTimecode() {
  const tcEl = document.getElementById('liveTimecodeClock');
  if (!tcEl) return;

  let ff = 18;
  let ss = 32;
  let mm = 4;
  let hh = 0;

  setInterval(() => {
    ff++;
    if (ff >= 24) {
      ff = 0;
      ss++;
      if (ss >= 60) {
        ss = 0;
        mm++;
        if (mm >= 60) {
          mm = 0;
          hh++;
        }
      }
    }
    const pad = (n) => String(n).padStart(2, '0');
    tcEl.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
  }, 1000 / 24);
}

/**
 * 11. PROCEDURAL 35MM FILM GRAIN CANVAS
 */
function initFilmGrain() {
  const canvas = document.getElementById('grain-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const patternCanvas = document.createElement('canvas');
  const patternCtx = patternCanvas.getContext('2d');
  const patternSize = 128;
  patternCanvas.width = patternSize;
  patternCanvas.height = patternSize;
  const patternData = patternCtx.createImageData(patternSize, patternSize);
  const pattern32 = new Uint32Array(patternData.data.buffer);

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  let frame = 0;
  function loop() {
    frame++;
    if (frame % 2 === 0) {
      const len = pattern32.length;
      for (let i = 0; i < len; i++) {
        const val = (Math.random() * 255) | 0;
        pattern32[i] = (0x1f << 24) | (val << 16) | (val << 8) | val;
      }
      patternCtx.putImageData(patternData, 0, 0);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pattern = ctx.createPattern(patternCanvas, 'repeat');
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

