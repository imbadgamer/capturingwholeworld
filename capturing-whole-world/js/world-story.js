/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * "The World Is The Story" — Interactive Location Backdrop Switcher
 */

class WorldStoryController {
  constructor() {
    this.section = document.getElementById('worldStorySection');
    this.rows = document.querySelectorAll('.location-interactive-row');
    this.backdropImages = document.querySelectorAll('.world-backdrop-img');

    if (!this.section || !this.rows.length) return;
    this.initEvents();
  }

  initEvents() {
    this.rows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        const targetId = row.getAttribute('data-backdrop-id');
        this.switchBackdrop(targetId);

        this.rows.forEach(r => r.classList.remove('active'));
        row.classList.add('active');
      });
    });

    // Auto-cycle through locations when user scrolls into view if not hovering
    let autoIndex = 0;
    let autoInterval = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!autoInterval) {
            autoInterval = setInterval(() => {
              autoIndex = (autoIndex + 1) % this.rows.length;
              const targetRow = this.rows[autoIndex];
              const targetId = targetRow.getAttribute('data-backdrop-id');
              this.switchBackdrop(targetId);
              this.rows.forEach(r => r.classList.remove('active'));
              targetRow.classList.add('active');
            }, 4500);
          }
        } else {
          if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
          }
        }
      });
    }, { threshold: 0.2 });

    observer.observe(this.section);
  }

  switchBackdrop(id) {
    this.backdropImages.forEach(img => {
      if (img.id === id) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
  }
}

window.WorldStoryController = WorldStoryController;
