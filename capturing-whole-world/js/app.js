/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * Master Application Orchestrator
 * (Jesper Landberg Reference Architecture)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Subsystems
  new window.JesperCursor();
  new window.FilmGrainRenderer();
  new window.AmbientSoundEngine();
  new window.SmoothScrollEngine();
  const transitionMgr = new window.ProjectTransitionManager();
  new window.ServiceHoverPreview();
  new window.WorldStoryController();

  initLiveTimecode();
  initHeaderScroll();
  initMobileDrawer();
  initContactInquiry();
  initDeepLinking(transitionMgr);
});

/**
 * 24.000 FPS Viewfinder Timecode Clock
 */
function initLiveTimecode() {
  const tcEl = document.getElementById('heroLiveTimecode');
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
 * Header Blur & Tint on Scroll
 */
function initHeaderScroll() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * Mobile Drawer Menu
 */
function initMobileDrawer() {
  const burger = document.getElementById('navBurgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const links = document.querySelectorAll('.mobile-link');

  if (!burger || !drawer) return;

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('active');
    drawer.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  links.forEach(l => {
    l.addEventListener('click', () => {
      burger.classList.remove('active');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Contact Inquiry Form Handler
 */
function initContactInquiry() {
  const form = document.getElementById('contactInquiryForm');
  const notice = document.getElementById('inquiryNotice');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.inquiry-submit-action');
    const originalText = btn.innerHTML;

    btn.innerHTML = 'TRANSMITTING INQUIRY...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.innerHTML = originalText;
      btn.style.opacity = '1';
      btn.disabled = false;
      if (notice) {
        notice.style.display = 'block';
        notice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 1200);
  });
}

/**
 * Deep Link Route Checker
 */
function initDeepLinking(transitionMgr) {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#project/')) {
    const slug = hash.replace('#project/', '');
    transitionMgr.openProject(slug);
  }

  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.slug) {
      transitionMgr.openProject(e.state.slug);
    } else {
      transitionMgr.closeProject();
    }
  });
}
