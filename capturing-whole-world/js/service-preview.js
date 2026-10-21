/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * Interactive Hover Image Preview for Services
 * (Jesper Landberg Editorial Signature Interaction)
 */

class ServiceHoverPreview {
  constructor() {
    this.previewBox = document.getElementById('servicesFloatingPreview');
    this.previewImg = document.getElementById('servicesFloatingImg');
    this.items = document.querySelectorAll('.service-interactive-item');

    this.isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    if (this.isTouch || !this.previewBox || !this.previewImg) return;

    this.mouse = { x: 0, y: 0 };
    this.pos = { x: 0, y: 0 };
    this.isActive = false;

    this.initEvents();
    this.render();
  }

  initEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }, { passive: true });

    this.items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const imgSrc = item.getAttribute('data-preview-image');
        if (imgSrc) {
          this.previewImg.src = imgSrc;
          this.previewBox.classList.add('active');
          this.isActive = true;
        }
      });

      item.addEventListener('mouseleave', () => {
        this.previewBox.classList.remove('active');
        this.isActive = false;
      });
    });
  }

  render() {
    if (this.isActive) {
      this.pos.x += (this.mouse.x - this.pos.x) * 0.15;
      this.pos.y += (this.mouse.y - this.pos.y) * 0.15;
      this.previewBox.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0) translate(-50%, -50%)`;
    } else {
      this.pos.x = this.mouse.x;
      this.pos.y = this.mouse.y;
    }

    requestAnimationFrame(() => this.render());
  }
}

window.ServiceHoverPreview = ServiceHoverPreview;
