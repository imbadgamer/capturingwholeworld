/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * Smooth Inertia & Parallax Velocity Engine
 * (Jesper Landberg Motion Feel)
 */

class SmoothScrollEngine {
  constructor() {
    this.scrollY = window.scrollY;
    this.targetY = window.scrollY;
    this.ease = 0.085;
    this.velocity = 0;
    this.isMobile = window.matchMedia('(max-width: 820px)').matches;

    this.parallaxElements = document.querySelectorAll('[data-parallax]');
    this.revealElements = document.querySelectorAll('.mask-line-inner, .intro-word-reveal');

    this.init();
  }

  init() {
    // Parallax on native scroll
    window.addEventListener('scroll', () => {
      this.targetY = window.scrollY;
      this.updateParallax();
      this.checkReveals();
    }, { passive: true });

    // Initial check
    this.checkReveals();
  }

  updateParallax() {
    const scrollPos = window.scrollY;
    const windowH = window.innerHeight;

    this.parallaxElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const speed = parseFloat(el.getAttribute('data-parallax') || '0.1');

      if (rect.top < windowH && rect.bottom > 0) {
        const offset = (rect.top - windowH / 2) * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    });

    // Slow zoom/move on hero while scrolling
    const heroImg = document.querySelector('.hero-background-image');
    if (heroImg && scrollPos < windowH * 1.5) {
      const heroShift = scrollPos * 0.35;
      const heroScale = 1.04 + (scrollPos / windowH) * 0.12;
      heroImg.style.transform = `scale(${heroScale}) translate3d(0, ${heroShift}px, 0)`;
    }
  }

  checkReveals() {
    const triggerBottom = window.innerHeight * 0.88;

    this.revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add('revealed');
      }
    });
  }
}

window.SmoothScrollEngine = SmoothScrollEngine;
