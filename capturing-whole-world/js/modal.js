/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * Cinematic Project Modal & Film Room Controller
 */

const PROJECTS_DATA = {
  'silence-kyoto': {
    title: 'THE SILENCE OF KYOTO',
    category: 'Cinematography & Visual Essay',
    format: '35mm Anamorphic 2.39:1',
    location: 'Kyoto, Japan',
    year: '2025',
    synopsis: 'A quiet meditation on morning mist, rain cascading over hinoki cedar, and the solitary footsteps of artisans before the city awakens. Filmed on Cooke Anamorphic primes with motivated natural dawn illumination.',
    mainImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=85',
    camera: 'ARRI Alexa Mini LF',
    lenses: 'Cooke Anamorphic /i Full Frame Plus 40mm & 75mm',
    sensor: 'Large Format 36.70 x 25.54 mm',
    pipeline: 'Custom 500T Kodak Grain Emulation + ACEScct',
    sound: 'Binaural bamboo wind & rain on temple rock',
    swatches: ['#141b1d', '#283b38', '#546b5a', '#8fa792', '#d4a373'],
    bts: [
      {
        url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
        caption: '05:14 AM — Setting up the heavy tripod on wooden veranda in Gion'
      },
      {
        url: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1600&q=80',
        caption: 'Natural backlight cutting through Arashiyama bamboo canopy'
      },
      {
        url: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=2000&q=80',
        caption: 'Frame still: Late afternoon reflections on cedar panels',
        wide: true
      }
    ],
    nextSlug: 'highland-drift',
    nextTitle: 'HIGHLAND DRIFT'
  },
  'highland-drift': {
    title: 'HIGHLAND DRIFT',
    category: 'Expedition Documentary',
    format: '65mm Ultra-Wide 2.76:1',
    location: 'Icelandic Highlands',
    year: '2025',
    synopsis: 'Documenting volcanic black deserts, basalt monoliths, and glacial rivers cutting through the raw cradle of the North Atlantic. An exploration of the planet before human footprints.',
    mainImage: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=2400&q=85',
    camera: 'RED V-Raptor 8K VV',
    lenses: 'Leica R Cine Prime Set (28mm, 50mm, 90mm)',
    sensor: 'VistaVision 40.96 x 21.60 mm',
    pipeline: 'Kodak 2383 Print Profile with desaturated volcanic blacks',
    sound: 'Glacial water roaring beneath subterranean ice caves',
    swatches: ['#0b1117', '#1a2730', '#3b5161', '#6f8fa1', '#b6ccd8'],
    bts: [
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
        caption: 'Rigging weather-sealed camera cage during 50 knot mountain winds'
      },
      {
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80',
        caption: 'Midnight sun grazing volcanic ash dunes in Landmannalaugar'
      },
      {
        url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2000&q=80',
        caption: 'Anamorphic plate: Solitary glacial delta winding to the sea',
        wide: true
      }
    ],
    nextSlug: 'golden-dust',
    nextTitle: 'GOLDEN DUST & SHADOWS'
  },
  'golden-dust': {
    title: 'GOLDEN DUST & SHADOWS',
    category: 'Narrative Stills & 35mm Film',
    format: '4:5 Large Format Editorial',
    location: 'Merzouga & High Atlas, Morocco',
    year: '2024',
    synopsis: 'The desert does not keep secrets; it erases them. A visual human study of Berber caravan elders living at the threshold of the shifting dunes, illuminated by warm dusk oil lamps and golden hour glare.',
    mainImage: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=2400&q=85',
    camera: 'Hasselblad 503CW & Leica M11',
    lenses: 'Carl Zeiss Planar 80mm f/2.8 & Summilux 35mm f/1.4',
    sensor: 'Kodak Vision3 500T 120 Roll Film & 60MP Full Frame',
    pipeline: 'ECN-2 Film Lab Processing + Master Scan 16-bit TIFF',
    sound: 'Wind whipping through nomad tent canvas at twilight',
    swatches: ['#170f09', '#4d2b1b', '#965a32', '#d48a54', '#f1c08e'],
    bts: [
      {
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80',
        caption: 'Protecting mechanical shutter mechanisms from fine quartz dust'
      },
      {
        url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
        caption: 'Documenting the morning tea ceremony inside wool tents'
      },
      {
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80',
        caption: 'Wide plate: Endless ridges carved by centuries of wind',
        wide: true
      }
    ],
    nextSlug: 'eternal-embers',
    nextTitle: 'ETERNAL EMBERS OF BANARAS'
  },
  'eternal-embers': {
    title: 'ETERNAL EMBERS OF BANARAS',
    category: 'Humanist Cinema & Visual Poetry',
    format: '16:9 Cinema Stills',
    location: 'Varanasi, India',
    year: '2024',
    synopsis: 'Where time flows in reverse. At the banks of the sacred river, smoke from ancient fires rises toward dawn as bells mark three millennia of uninterrupted ritual. A study of transience, faith, and eternal light.',
    mainImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=2400&q=85',
    camera: 'Sony FX9 Cinema & Leica M-A Film',
    lenses: 'Cooke Speed Panchro Series II Vintage Cinema Lenses',
    sensor: 'Full Frame 6K Overcoming Low-Light High Dynamic Range',
    pipeline: 'Film Emulation LUT with warm amber highlights & teal shadows',
    sound: 'Morning rowing oars breaking mist, distant temple conch shells',
    swatches: ['#160c07', '#421a10', '#83391b', '#ca6d31', '#f3a853'],
    bts: [
      {
        url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80',
        caption: 'Floating handheld gimbal on a traditional wooden boat at 04:30'
      },
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
        caption: 'Capturing the flicker of evening Aarti fire against stone steps'
      },
      {
        url: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=2000&q=80',
        caption: 'Dawn plate: Fog enveloping the holy river ghats',
        wide: true
      }
    ],
    nextSlug: 'monoliths-dolomiti',
    nextTitle: 'MONOLITHS OF DOLOMITI'
  },
  'monoliths-dolomiti': {
    title: 'MONOLITHS OF DOLOMITI',
    category: 'Alpine Fine Art & Mountain Cinema',
    format: '2.39:1 Panoramic',
    location: 'Tre Cime & Seceda, Italy',
    year: '2025',
    synopsis: 'High-altitude solitary expeditions above the storm line. Capturing the razor edges of limestone towers bathed in twilight and moonlight, untouched by the rush of modern life.',
    mainImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2400&q=85',
    camera: 'Phase One IQ4 150MP & ARRI Amira',
    lenses: 'Schneider Kreuznach Blue Ring 35mm LS & 110mm LS',
    sensor: 'Medium Format 53.4 x 40 mm 151 Megapixels',
    pipeline: 'Pure Native Color Space with Deep Linear Shadow Grading',
    sound: 'Sub-zero mountain gale across limestone precipices',
    swatches: ['#0d1319', '#1f2e3a', '#435e72', '#7a96a8', '#c0d4df'],
    bts: [
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
        caption: 'Bivouac camp at 2,800m awaiting alpine dawn light'
      },
      {
        url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1600&q=80',
        caption: 'Sub-zero battery management and carbon fiber tripod anchorage'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
        caption: 'Wide 2.39:1 panorama: Clouds spilling over the Seceda knife-edge',
        wide: true
      }
    ],
    nextSlug: 'silence-kyoto',
    nextTitle: 'THE SILENCE OF KYOTO'
  }
};

