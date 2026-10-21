/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * 3D Landing Page Application Orchestrator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize WebGL Three.js Perspective Floor
  const threeScene = new window.GalleryThreeScene();

  // Initialize Optimized Procedural Grain Overlay
  const grainOverlay = initGrainOverlay();

  // Initialize Main Landing / Hero Background Video
  initHeroBackgroundVideo();

  // Initialize 3D Curved Carousel with 8 Projects
  const carousel = new window.Carousel3DEngine(window.PROJECTS_DATA, (slug) => {
    if (slug === 'gym') {
      openGymVideoModal(threeScene, carousel, grainOverlay);
    } else {
      openProjectModal(slug, threeScene, carousel, grainOverlay);
    }
  });

  initCustomCursor();
  initProfileModal(threeScene);
  initContactModal();
  initWhiteProjectModal(threeScene, carousel, grainOverlay);
  initGymVideoModal(threeScene, carousel, grainOverlay);
});

/**
 * 1. CUSTOM MINIMAL CURSOR
 */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const tag = document.querySelector('.cursor-text-tag');

  const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
  if (isTouch || !dot || !ring) return;

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const dotPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  let isCursorHidden = true;
  let cursorRafId = null;
  let currentHoverState = 'default';

  function wakeCursor() {
    if (!cursorRafId) {
      cursorRafId = requestAnimationFrame(loop);
    }
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (isCursorHidden) {
      dot.classList.remove('cursor-hidden');
      ring.classList.remove('cursor-hidden');
      isCursorHidden = false;
    }
    wakeCursor();
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    dot.classList.add('cursor-hidden');
    ring.classList.add('cursor-hidden');
    isCursorHidden = true;
  });

  document.addEventListener('mouseenter', () => {
    dot.classList.remove('cursor-hidden');
    ring.classList.remove('cursor-hidden');
    isCursorHidden = false;
    wakeCursor();
  });

  function setCursorState(state) {
    if (currentHoverState === state) return;
    currentHoverState = state;
    if (state === 'view') {
      ring.className = 'cursor-ring is-project-hover';
      dot.className = 'cursor-dot is-project-hover';
      tag.textContent = 'VIEW';
    } else if (state === 'rotate') {
      ring.className = 'cursor-ring is-project-hover';
      dot.className = 'cursor-dot is-project-hover';
      tag.textContent = 'ROTATE';
    } else if (state === 'link') {
      ring.className = 'cursor-ring is-link-hover';
      dot.className = 'cursor-dot';
      tag.textContent = '';
    } else {
      ring.className = 'cursor-ring';
      dot.className = 'cursor-dot';
      tag.textContent = '';
    }
  }

  document.addEventListener('mouseover', (e) => {
    const centerPanel = e.target.closest('.carousel-panel.is-center');
    if (centerPanel) {
      setCursorState('view');
      return;
    }
    const sidePanel = e.target.closest('.carousel-panel:not(.is-center)');
    if (sidePanel) {
      setCursorState('rotate');
      return;
    }
    const linkTarget = e.target.closest('a, button, [role="button"], .toggle-choice');
    if (linkTarget) {
      setCursorState('link');
      return;
    }
    setCursorState('default');
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.carousel-panel, a, button, [role="button"], .toggle-choice')) {
      setCursorState('default');
    }
  }, { passive: true });

  function loop() {
    const dx = mouse.x - dotPos.x;
    const dy = mouse.y - dotPos.y;
    const rx = mouse.x - ringPos.x;
    const ry = mouse.y - ringPos.y;

    let hasMoved = false;

    if (Math.abs(dx) > 0.08 || Math.abs(dy) > 0.08) {
      dotPos.x += dx * 0.45;
      dotPos.y += dy * 0.45;
      dot.style.transform = `translate3d(${dotPos.x.toFixed(1)}px, ${dotPos.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      hasMoved = true;
    }

    if (Math.abs(rx) > 0.08 || Math.abs(ry) > 0.08) {
      ringPos.x += rx * 0.16;
      ringPos.y += ry * 0.16;
      ring.style.transform = `translate3d(${ringPos.x.toFixed(1)}px, ${ringPos.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      hasMoved = true;
    }

    if (hasMoved) {
      cursorRafId = requestAnimationFrame(loop);
    } else {
      cursorRafId = null;
    }
  }
}

/**
 * 2. PROFILE EXPERIENCE OVERLAY
 * Keeps 3D environment visible in background with interactive liquid chrome sphere.
 */
function initProfileModal(threeScene) {
  const openBtn = document.getElementById('openProfileBtn');
  const closeBtn = document.getElementById('closeProfileBtn');
  const modal = document.getElementById('profileModal');

  if (!openBtn || !closeBtn || !modal) return;

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    window.__isModalActive = true;
    if (threeScene) threeScene.showProfileSphere(true);
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    window.__isModalActive = false;
    if (threeScene) threeScene.showProfileSphere(false);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      window.__isModalActive = false;
      if (threeScene) threeScene.showProfileSphere(false);
    }
  });
}

