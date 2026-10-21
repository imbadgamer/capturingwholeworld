/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * 3D Curved Carousel Engine — High-Performance Infinite Loop Edition
 * Optimized for 60fps compositor-only transforms, seamless infinite scrolling,
 * idle sleep, and mobile responsiveness.
 */

class Carousel3DEngine {
  constructor(projects, onSelectProject) {
    this.projects = projects;
    this.origNumItems = this.projects.length;
    this.onSelectProject = onSelectProject;

    this.container = document.getElementById('carousel3DTrack');
    this.hudTitle = document.getElementById('hudTitleLine');
    this.hudSubtitle = document.getElementById('hudSubtitleLine');

    this.currentIndex = -1;
    this.scrollProgress = 0;
    this.targetProgress = 0;
    this.velocity = 0;
    this.isPaused = false;
    this.isDirty = true;

    // 3 seamless repeated sets of the 8 projects for an infinite loop with zero visible jumps
    this.numSets = 3;
    this.totalItems = this.origNumItems * this.numSets;
    this.halfItems = this.totalItems / 2;

    this.isMobile = window.innerWidth < 768;
    this.updateMetrics();

    // Drag / Touch state
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartProgress = 0;
    this.lastDragX = 0;

    this.panels = [];
    this.dimmers = [];
    this.initDOM();
    this.initEvents();
    this.updateHUD(0);
    this.startLoop();
  }

