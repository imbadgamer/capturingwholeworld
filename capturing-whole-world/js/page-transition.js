/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * Fluid Project Page Transition & Short Film Renderer
 * (Jesper Landberg Route & Image Expansion Reference)
 */

class ProjectTransitionManager {
  constructor() {
    this.detailView = document.getElementById('projectDetailView');
    this.stage = document.getElementById('projectDetailStage');
    this.closeBtn = document.getElementById('projectCloseBtn');
    this.currentSlug = null;

    if (!this.detailView || !this.stage) return;
    this.initEvents();
  }

  initEvents() {
    // Open Project Trigger
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-project-slug]');
      if (trigger) {
        e.preventDefault();
        const slug = trigger.getAttribute('data-project-slug');
        this.openProject(slug);
      }
    });

    // Close Project Trigger
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeProject());
    }

    // Keyboard Escape to Close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.detailView.classList.contains('active')) {
        this.closeProject();
      }
    });
  }

  openProject(slug) {
    const project = window.PROJECTS_DATA.find(p => p.slug === slug);
    if (!project) return;

    this.currentSlug = slug;

    // Find next project for seamless forward flow
    const currentIndex = window.PROJECTS_DATA.findIndex(p => p.slug === slug);
    const nextProject = window.PROJECTS_DATA[(currentIndex + 1) % window.PROJECTS_DATA.length];

    // Build the Short Film Editorial Stage Markup
    this.stage.innerHTML = `
      <!-- Project Hero Stage -->
      <section class="project-detail-hero">
        <div class="project-detail-hero-media">
          <img src="${project.heroImage}" alt="${project.title}" id="projectHeroExpandedImg">
        </div>
        <div class="project-detail-hero-overlay"></div>

        <div class="project-detail-hero-content">
          <div class="project-detail-meta-tags">
            <span>${project.categoryShort}</span>
            <span>•</span>
            <span>${project.location}</span>
            <span>•</span>
            <span>${project.year}</span>
            <span>•</span>
            <span>${project.coordinates}</span>
          </div>

          <h1 class="project-detail-title">${project.title}</h1>
          <p class="project-detail-lead-quote">"${project.tagline}"</p>
        </div>
      </section>

      <div class="container">
        <!-- Technical Camera & Optics Strip -->
        <div class="project-technical-strip">
          <div class="tech-spec-row">
            <div class="tech-spec-box">
              <span class="tech-box-label">Camera Rig</span>
              <span class="tech-box-val">${project.cameraSpecs.camera}</span>
            </div>
            <div class="tech-spec-box">
              <span class="tech-box-label">Optics & Glass</span>
              <span class="tech-box-val">${project.cameraSpecs.lenses}</span>
            </div>
            <div class="tech-spec-box">
              <span class="tech-box-label">Aspect Ratio</span>
              <span class="tech-box-val">${project.cameraSpecs.format}</span>
            </div>
            <div class="tech-spec-box">
              <span class="tech-box-label">Color Science</span>
              <span class="tech-box-val">${project.cameraSpecs.colorProfile}</span>
            </div>
          </div>
        </div>

        <!-- Editorial Description Narrative -->
        <div class="intro-container" style="padding: 4rem 0;">
          <span class="meta-label accent">LOGLINE &amp; DIRECTORS NOTE</span>
          <p class="intro-narrative" style="max-width: 880px; font-size: 1.25rem;">
            ${project.description}
          </p>
        </div>

        <!-- Immersive Varied Editorial Gallery Sequence -->
        <div class="project-editorial-flow">
          ${project.gallery.map(item => {
            if (item.type === 'fullscreen') {
              return `
                <div class="gallery-block-fullscreen" data-cursor="media">
                  <img src="${item.url}" alt="${item.caption}" loading="lazy">
                  <div class="gallery-image-caption container">${item.caption}</div>
                </div>
              `;
            } else if (item.type === 'ultrawide') {
              return `
                <div class="gallery-block-ultrawide" data-cursor="media">
                  <img src="${item.url}" alt="${item.caption}" loading="lazy">
                  <div class="gallery-image-caption">${item.caption}</div>
                </div>
              `;
            } else if (item.type === 'vertical') {
              return `
                <div class="gallery-asymmetric-duo">
                  <div class="gallery-block-vertical" data-cursor="media">
                    <img src="${item.url}" alt="${item.caption}" loading="lazy">
                    <div class="gallery-image-caption">${item.caption}</div>
                  </div>
                  <div class="intro-narrative" style="padding: 2rem;">
                    <span class="meta-label accent">CINEMATIC DISCIPLINE</span>
                    <p style="margin-top: 1rem; color: var(--color-text-dim);">
                      "Patience over spectacle. When you respect the mountain, the light will reward you with what could never be staged."
                    </p>
                  </div>
                </div>
              `;
            } else {
              return `
                <div class="gallery-block-editorial-small" data-cursor="media">
                  <img src="${item.url}" alt="${item.caption}" loading="lazy">
                  <div class="gallery-image-caption">${item.caption}</div>
                </div>
              `;
            }
          }).join('')}
        </div>

        <!-- Next Project Transition Section -->
        <div class="project-next-trigger-block">
          <span class="next-project-sub">CONTINUE THE JOURNEY // NEXT STORY</span>
          <button class="next-project-title-btn" data-project-slug="${nextProject.slug}" data-cursor="project">
            ${nextProject.title} →
          </button>
        </div>
      </div>
    `;

    // Activate transition
    this.detailView.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.detailView.scrollTo({ top: 0, behavior: 'instant' });

    // Update browser URL query/hash seamlessly
    window.history.pushState({ slug }, project.title, `#project/${slug}`);
  }

  closeProject() {
    this.detailView.classList.remove('active');
    document.body.style.overflow = '';
    window.history.pushState({}, 'Capturing Whole World', '#');
  }
}

window.ProjectTransitionManager = ProjectTransitionManager;