/**
 * 3. CONTACT EXPERIENCE OVERLAY
 */
function initContactModal() {
  const openBtn = document.getElementById('openContactBtn');
  const closeBtn = document.getElementById('closeContactBtn');
  const modal = document.getElementById('contactModal');

  if (!openBtn || !closeBtn || !modal) return;

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    window.__isModalActive = true;
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    window.__isModalActive = false;
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      window.__isModalActive = false;
    }
  });

  // Contact form handler
  const form = document.getElementById('contactTransmissionForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('.contact-submit-btn');
      submitBtn.textContent = 'TRANSMITTING...';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = 'TRANSMISSION CONFIRMED ✓';
        setTimeout(() => {
          submitBtn.textContent = 'SEND INQUIRY';
          submitBtn.disabled = false;
          modal.classList.remove('active');
          window.__isModalActive = false;
        }, 1500);
      }, 1000);
    });
  }
}

/**
 * 4. PROJECT OPENING EXPERIENCE (FLOATING WHITE CONTAINER 92–95% VIEWPORT)
 */
function initWhiteProjectModal(threeScene, carousel, grainOverlay) {
  const overlay = document.getElementById('projectWhiteOverlay');
  const closeBtn = document.getElementById('blackCloseBtn');

  if (!overlay || !closeBtn) return;

  const closeModal = () => {
    overlay.classList.remove('active');
    window.__isModalActive = false;
    document.body.style.overflow = '';
    if (threeScene) threeScene.pauseRendering(false);
    if (carousel) carousel.pause(false);
    if (grainOverlay) grainOverlay.pause(false);
  };

  closeBtn.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });

  window.__cwCloseProjectModal = closeModal;
}

/**
 * 4B. DEDICATED GYM VIDEO EXPERIENCE
 * Immersive Theatrical Cinema View with Autoplay, Muted Fallback & Seamless Unmute
 */
let __gymVideoModalInitialized = false;

