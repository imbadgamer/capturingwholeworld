/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * Procedural 35mm Analog Film Grain Overlay
 * Ultra-lightweight canvas noise generator (sub-1% CPU)
 */

class FilmGrainRenderer {
  constructor() {
    this.canvas = document.getElementById('grain-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.patternCanvas = document.createElement('canvas');
    this.patternCtx = this.patternCanvas.getContext('2d');
    this.patternSize = 128;
    this.patternCanvas.width = this.patternSize;
    this.patternCanvas.height = this.patternSize;
    this.patternData = this.patternCtx.createImageData(this.patternSize, this.patternSize);
    this.pattern32 = new Uint32Array(this.patternData.data.buffer);
    
    this.frame = 0;
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });
    this.loop = this.loop.bind(this);
    this.loop();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  updatePattern() {
    const len = this.pattern32.length;
    for (let i = 0; i < len; i++) {
      const val = (Math.random() * 255) | 0;
      // Alpha: subtle variation, 0x18 to 0x24 (10% to 15% opacity)
      const alpha = 0x1f;
      this.pattern32[i] = (alpha << 24) | (val << 16) | (val << 8) | val;
    }
    this.patternCtx.putImageData(this.patternData, 0, 0);
  }

  loop() {
    this.frame++;
    // Update pattern every 2 frames for cinematic 24-30fps film flicker
    if (this.frame % 2 === 0) {
      this.updatePattern();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const pattern = this.ctx.createPattern(this.patternCanvas, 'repeat');
      this.ctx.fillStyle = pattern;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    requestAnimationFrame(this.loop);
  }
}

window.FilmGrainRenderer = FilmGrainRenderer;