  updateMetrics() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.radius = Math.min(window.innerWidth * 1.1, 550);
      this.angleStep = 0.48; // Wider angle step for clean mobile separation
    } else {
      this.radius = Math.min(window.innerWidth * 1.05, 1350);
      this.angleStep = 0.32;
    }
  }

  initDOM() {
    this.container.innerHTML = '';
    this.panels = [];
    this.dimmers = [];

    // Duplicate projects across 3 seamless sets for an infinite loop
    for (let set = 0; set < this.numSets; set++) {
      this.projects.forEach((proj, origIdx) => {
        const globalIdx = set * this.origNumItems + origIdx;
        const panel = document.createElement('article');
        panel.className = 'carousel-panel';
        panel.setAttribute('data-index', globalIdx);
        panel.setAttribute('data-orig-index', origIdx);
        panel.setAttribute('data-slug', proj.slug);
        panel.setAttribute('data-cursor', 'project');

        // Dedicated dark dimmer overlay for compositor-only brightness fading
        panel.innerHTML = `
          <div class="panel-media-wrapper">
            <img src="${proj.heroImage}" alt="${proj.title}" class="panel-image" loading="${globalIdx < 4 ? 'eager' : 'lazy'}" decoding="async">
            <div class="panel-dark-dimmer"></div>
            <div class="panel-overlay-vignette"></div>
            <span class="panel-badge-num">${proj.id}</span>
          </div>
        `;

        const dimmer = panel.querySelector('.panel-dark-dimmer');
        this.dimmers.push(dimmer);

        // Click handler: opens modal if active, or smoothly rotates toward clicked project
        panel.addEventListener('click', (e) => {
          if (this.hasDragged) return;
          const roundedIndex = Math.round(this.scrollProgress);
          const normActive = ((roundedIndex % this.origNumItems) + this.origNumItems) % this.origNumItems;

          if (origIdx === normActive || proj.slug === 'gym') {
            if (this.onSelectProject) {
              this.onSelectProject(proj.slug);
            }
          } else {
            // Smoothly rotate toward clicked panel via shortest angular distance
            const rawOffset = globalIdx - this.scrollProgress;
            const wrapped = ((rawOffset % this.totalItems) + this.totalItems) % this.totalItems;
            const offset = wrapped > this.halfItems ? wrapped - this.totalItems : wrapped;
            this.targetProgress = Math.round(this.scrollProgress + offset);
            this.isDirty = true;
            this.requestTick();
          }
        });

        this.container.appendChild(panel);
        this.panels.push(panel);
      });
    }
  }

  initEvents() {
    window.addEventListener('resize', () => {
      this.updateMetrics();
      this.requestTick();
    }, { passive: true });

    // Wheel Scroll (Smooth normalized infinite rotation in either direction)
    let wheelSettleTimer = null;
    window.addEventListener('wheel', (e) => {
      if (window.__isModalActive) return;

      let rawDelta = e.deltaY;
      if (Math.abs(rawDelta) < 0.001 && Math.abs(e.deltaX) > 0.001) {
        rawDelta = e.deltaX;
      }
      if (e.deltaMode === 1) {
        rawDelta *= 24;
      } else if (e.deltaMode === 2) {
        rawDelta *= 400;
      }

      // Clamp delta to prevent erratic trackpad flick spikes
      const clampedDelta = Math.max(-120, Math.min(120, rawDelta));
      const delta = clampedDelta * 0.0013;

      this.targetProgress += delta;
      this.requestTick();

      if (wheelSettleTimer) clearTimeout(wheelSettleTimer);
      wheelSettleTimer = setTimeout(() => {
        if (!this.isDragging && !window.__isModalActive) {
          this.targetProgress = Math.round(this.targetProgress);
          this.requestTick();
        }
      }, 150);
    }, { passive: true });

    // Drag / Touch Handlers (Dynamic listeners: active only during drag)
    const viewport = document.getElementById('carousel3DViewport');

    const startDrag = (clientX) => {
      if (window.__isModalActive) return;
      this.isDragging = true;
      this.hasDragged = false;
      this.dragStartX = clientX;
      this.lastDragX = clientX;
      this.dragStartProgress = this.targetProgress;
      this.velocity = 0;
      this.requestTick();
    };

    const moveDrag = (clientX) => {
      if (!this.isDragging) return;
      const deltaX = clientX - this.dragStartX;
      if (Math.abs(deltaX) > 8) {
        this.hasDragged = true;
      }
      const dragMultiplier = this.isMobile ? (window.innerWidth * 0.55) : (window.innerWidth * 0.45);
      const progressDelta = -deltaX / dragMultiplier;
      this.targetProgress = this.dragStartProgress + progressDelta;
      
      const instantVel = (clientX - this.lastDragX) * -0.0025;
      this.velocity = this.velocity * 0.6 + instantVel * 0.4;
      this.lastDragX = clientX;
      this.requestTick();
    };

    const endDrag = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      const clampedVelocity = Math.max(-1.5, Math.min(1.5, this.velocity));
      this.targetProgress += clampedVelocity * 2.2;
      this.targetProgress = Math.round(this.targetProgress);
      this.requestTick();
    };

    const onMouseMove = (e) => moveDrag(e.clientX);
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      endDrag();
    };

    const onTouchMove = (e) => {
      if (e.touches.length > 0) moveDrag(e.touches[0].clientX);
    };
    const onTouchEnd = () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      endDrag();
    };

    viewport.addEventListener('mousedown', (e) => {
      startDrag(e.clientX);
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('mouseup', onMouseUp);
    });

    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        startDrag(e.touches[0].clientX);
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('touchend', onTouchEnd);
        window.addEventListener('touchcancel', onTouchEnd);
      }
    }, { passive: true });

    // View toggles (FEATURED / FULL)
    const featBtn = document.getElementById('toggleFeatured');
    const fullBtn = document.getElementById('toggleFull');

    if (featBtn && fullBtn) {
      featBtn.addEventListener('click', () => {
        featBtn.classList.add('active');
        fullBtn.classList.remove('active');
        this.updateMetrics();
        this.requestTick();
      });

      fullBtn.addEventListener('click', () => {
        fullBtn.classList.add('active');
        featBtn.classList.remove('active');
        this.angleStep = this.isMobile ? 0.38 : 0.24;
        this.radius = this.isMobile ? Math.min(window.innerWidth * 1.3, 650) : Math.min(window.innerWidth * 1.25, 1600);
        this.requestTick();
      });
    }
  }

  updateHUD(activeIdx) {
    const normIdx = ((activeIdx % this.origNumItems) + this.origNumItems) % this.origNumItems;
    const proj = this.projects[normIdx];
    if (!proj || !this.hudTitle || !this.hudSubtitle) return;

    if (this.currentIndex !== normIdx) {
      this.currentIndex = normIdx;
      
      if (this.hudTimer) clearTimeout(this.hudTimer);

      this.hudTitle.style.opacity = '0';
      this.hudTitle.style.transform = 'translateY(6px)';
      this.hudSubtitle.style.opacity = '0';

      this.hudTimer = setTimeout(() => {
        this.hudTitle.textContent = proj.title;
        this.hudSubtitle.innerHTML = `${proj.category} — <span>${proj.location}</span> — ${proj.year}`;
        
        this.hudTitle.style.opacity = '1';
        this.hudTitle.style.transform = 'translateY(0)';
        this.hudSubtitle.style.opacity = '1';
        this.hudTimer = null;
      }, 120);
    }
  }

  pause(paused) {
    this.isPaused = paused;
    if (!paused) {
      this.requestTick();
    }
  }

  requestTick() {
    this.isDirty = true;
    if (!this.rafId && !this.isPaused) {
      this.rafId = requestAnimationFrame(this.loopBound);
    }
  }

  startLoop() {
    this.loopBound = () => {
      if (this.isPaused) {
        this.rafId = null;
        return;
      }

      this.render();

      const diff = this.targetProgress - this.scrollProgress;
      if (Math.abs(diff) < 0.0001 && !this.isDragging && !this.isDirty) {
        this.rafId = null;
        return;
      }

      this.rafId = requestAnimationFrame(this.loopBound);
    };
    this.requestTick();
  }

  render() {
    if (this.isPaused) return;

    const diff = this.targetProgress - this.scrollProgress;
    
    // Idle sleep check: if settled and not dragging, skip heavy style mutations
    if (Math.abs(diff) < 0.0001 && !this.isDragging && !this.isDirty) {
      return;
    }

    const ease = this.isDragging ? 0.25 : 0.095;
    this.scrollProgress += diff * ease;

    if (Math.abs(this.targetProgress - this.scrollProgress) < 0.0001 && !this.isDragging) {
      this.scrollProgress = this.targetProgress;
      this.isDirty = false;
    }

    // Keep coordinates within a normalized cycle when idle to prevent numeric drift
    if (!this.isDragging) {
      if (this.scrollProgress >= this.totalItems) {
        this.scrollProgress -= this.totalItems;
        this.targetProgress -= this.totalItems;
      } else if (this.scrollProgress < 0) {
        this.scrollProgress += this.totalItems;
        this.targetProgress += this.totalItems;
      }
    }

    const activeIndex = Math.round(this.scrollProgress);
    if (this._lastActiveIndex !== activeIndex) {
      this._lastActiveIndex = activeIndex;
      this.updateHUD(activeIndex);
    }

    // Apply cylindrical curved transforms using compositor-only translate3d, rotateY, scale, opacity
    const isMobile = this.isMobile;
    const scrollProg = this.scrollProgress;
    const totalItems = this.totalItems;
    const halfItems = this.halfItems;
    const angleStep = this.angleStep;
    const radius = this.radius;
    const zRadiusFactor = radius * 0.94;
    const rotYFactor = (180 / Math.PI) * (isMobile ? 0.6 : 0.72);

    for (let idx = 0; idx < totalItems; idx++) {
      const panel = this.panels[idx];
      const rawOffset = idx - scrollProg;
      const wrapped = ((rawOffset % totalItems) + totalItems) % totalItems;
      const offset = wrapped > halfItems ? wrapped - totalItems : wrapped;
      const absOffset = Math.abs(offset);

      // Frustum culling optimization: Only modify DOM if visibility changed
      if (absOffset > 4.6) {
        if (panel._isVisible !== false) {
          panel.style.visibility = 'hidden';
          panel._isVisible = false;
        }
        continue;
      }
      if (panel._isVisible !== true) {
        panel.style.visibility = 'visible';
        panel._isVisible = true;
      }

      const angle = offset * angleStep;

      // Mathematical 3D cylindrical coordinates
      const x = Math.sin(angle) * radius;
      const z = -(1 - Math.cos(angle)) * zRadiusFactor;
      const rotY = angle * rotYFactor;

      const scale = isMobile 
        ? Math.max(0.72, 1 - absOffset * 0.16)
        : Math.max(0.64, 1 - absOffset * 0.13);

      const panelOpacity = Math.max(0, Math.min(1, 1 - absOffset * 0.22));
      const dimOpacity = Math.min(0.65, absOffset * 0.42);
      const zIndex = 100 - Math.round(absOffset * 10);

      const transformStr = `translate3d(-50%, -50%, 0) translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      if (panel._transform !== transformStr) {
        panel.style.transform = transformStr;
        panel._transform = transformStr;
      }
      
      const opStr = panelOpacity.toFixed(2);
      if (panel._opacity !== opStr) {
        panel.style.opacity = opStr;
        panel._opacity = opStr;
      }

      if (panel._zIndex !== zIndex) {
        panel.style.zIndex = zIndex;
        panel._zIndex = zIndex;
      }

      if (this.dimmers[idx]) {
        const dimStr = dimOpacity.toFixed(2);
        if (this.dimmers[idx]._dimOpacity !== dimStr) {
          this.dimmers[idx].style.opacity = dimStr;
          this.dimmers[idx]._dimOpacity = dimStr;
        }
      }

      const isCenter = absOffset < 0.45;
      if (panel._isCenter !== isCenter) {
        panel._isCenter = isCenter;
        if (isCenter) {
          panel.classList.add('is-center');
        } else {
          panel.classList.remove('is-center');
        }
      }
    }
  }
}

window.Carousel3DEngine = Carousel3DEngine;