function initGymVideoModal(threeScene, carousel, grainOverlay) {
  if (__gymVideoModalInitialized) return;
  __gymVideoModalInitialized = true;

  const overlay = document.getElementById('gymVideoOverlay');
  const closeBtn = document.getElementById('gymVideoCloseBtn');
  const returnBtn = document.getElementById('gymReturnGalleryBtn');
  const video = document.getElementById('gymPlayerVideo');
  const unmutePill = document.getElementById('gymAudioUnmutePill');

  if (!overlay || !video) return;

  const closeGymModal = () => {
    if (!overlay.classList.contains('active')) return;

    // Pause gym video and reset
    video.pause();
    video.currentTime = 0;
    if (unmutePill) unmutePill.classList.remove('visible');

    overlay.classList.remove('active');
    window.__isModalActive = false;
    document.body.style.overflow = '';

    // Resume background hero video if it was playing
    const heroBgVideo = document.getElementById('heroBackgroundVideo');
    if (heroBgVideo && heroBgVideo.__wasPlayingBeforeGym) {
      heroBgVideo.play().catch(() => {});
      heroBgVideo.__wasPlayingBeforeGym = false;
    }

    // Resume 3D perspective floor, carousel, and grain
    if (threeScene) threeScene.pauseRendering(false);
    if (carousel) carousel.pause(false);
    if (grainOverlay) grainOverlay.pause(false);
  };

  closeBtn?.addEventListener('click', closeGymModal);
  returnBtn?.addEventListener('click', closeGymModal);

  // Close when clicking directly on overlay backdrop (outside theater container)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeGymModal();
    }
  });

  // Escape key handler
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeGymModal();
    }
  });

  // Unmute interaction handler
  const enableSound = () => {
    video.muted = false;
    video.volume = 1.0;
    if (unmutePill) unmutePill.classList.remove('visible');
  };

  unmutePill?.addEventListener('click', (e) => {
    e.stopPropagation();
    enableSound();
  });

  video.addEventListener('click', () => {
    if (video.muted) {
      enableSound();
    }
  });

  window.__cwCloseGymModal = closeGymModal;
}

function openGymVideoModal(threeScene, carousel, grainOverlay) {
  const overlay = document.getElementById('gymVideoOverlay');
  const video = document.getElementById('gymPlayerVideo');
  const unmutePill = document.getElementById('gymAudioUnmutePill');

  if (!overlay || !video) return;

  window.__isModalActive = true;

  // Pause 3D WebGL perspective grid, carousel and grain
  if (threeScene) threeScene.pauseRendering(true);
  if (carousel) carousel.pause(true);
  if (grainOverlay) grainOverlay.pause(true);

  // Coordinate background hero video: pause so audio does not clash
  const heroBgVideo = document.getElementById('heroBackgroundVideo');
  if (heroBgVideo && !heroBgVideo.paused) {
    heroBgVideo.__wasPlayingBeforeGym = true;
    heroBgVideo.pause();
  }

  // Display overlay
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Video Autoplay with sound attempt, falling back to muted autoplay
  video.currentTime = 0;
  video.muted = false;
  video.volume = 1.0;

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      // Autoplay with sound succeeded
      if (unmutePill) unmutePill.classList.remove('visible');
    }).catch(() => {
      // Browser blocked unmuted autoplay -> start muted autoplay as fallback
      video.muted = true;
      video.play().catch((err) => {
        console.warn('Muted autoplay also blocked:', err);
      });
      if (unmutePill) unmutePill.classList.add('visible');
    });
  }
}

