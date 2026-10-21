/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * Minimal Dot & "VIEW" Expanding Cursor Engine
 * (Jesper Landberg Interaction Reference)
 */

class JesperCursor {
  constructor() {
    this.coreDot = document.querySelector('.custom-cursor-core');
    this.follower = document.querySelector('.custom-cursor-follower');
    this.label = document.querySelector('.cursor-inner-label');

    // Check touch/mobile device
    this.isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    if (this.isTouch || !this.coreDot || !this.follower) {
      if (this.coreDot) this.coreDot.style.display = 'none';
      if (this.follower) this.follower.style.display = 'none';
      return;
    }

    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.corePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.followerPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Hero parallax target
    this.heroMedia = document.querySelector('.hero-background-image');

    this.initEvents();
    this.loop();
  }

  initEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      if (this.coreDot.classList.contains('cursor-hidden')) {
        this.coreDot.classList.remove('cursor-hidden');
        this.follower.classList.remove('cursor-hidden');
      }

      // Hero image subtle displacement
      if (this.heroMedia && window.scrollY < window.innerHeight) {
        const xOffset = (e.clientX / window.innerWidth - 0.5) * -24;
        const yOffset = (e.clientY / window.innerHeight - 0.5) * -20;
        this.heroMedia.style.transform = `scale(1.05) translate3d(${xOffset}px, ${yOffset}px, 0)`;
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      this.coreDot.classList.add('cursor-hidden');
      this.follower.classList.add('cursor-hidden');
    });

    document.addEventListener('mouseenter', () => {
      this.coreDot.classList.remove('cursor-hidden');
      this.follower.classList.remove('cursor-hidden');
    });

    // Delegation for interactive hover states
    document.addEventListener('mouseover', (e) => {
      const projectTarget = e.target.closest('[data-cursor="project"]');
      const mediaTarget = e.target.closest('[data-cursor="media"]');
      const linkTarget = e.target.closest('a, button, [data-cursor="link"], .clickable');

      if (projectTarget) {
        this.follower.className = 'custom-cursor-follower hovering-project';
        this.coreDot.className = 'custom-cursor-core hovering-project';
        this.label.textContent = 'VIEW';
      } else if (mediaTarget) {
        this.follower.className = 'custom-cursor-follower hovering-media';
        this.coreDot.className = 'custom-cursor-core';
        this.label.textContent = '';
      } else if (linkTarget) {
        this.follower.className = 'custom-cursor-follower hovering-link';
        this.coreDot.className = 'custom-cursor-core';
        this.label.textContent = '';
      } else {
        this.resetState();
      }
    });

    document.addEventListener('mouseout', (e) => {
      const interactive = e.target.closest('[data-cursor], a, button');
      if (interactive) {
        this.resetState();
      }
    });
  }

  resetState() {
    this.follower.className = 'custom-cursor-follower';
    this.coreDot.className = 'custom-cursor-core';
    this.label.textContent = '';
  }

  loop() {
    // Sharp immediate follow for core dot
    this.corePos.x += (this.mouse.x - this.corePos.x) * 0.45;
    this.corePos.y += (this.mouse.y - this.corePos.y) * 0.45;
    this.coreDot.style.transform = `translate3d(${this.corePos.x}px, ${this.corePos.y}px, 0) translate(-50%, -50%)`;

    // Fluid organic follower ring
    this.followerPos.x += (this.mouse.x - this.followerPos.x) * 0.16;
    this.followerPos.y += (this.mouse.y - this.followerPos.y) * 0.16;
    this.follower.style.transform = `translate3d(${this.followerPos.x}px, ${this.followerPos.y}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(() => this.loop());
  }
}

window.JesperCursor = JesperCursor;
