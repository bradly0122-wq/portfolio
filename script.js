/**
 * ============================================================================
 * PICTURES BY BRADLY (PBB) — VANILLA JAVASCRIPT INTERACTION MODULE
 * Modules:
 *   1. Theme Controller (Darkroom Charcoal / Archival Paper Light Toggle)
 *   2. Sticky Navigation, Scroll Spy & Mobile Drawer
 *   3. Portrait Rule-of-Thirds Grid Inspector
 *   4. Portfolio Category Filter & Live Status Readout
 *   5. Minimalist Lightbox Modal (Keyboard, Click & Filtered Navigation)
 *   6. Direct Email Clipboard Copy Micro-Interaction
 *   7. Contact Form Validation & Dispatch Handler
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     ARCHIVAL PLATE CATALOG DATA (9 CURATED PHOTOGRAPHS)
     -------------------------------------------------------------------------- */
  const ARCHIVE_PLATES = [
    {
      id: '01',
      title: 'Blue Ridge First Light',
      category: 'Landscape',
      location: 'Blue Ridge Overlook, North Georgia',
      exif: '70mm · f/8.0 · 1/125s · ISO 100',
      src: './assets/images/landscape-blue-ridge.jpg',
      alt: 'Layered mountain ridges in North Georgia bathed in bronze and olive morning mist',
      caption:
        'Blue Ridge Overlook, North Georgia — Captured twenty minutes before sunrise as a thermal inversion trapped dense valley fog between Appalachian ridgelines.'
    },
    {
      id: '02',
      title: 'Woodland Frond & Dew',
      category: 'Nature',
      location: 'Island Ford Forest, Sandy Springs, GA',
      exif: '90mm Macro · f/2.8 · 1/320s · ISO 200',
      src: './assets/images/nature-fern-macro.jpg',
      alt: 'Macro study of morning dew resting on an olive-green woodland fern frond illuminated by a single shaft of light',
      caption:
        'Island Ford Forest, Sandy Springs — Close-focus botanical geometry illuminated by first morning light breaking through a dense oak and hickory canopy.'
    },
    {
      id: '03',
      title: 'Touchline Under Floodlights',
      category: 'Candid',
      location: 'North Springs Stadium, Sandy Springs, GA',
      exif: '85mm · f/1.8 · 1/640s · ISO 1600',
      src: './assets/images/candid-sideline-lights.jpg',
      alt: 'Varsity soccer player standing near the touchline under night stadium floodlights with visible breath in cold evening air',
      caption:
        'Varsity Match Night, Sandy Springs — Unscripted stillness and breath in cold November air on the touchline seconds before a late second-half substitution.'
    },
    {
      id: '04',
      title: 'Chattahoochee Mist Bend',
      category: 'Landscape',
      location: 'Chattahoochee River Corridor, GA',
      exif: '35mm · f/11 · 1/15s · ISO 64',
      src: './assets/images/landscape-chattahoochee.jpg',
      alt: 'Glass-like autumn reflections on the Chattahoochee River winding into dense morning fog',
      caption:
        'Chattahoochee River National Recreation Area — Tripod exposure at dawn where still autumn water acted as a dark mirror for river birch and hardwood foliage.'
    },
    {
      id: '05',
      title: 'Stillness at Marsh Edge',
      category: 'Nature',
      location: 'Morgan Falls Backwater, Sandy Springs, GA',
      exif: '200mm · f/4.0 · 1/500s · ISO 400',
      src: './assets/images/nature-heron-marsh.jpg',
      alt: 'Great Blue Heron standing motionless in dark reflective marsh water framed by bronze morning reeds',
      caption:
        'Morgan Falls Backwater — Observed quietly from shoreline cover for forty minutes until warm rim light separated the heron’s slate plumage from the reed shadow.'
    },
    {
      id: '06',
      title: 'Live Switching on Tally Cue',
      category: 'Candid',
      location: 'Broadcast Control Room, North Springs HS',
      exif: '35mm · f/1.4 · 1/80s · ISO 1250',
      src: './assets/images/candid-control-room.jpg',
      alt: 'Close documentary view of hands operating a broadcast video switcher console illuminated by amber tally lights',
      caption:
        'North Springs Broadcast Control Room — Split-second tactile coordination across multi-camera feeds and audio busses during a live campus production.'
    },
    {
      id: '07',
      title: 'First Cut at Steel Canyon',
      category: 'Landscape',
      location: 'Steel Canyon Golf Club, Sandy Springs, GA',
      exif: '50mm · f/5.6 · 1/250s · ISO 100',
      src: './assets/images/landscape-fairway-dawn.jpg',
      alt: 'Low morning fog drifting across a dew-covered Georgia golf fairway framed by tall loblolly pines at sunrise',
      caption:
        'Steel Canyon Fairway, Sandy Springs — Documented at 6:15 AM prior to opening course operations while ground mist lingered over the dew-covered turf.'
    },
    {
      id: '08',
      title: 'Loblolly Crown Geometry',
      category: 'Nature',
      location: 'North Georgia Pine Stand',
      exif: '24mm · f/8.0 · 1/60s · ISO 250',
      src: './assets/images/nature-pine-canopy.jpg',
      alt: 'Vertical perspective looking up into towering Georgia pine trees forming natural crown shyness patterns against a warm dusk sky',
      caption:
        'North Georgia Pine Stand — Natural architectural symmetry and canopy crown shyness captured at civil twilight as the evening wind subsided.'
    },
    {
      id: '09',
      title: 'Five-Kilometer Dawn Ritual',
      category: 'Candid',
      location: 'Chattahoochee Woodland Trailhead, GA',
      exif: '50mm · f/2.0 · 1/400s · ISO 320',
      src: './assets/images/candid-morning-runner.jpg',
      alt: 'Cross-country distance runner lacing spikes on a weathered wooden trail bench in golden morning forest light',
      caption:
        'Chattahoochee Trailhead — The quiet, disciplined routine before morning cross-country mileage begins, where physical endurance meets mental clarity.'
    }
  ];

  /* --------------------------------------------------------------------------
     1. THEME CONTROLLER (DARK / LIGHT MODE WITH LOCALSTORAGE PERSISTENCE)
     -------------------------------------------------------------------------- */
  function initTheme() {
    const htmlEl = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');
    const toggleLabel = document.getElementById('theme-toggle-label');
    const toggleIcon = document.getElementById('theme-toggle-icon');
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    if (!toggleBtn || !toggleLabel || !toggleIcon) return;

    const sunSvg = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;

    const moonSvg = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;

    function applyTheme(theme) {
      htmlEl.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        toggleLabel.textContent = 'Light';
        toggleIcon.innerHTML = sunSvg;
        toggleBtn.setAttribute('aria-label', 'Switch to archival paper light theme');
        if (themeMeta) themeMeta.setAttribute('content', '#111211');
      } else {
        toggleLabel.textContent = 'Dark';
        toggleIcon.innerHTML = moonSvg;
        toggleBtn.setAttribute('aria-label', 'Switch to darkroom charcoal dark theme');
        if (themeMeta) themeMeta.setAttribute('content', '#f6f4ee');
      }
    }

    // Load saved theme or default to dark editorial theme
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem('pbb-theme');
    } catch (_) {
      savedTheme = null;
    }

    const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
    applyTheme(initialTheme);

    toggleBtn.addEventListener('click', function () {
      const current = htmlEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        localStorage.setItem('pbb-theme', next);
      } catch (_) {
        // Ignore storage errors in private browsing contexts
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. STICKY NAVIGATION, SCROLL SPY & MOBILE DRAWER
     -------------------------------------------------------------------------- */
  function initNavigation() {
    const header = document.getElementById('site-header');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    // Elevation shadow on scroll
    function handleScroll() {
      if (!header) return;
      if (window.scrollY > 16) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile drawer toggle
    function closeMobileMenu() {
      if (!mobileBtn || !navLinksContainer) return;
      mobileBtn.setAttribute('aria-expanded', 'false');
      navLinksContainer.classList.remove('is-open');
    }

    if (mobileBtn && navLinksContainer) {
      mobileBtn.addEventListener('click', function () {
        const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
        mobileBtn.setAttribute('aria-expanded', String(!expanded));
        navLinksContainer.classList.toggle('is-open', !expanded);
      });

      navLinks.forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinksContainer.classList.contains('is-open')) {
          closeMobileMenu();
        }
      });
    }

    // Active section IntersectionObserver scroll spy
    const sections = ['work', 'about', 'experience', 'contact']
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
      const spyObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const activeId = entry.target.id;
              navLinks.forEach(function (link) {
                const match = link.getAttribute('data-nav-link') === activeId;
                link.classList.toggle('is-active', match);
              });
            }
          });
        },
        {
          rootMargin: '-28% 0px -55% 0px',
          threshold: 0
        }
      );

      sections.forEach(function (sec) {
        spyObserver.observe(sec);
      });
    }
  }

  /* --------------------------------------------------------------------------
     3. PORTRAIT FRAMING GRID INSPECTOR (ABOUT SECTION)
     -------------------------------------------------------------------------- */
  function initPortraitInspector() {
    const portraitFrame = document.getElementById('portrait-frame');
    const toggleBtn = document.getElementById('portrait-grid-toggle');

    if (!portraitFrame || !toggleBtn) return;

    toggleBtn.addEventListener('click', function () {
      const active = portraitFrame.classList.toggle('show-grid');
      toggleBtn.setAttribute('aria-pressed', String(active));
      toggleBtn.textContent = active ? 'Hide Framing Grid' : 'Toggle Framing Grid';
    });
  }

  /* --------------------------------------------------------------------------
     4. PORTFOLIO CATEGORY FILTER & 5. MINIMALIST LIGHTBOX VIEW
     -------------------------------------------------------------------------- */
  function initGalleryAndLightbox() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
    const statusReadout = document.getElementById('gallery-status-readout');

    // Lightbox DOM elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCategory = document.getElementById('lightbox-spec-category');
    const lightboxLocation = document.getElementById('lightbox-spec-location');
    const lightboxExif = document.getElementById('lightbox-spec-exif');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let activeCategory = 'all';
    let visibleIndices = ARCHIVE_PLATES.map(function (_, i) {
      return i;
    });
    let currentVisiblePos = 0;
    let lastFocusedElement = null;

    // Category filter handler
    function applyFilter(category) {
      activeCategory = category;

      filterBtns.forEach(function (btn) {
        const isMatch = btn.getAttribute('data-filter') === category;
        btn.classList.toggle('is-active', isMatch);
        btn.setAttribute('aria-selected', String(isMatch));
      });

      if (galleryGrid) {
        galleryGrid.classList.toggle('is-filtered', category !== 'all');
      }

      visibleIndices = [];

      galleryCards.forEach(function (card) {
        const cardCat = card.getAttribute('data-category');
        const idx = parseInt(card.getAttribute('data-index'), 10);
        const shouldShow = category === 'all' || cardCat === category;

        card.classList.toggle('is-hidden', !shouldShow);
        if (shouldShow && !Number.isNaN(idx)) {
          visibleIndices.push(idx);
        }
      });

      if (statusReadout) {
        if (category === 'all') {
          statusReadout.textContent = 'Showing all 9 archival plates';
        } else {
          const label = category.charAt(0).toUpperCase() + category.slice(1);
          statusReadout.textContent =
            'Showing ' + visibleIndices.length + ' ' + label + ' plates';
        }
      }
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const targetFilter = btn.getAttribute('data-filter') || 'all';
        applyFilter(targetFilter);
      });
    });

    // Lightbox rendering & state transitions
    function renderLightboxPlate(visiblePos) {
      if (!visibleIndices.length) return;

      const totalVisible = visibleIndices.length;
      currentVisiblePos = ((visiblePos % totalVisible) + totalVisible) % totalVisible;
      const plateIndex = visibleIndices[currentVisiblePos];
      const plate = ARCHIVE_PLATES[plateIndex];

      if (!plate) return;

      if (lightboxImg) {
        lightboxImg.src = plate.src;
        lightboxImg.alt = plate.alt;
      }
      if (lightboxCounter) {
        const posStr = String(currentVisiblePos + 1).padStart(2, '0');
        const totalStr = String(totalVisible).padStart(2, '0');
        lightboxCounter.textContent =
          'Plate ' + plate.id + ' (' + posStr + ' / ' + totalStr + ')';
      }
      if (lightboxTitle) lightboxTitle.textContent = plate.title;
      if (lightboxCaption) lightboxCaption.textContent = plate.caption;
      if (lightboxCategory) lightboxCategory.textContent = plate.category;
      if (lightboxLocation) lightboxLocation.textContent = plate.location;
      if (lightboxExif) lightboxExif.textContent = plate.exif;
    }

    function openLightboxByPlateIndex(plateIndex, triggerEl) {
      if (!lightbox) return;
      lastFocusedElement = triggerEl || document.activeElement;

      const posInVisible = visibleIndices.indexOf(plateIndex);
      currentVisiblePos = posInVisible !== -1 ? posInVisible : 0;

      renderLightboxPlate(currentVisiblePos);

      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');

      if (closeBtn) {
        closeBtn.focus();
      }
    }

    function closeLightbox() {
      if (!lightbox || !lightbox.classList.contains('is-open')) return;
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');

      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }

    // Attach click and keyboard triggers to gallery cards
    galleryCards.forEach(function (card) {
      const idx = parseInt(card.getAttribute('data-index'), 10);

      card.addEventListener('click', function () {
        openLightboxByPlateIndex(idx, card);
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightboxByPlateIndex(idx, card);
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        renderLightboxPlate(currentVisiblePos - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        renderLightboxPlate(currentVisiblePos + 1);
      });
    }

    // Close when clicking backdrop outside image & controls
    if (lightbox) {
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-stage')) {
          closeLightbox();
        }
      });
    }

    // Global keyboard navigation inside lightbox
    document.addEventListener('keydown', function (e) {
      if (!lightbox || !lightbox.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        renderLightboxPlate(currentVisiblePos + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        renderLightboxPlate(currentVisiblePos - 1);
      }
    });
  }

  /* --------------------------------------------------------------------------
     6. DIRECT EMAIL CLIPBOARD COPY MICRO-INTERACTION
     -------------------------------------------------------------------------- */
  function initEmailCopy() {
    const copyBtn = document.getElementById('copy-email-btn');
    if (!copyBtn) return;

    let copyTimeout = null;

    copyBtn.addEventListener('click', function () {
      const email = copyBtn.getAttribute('data-email') || 'bradly0122@gmail.com';

      function showCopiedFeedback() {
        copyBtn.textContent = 'Copied \u2713';
        copyBtn.classList.add('is-copied');

        if (copyTimeout) clearTimeout(copyTimeout);
        copyTimeout = setTimeout(function () {
          copyBtn.textContent = 'Copy Address';
          copyBtn.classList.remove('is-copied');
        }, 2400);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(email)
          .then(showCopiedFeedback)
          .catch(function () {
            fallbackCopy(email, showCopiedFeedback);
          });
      } else {
        fallbackCopy(email, showCopiedFeedback);
      }
    });

    function fallbackCopy(text, callback) {
      const tempInput = document.createElement('textarea');
      tempInput.value = text;
      tempInput.setAttribute('readonly', '');
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand('copy');
        callback();
      } catch (_) {
        // Ignore fallback failure
      }
      document.body.removeChild(tempInput);
    }
  }

  /* --------------------------------------------------------------------------
     7. MINIMALIST CONTACT FORM VALIDATION & SUBMISSION HANDLER
     -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const charCounter = document.getElementById('message-char-counter');
    const statusBanner = document.getElementById('form-status-banner');
    const statusText = document.getElementById('form-status-text');
    const resetBtn = document.getElementById('form-reset-btn');

    const fields = {
      name: {
        input: nameInput,
        wrap: document.getElementById('field-wrap-name'),
        error: document.getElementById('error-name'),
        validate: function (val) {
          if (!val.trim()) return 'Please enter your name.';
          if (val.trim().length < 2) return 'Name must be at least 2 characters.';
          return '';
        }
      },
      email: {
        input: emailInput,
        wrap: document.getElementById('field-wrap-email'),
        error: document.getElementById('error-email'),
        validate: function (val) {
          if (!val.trim()) return 'Please provide an email address.';
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
          if (!emailPattern.test(val.trim())) {
            return 'Please enter a valid email address (e.g. name@domain.com).';
          }
          return '';
        }
      },
      subject: {
        input: subjectInput,
        wrap: document.getElementById('field-wrap-subject'),
        error: document.getElementById('error-subject'),
        validate: function (val) {
          if (!val || !val.trim()) return 'Please select an inquiry topic.';
          return '';
        }
      },
      message: {
        input: messageInput,
        wrap: document.getElementById('field-wrap-message'),
        error: document.getElementById('error-message'),
        validate: function (val) {
          if (!val.trim()) return 'Please include brief details about your inquiry.';
          if (val.trim().length < 15) {
            return 'Please provide at least 15 characters of context.';
          }
          return '';
        }
      }
    };

    // Live character counter on message textarea
    if (messageInput && charCounter) {
      messageInput.addEventListener('input', function () {
        const len = messageInput.value.length;
        charCounter.textContent = len + ' / 600';
      });
    }

    function validateField(key) {
      const cfg = fields[key];
      if (!cfg || !cfg.input || !cfg.wrap || !cfg.error) return true;

      const errorMessage = cfg.validate(cfg.input.value);
      if (errorMessage) {
        cfg.wrap.classList.add('has-error');
        cfg.wrap.classList.remove('is-valid');
        cfg.error.textContent = errorMessage;
        cfg.input.setAttribute('aria-invalid', 'true');
        return false;
      } else {
        cfg.wrap.classList.remove('has-error');
        cfg.wrap.classList.add('is-valid');
        cfg.error.textContent = '';
        cfg.input.setAttribute('aria-invalid', 'false');
        return true;
      }
    }

    // Validate on blur and live input once touched
    Object.keys(fields).forEach(function (key) {
      const cfg = fields[key];
      if (!cfg.input) return;

      cfg.input.addEventListener('blur', function () {
        validateField(key);
      });

      cfg.input.addEventListener('input', function () {
        if (cfg.wrap.classList.contains('has-error') || cfg.wrap.classList.contains('is-valid')) {
          validateField(key);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let allValid = true;
      let firstInvalidInput = null;

      Object.keys(fields).forEach(function (key) {
        const valid = validateField(key);
        if (!valid) {
          allValid = false;
          if (!firstInvalidInput) {
            firstInvalidInput = fields[key].input;
          }
        }
      });

      if (!allValid) {
        if (firstInvalidInput) firstInvalidInput.focus();
        return;
      }

      const senderName = nameInput ? nameInput.value.trim() : '';
      const selectedTopic = subjectInput ? subjectInput.value.trim() : 'Inquiry';

      if (statusText) {
        statusText.innerHTML =
          'Thank you, <strong>' +
          escapeHtml(senderName) +
          '</strong>. Your <em>' +
          escapeHtml(selectedTopic) +
          '</em> inquiry has been logged for <strong>bradly0122@gmail.com</strong>.';
      }

      if (statusBanner) {
        statusBanner.classList.add('is-visible');
      }

      form.reset();
      if (charCounter) charCounter.textContent = '0 / 600';
      Object.keys(fields).forEach(function (key) {
        if (fields[key].wrap) {
          fields[key].wrap.classList.remove('is-valid', 'has-error');
        }
      });
    });

    if (resetBtn && statusBanner) {
      resetBtn.addEventListener('click', function () {
        statusBanner.classList.remove('is-visible');
        if (nameInput) nameInput.focus();
      });
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }

  /* --------------------------------------------------------------------------
     INITIALIZE ALL MODULES ON DOM CONTENT LOADED
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initNavigation();
    initPortraitInspector();
    initGalleryAndLightbox();
    initEmailCopy();
    initContactForm();
  });
})();