function openProjectModal(slug, threeScene, carousel, grainOverlay) {
  if (slug === 'gym') {
    openGymVideoModal(threeScene, carousel, grainOverlay);
    return;
  }

  const project = window.PROJECTS_DATA.find(p => p.slug === slug);
  if (!project) return;

  const overlay = document.getElementById('projectWhiteOverlay');
  const container = document.getElementById('projectEditorialContainer');
  if (!overlay || !container) return;

  window.__isModalActive = true;

  // Pause background 3D WebGL and carousel for 100% smooth editorial scrolling
  if (threeScene) threeScene.pauseRendering(true);
  if (carousel) carousel.pause(true);
  if (grainOverlay) grainOverlay.pause(true);

  // Build the rich editorial magazine layout inside floating white container
  container.innerHTML = `
    <div class="project-modal-editorial-body">
      <!-- Header Grid -->
      <div class="project-modal-header-grid">
        <div class="modal-left-meta-stack">
          <div class="modal-category-year-tag">${project.category} // ${project.location} // ${project.year}</div>
          <h1 class="modal-project-headline">${project.title}</h1>
        </div>

        <div class="modal-right-logline-block">
          <p class="modal-logline-text">"${project.logline}"</p>
          <p class="modal-synopsis-text">${project.description}</p>
        </div>
      </div>

      <!-- Mixed Editorial Image Sequence -->
      <div class="modal-editorial-gallery">
        ${project.gallery.map((item, idx) => {
          if (item.aspect === 'cinematic') {
            return `
              <div class="editorial-img-cinematic">
                <img src="${item.url}" alt="${item.caption}" loading="${idx < 2 ? 'eager' : 'lazy'}">
                <div class="editorial-caption-line">${item.caption}</div>
              </div>
            `;
          } else if (item.aspect === 'vertical') {
            return `
              <div class="editorial-split-duo">
                <div class="editorial-img-vertical">
                  <img src="${item.url}" alt="${item.caption}" loading="lazy">
                  <div class="editorial-caption-line">${item.caption}</div>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: center; padding: clamp(1rem, 3vw, 2rem);">
                  <span style="font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: #999;">DIRECTOR'S BLUEPRINT</span>
                  <h3 style="font-family: var(--font-display); font-size: clamp(1.6rem, 3vw, 2.2rem); text-transform: uppercase; margin: 1rem 0; color: #111;">LIGHT &amp; COMPOSITION</h3>
                  <p style="font-family: var(--font-sans); color: #555; line-height: 1.7; font-size: clamp(0.95rem, 1.2vw, 1.05rem);">
                    "Natural light is not a constraint—it is the narrative voice. When moving across Himalayan altitudes, the frame breathes with the elements."
                  </p>
                </div>
              </div>
            `;
          } else if (item.aspect === 'square') {
            return `
              <div class="editorial-split-duo">
                <div class="editorial-img-square">
                  <img src="${item.url}" alt="${item.caption}" loading="lazy">
                  <div class="editorial-caption-line">${item.caption}</div>
                </div>
                <div class="editorial-img-square">
                  <img src="${project.heroImage}" alt="${project.title}" loading="lazy">
                  <div class="editorial-caption-line">Production Still // ${project.location}</div>
                </div>
              </div>
            `;
          } else {
            return `
              <div class="editorial-img-fullwidth">
                <img src="${item.url}" alt="${item.caption}" loading="lazy">
                <div class="editorial-caption-line">${item.caption}</div>
              </div>
            `;
          }
        }).join('')}
      </div>

      <!-- Modal Bottom Return Action -->
      <div style="text-align: center; padding: 4rem 0 2rem; border-top: 1px solid rgba(10,10,10,0.1);">
        <button id="modalBottomCloseBtn" style="font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.22em; text-transform: uppercase; background: #0A0A0A; color: #FFF; padding: 1rem 2.5rem; border-radius: 999px; border: none; cursor: pointer;">
          ← RETURN TO 3D GALLERY
        </button>
      </div>
    </div>
  `;

  document.getElementById('modalBottomCloseBtn')?.addEventListener('click', () => {
    if (window.__cwCloseProjectModal) {
      window.__cwCloseProjectModal();
    }
  });

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.querySelector('.white-project-container')?.scrollTo({ top: 0, behavior: 'instant' });
}

/**
 * 5. HIGH-EFFICIENCY PROCEDURAL 35MM FILM GRAIN
 * Uses 3 pre-baked 128x128 tiles and throttled ~12fps jitter to eliminate CPU/GPU drain
 */