class ProjectModalController {
  constructor() {
    this.modal = document.getElementById('projectModal');
    this.container = document.getElementById('modalContentStage');
    this.closeBtn = document.getElementById('modalCloseBtn');
    this.currentSlug = null;

    if (!this.modal) return;
    this.initEvents();
  }

  initEvents() {
    // Open project triggers
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-project]');
      if (trigger) {
        e.preventDefault();
        const slug = trigger.getAttribute('data-open-project');
        this.open(slug);
      }
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Escape key closes modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open(slug) {
    const data = PROJECTS_DATA[slug];
    if (!data) return;
    this.currentSlug = slug;

    // Build Modal Inner Markup
    this.container.innerHTML = `
      <div class="modal-hero-header">
        <div class="modal-category-meta">${data.category} • ${data.location} • ${data.year}</div>
        <h1 class="modal-title">${data.title}</h1>
        <p class="modal-synopsis">"${data.synopsis}"</p>
      </div>

      <div class="modal-main-visual">
        <img src="${data.mainImage}" alt="${data.title}" loading="lazy">
        <div class="story-frame-tag">${data.format}</div>
      </div>

      <div class="modal-technical-block">
        <div class="modal-tech-grid">
          <div class="tech-tile">
            <span class="tech-tile-label">Primary Camera</span>
            <span class="tech-tile-value">${data.camera}</span>
          </div>
          <div class="tech-tile">
            <span class="tech-tile-label">Optics & Glass</span>
            <span class="tech-tile-value">${data.lenses}</span>
          </div>
          <div class="tech-tile">
            <span class="tech-tile-label">Sensor Architecture</span>
            <span class="tech-tile-value">${data.sensor}</span>
          </div>
          <div class="tech-tile">
            <span class="tech-tile-label">Color Science</span>
            <span class="tech-tile-value">${data.pipeline}</span>
          </div>
        </div>
      </div>

      <div class="palette-strip">
        <div class="palette-label">Film Color Grade Palette Extraction</div>
        <div class="palette-swatches">
          ${data.swatches.map(color => `
            <div class="palette-swatch" style="background-color: ${color};">
              <span>${color}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="bts-gallery-section">
        <div class="bts-header">BEHIND THE SCENES & PRODUCTION STILLS</div>
        <div class="bts-frames-grid">
          ${data.bts.map(frame => `
            <div class="bts-frame-item ${frame.wide ? 'wide' : ''}">
              <img src="${frame.url}" alt="${frame.caption}" loading="lazy">
              <div class="bts-caption">${frame.caption}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="modal-bottom-nav">
        <button class="story-cta-btn" id="modalBackToStoriesBtn">
          <span>← All Stories</span>
        </button>
        <button class="next-film-btn" data-open-project="${data.nextSlug}">
          <span class="next-film-label">Next Story →</span>
          <span class="next-film-title">${data.nextTitle}</span>
        </button>
      </div>
    `;

    document.getElementById('modalBackToStoriesBtn').addEventListener('click', () => this.close());

    // Show modal and lock body scroll
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.modal.scrollTo({ top: 0, behavior: 'instant' });
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.ProjectModalController = ProjectModalController;