function initGrainOverlay() {
  const canvas = document.getElementById('grain-overlay');
  if (!canvas) return null;

  const ctx = canvas.getContext('2d', { alpha: true });
  const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;

  // Pre-generate 3 tiny grain frames
  const patternSize = 128;
  const numFrames = 3;
  const patterns = [];

  for (let f = 0; f < numFrames; f++) {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = patternSize;
    pCanvas.height = patternSize;
    const pCtx = pCanvas.getContext('2d');
    const imgData = pCtx.createImageData(patternSize, patternSize);
    const buf = new Uint32Array(imgData.data.buffer);
    const len = buf.length;
    for (let i = 0; i < len; i++) {
      const val = (Math.random() * 255) | 0;
      buf[i] = (0x1f << 24) | (val << 16) | (val << 8) | val;
    }
    pCtx.putImageData(imgData, 0, 0);
    patterns.push(ctx.createPattern(pCanvas, 'repeat'));
  }

  function resize() {
    // Keep canvas memory footprint low: clamp to max 1280x720, scaled up via CSS
    canvas.width = Math.min(window.innerWidth, isMobile ? 640 : 1280);
    canvas.height = Math.min(window.innerHeight, isMobile ? 480 : 720);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  let isPaused = false;
  let activeFrame = 0;
  const frameInterval = isMobile ? 125 : 80; // 8fps on mobile, 12.5fps on desktop
  let timerId = null;

  // Paint initial frame
  ctx.fillStyle = patterns[0];
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  function tick() {
    if (isPaused || document.hidden) {
      timerId = null;
      return;
    }
    activeFrame = (activeFrame + 1) % numFrames;
    ctx.fillStyle = patterns[activeFrame];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    timerId = setTimeout(tick, frameInterval);
  }

  function start() {
    if (!timerId && !isPaused && !document.hidden) {
      timerId = setTimeout(tick, frameInterval);
    }
  }

  function stop() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  start();

  document.addEventListener('visibilitychange', () => {
    isPaused = document.hidden;
    if (isPaused) stop();
    else start();
  });

  return {
    pause(paused) {
      isPaused = paused;
      if (isPaused) stop();
      else start();
    }
  };
}

/**
 * 6. MAIN LANDING / HERO BACKGROUND VIDEO ENGINE
 * Autoplays smoothly, loops continuously, remains behind all 3D content,
 * and seamlessly unmutes audio on the user's first click or tap.
 */
function initHeroBackgroundVideo() {
  const video = document.getElementById('heroBackgroundVideo');
  if (!video) return;

  // 1. Initial Playback Attempt: Start muted for 100% browser autoplay policy compliance
  video.muted = true;
  video.volume = 1.0;

  const startAutoplay = () => {
    const promise = video.play();
    if (promise !== undefined) {
      promise.catch(() => {
        // Fallback retry with muted enforced
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  };

  if (video.readyState >= 2) {
    startAutoplay();
  } else {
    video.addEventListener('canplay', () => {
      startAutoplay();
    }, { once: true });
    startAutoplay();
  }

  // 2. Seamless continuous loop fallback
  video.addEventListener('ended', () => {
    video.currentTime = 0;
    video.play().catch(() => {});
  });

  // 3. User First Valid Interaction: Unmute smoothly without restarting or pausing
  let hasUnmuted = false;

  const handleFirstInteraction = () => {
    if (hasUnmuted) return;
    hasUnmuted = true;

    // Immediately unmute existing video and play original audio track from current position
    video.muted = false;
    video.volume = 1.0;
    sessionStorage.setItem('cw_hero_video_unmuted', 'true');

    // Ensure playback continues uninterrupted
    if (video.paused) {
      video.play().catch(() => {});
    }

    // Clean up one-time interaction listeners
    interactionEvents.forEach(evt => {
      window.removeEventListener(evt, handleFirstInteraction, { capture: true });
    });
  };

  const interactionEvents = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'];
  interactionEvents.forEach(evt => {
    window.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true });
  });

  // If user unmuted earlier in the session, attempt unmuted playback
  if (sessionStorage.getItem('cw_hero_video_unmuted') === 'true') {
    video.muted = false;
    video.volume = 1.0;
    hasUnmuted = true;
    video.play().catch(() => {
      video.muted = true;
      hasUnmuted = false;
      video.play().catch(() => {});
    });
  }

  // 4. Save resources when page is in background, resume when active
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  });
}

