/**
 * AURELIA GRAND RESORT & SPA
 * Master Interactive Controller & Application Logic
 * Pure Vanilla JavaScript - Zero External Dependencies
 */

(function () {
  'use strict';

  // --- App State ---
  const state = {
    selectedRoom: null,
    selectedCategory: 'all',
    selectedGalleryCategory: 'all',
    activeTestimonial: 0,
    testimonialTimer: null,
    lightboxIndex: 0,
    lightboxList: [],
    booking: {
      checkIn: '',
      checkOut: '',
      roomType: '',
      guests: '2 Guests',
      roomsCount: 1,
      nights: 3,
      basePrice: 950,
      selectedAddons: [],
      guestInfo: {
        title: 'Mr.',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        requests: ''
      }
    },
    audio: {
      isPlaying: false,
      ctx: null,
      gainNode: null,
      oscillators: []
    }
  };

  // --- DOM Elements Cache ---
  const DOM = {};

  function initDOMElements() {
    DOM.navbar = document.getElementById('siteNavbar');
    DOM.mobileToggle = document.getElementById('mobileNavToggle');
    DOM.mobileDrawer = document.getElementById('mobileDrawer');
    DOM.mobileOverlay = document.getElementById('mobileDrawerOverlay');
    DOM.soundToggle = document.getElementById('soundToggleBtn');
    DOM.heroCanvas = document.getElementById('heroCanvas');

    // Quick Search Inputs
    DOM.quickCheckIn = document.getElementById('quickCheckIn');
    DOM.quickCheckOut = document.getElementById('quickCheckOut');
    DOM.quickRoomType = document.getElementById('quickRoomType');
    DOM.quickGuests = document.getElementById('quickGuests');
    DOM.quickCheckBtn = document.getElementById('quickCheckBtn');

    // Modals
    DOM.bookingModal = document.getElementById('bookingModal');
    DOM.roomDetailModal = document.getElementById('roomDetailModal');
    DOM.diningModal = document.getElementById('diningModal');
    DOM.spaModal = document.getElementById('spaModal');
    DOM.lightbox = document.getElementById('galleryLightbox');
    DOM.toastContainer = document.getElementById('toastContainer');

    // Containers
    DOM.roomsContainer = document.getElementById('roomsGridContainer');
    DOM.diningContainer = document.getElementById('diningGridContainer');
    DOM.wellnessContainer = document.getElementById('wellnessGridContainer');
    DOM.experiencesContainer = document.getElementById('experiencesGridContainer');
    DOM.galleryContainer = document.getElementById('galleryGridContainer');
    DOM.testimonialsTrack = document.getElementById('testimonialsTrack');
    DOM.testimonialsDots = document.getElementById('testimonialsDots');

    // Forms
    DOM.contactForm = document.getElementById('contactConciergeForm');
    DOM.newsletterForm = document.getElementById('newsletterForm');
  }

  // --- Initial Setup on DOM Ready ---
  document.addEventListener('DOMContentLoaded', () => {
    initDOMElements();
    initDatePickers();
    initNavbarScroll();
    initMobileNav();
    initHeroParticles();
    renderRooms();
    renderDining();
    renderWellness();
    renderExperiences();
    renderGallery();
    initGalleryFilter();
    initTestimonialsSlider();
    initAnimatedStats();
    initInteractiveMap();
    initBookingEngine();
    initModalsCloseHandlers();
    initContactForm();
    initNewsletterForm();
    initAudioSynthesizer();
    initSmoothScroll();
  });

  // --- 1. Date Defaults & Night Calculation ---
  function initDatePickers() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const departure = new Date(tomorrow);
    departure.setDate(departure.getDate() + 3);

    const formatDate = (d) => d.toISOString().split('T')[0];

    const minDateStr = formatDate(today);
    const tomorrowStr = formatDate(tomorrow);
    const departureStr = formatDate(departure);

    if (DOM.quickCheckIn) {
      DOM.quickCheckIn.min = minDateStr;
      DOM.quickCheckIn.value = tomorrowStr;
    }
    if (DOM.quickCheckOut) {
      DOM.quickCheckOut.min = tomorrowStr;
      DOM.quickCheckOut.value = departureStr;
    }

    state.booking.checkIn = tomorrowStr;
    state.booking.checkOut = departureStr;
    calculateNights();

    DOM.quickCheckIn?.addEventListener('change', (e) => {
      const newIn = new Date(e.target.value);
      const curOut = new Date(DOM.quickCheckOut.value);
      if (newIn >= curOut) {
        const nextDay = new Date(newIn);
        nextDay.setDate(nextDay.getDate() + 1);
        DOM.quickCheckOut.value = formatDate(nextDay);
      }
      DOM.quickCheckOut.min = e.target.value;
      state.booking.checkIn = e.target.value;
      state.booking.checkOut = DOM.quickCheckOut.value;
      calculateNights();
    });

    DOM.quickCheckOut?.addEventListener('change', (e) => {
      state.booking.checkOut = e.target.value;
      calculateNights();
    });

    DOM.quickCheckBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      state.booking.roomType = DOM.quickRoomType ? DOM.quickRoomType.value : '';
      state.booking.guests = DOM.quickGuests ? DOM.quickGuests.value : '2 Guests';
      openBookingModal(1);
    });
  }

  function calculateNights() {
    const d1 = new Date(state.booking.checkIn);
    const d2 = new Date(state.booking.checkOut);
    const diff = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));
    state.booking.nights = isNaN(diff) ? 3 : diff;
    return state.booking.nights;
  }

  // --- 2. Floating Navbar Scroll & Mobile Menu ---
  function initNavbarScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        DOM.navbar.classList.add('scrolled');
      } else {
        DOM.navbar.classList.remove('scrolled');
      }
      updateActiveNavLink();
    }, { passive: true });
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link?.classList.add('active');
      }
    });
  }

  function initMobileNav() {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !DOM.mobileDrawer.classList.contains('open');
      DOM.mobileDrawer.classList.toggle('open', isOpen);
      DOM.mobileOverlay.classList.toggle('open', isOpen);
      DOM.mobileToggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    DOM.mobileToggle?.addEventListener('click', () => toggleMenu());
    DOM.mobileOverlay?.addEventListener('click', () => toggleMenu(false));

    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const navHeight = DOM.navbar ? DOM.navbar.offsetHeight : 80;
          const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight + 10;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      });
    });

    const backToTopBtn = document.getElementById('backToTopBtn');
    backToTopBtn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 3. Hero Atmospheric Particle Canvas ---
  function initHeroParticles() {
    if (!DOM.heroCanvas) return;
    const ctx = DOM.heroCanvas.getContext('2d');
    let width = (DOM.heroCanvas.width = window.innerWidth);
    let height = (DOM.heroCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = DOM.heroCanvas.width = window.innerWidth;
      height = DOM.heroCanvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 25 : 55;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.45 - 0.15,
        pulsing: Math.random() * 0.02 + 0.005
      });
    }

    let animationFrameId;
    function render() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += Math.sin(Date.now() * p.pulsing) * 0.008;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0.1, Math.min(0.8, p.alpha))})`;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    }

    render();
  }

  // --- 4. Render Rooms & Suites ---
  function renderRooms() {
    if (!DOM.roomsContainer || !window.RESORT_DATA) return;
    const rooms = window.RESORT_DATA.rooms;

    const filterButtons = document.querySelectorAll('.room-filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        filterRooms(cat);
      });
    });

    displayRoomsGrid(rooms);
  }

  function filterRooms(category) {
    state.selectedCategory = category;
    const rooms = window.RESORT_DATA.rooms;
    const filtered = category === 'all'
      ? rooms
      : rooms.filter(r => r.category.toLowerCase().includes(category.toLowerCase()));

    displayRoomsGrid(filtered);
  }

  function displayRoomsGrid(rooms) {
    DOM.roomsContainer.innerHTML = '';

    rooms.forEach(room => {
      const card = document.createElement('div');
      card.className = 'room-card';
      card.innerHTML = `
        <div class="room-image-wrap" data-room-id="${room.id}">
          <img src="${room.image}" alt="${room.name}" class="room-img" loading="lazy">
          <span class="room-tag">${room.tag}</span>
          <div class="room-price-badge">
            <div class="room-price-from">Starting From</div>
            <span class="room-price-amount">$${room.price.toLocaleString()}</span>
            <span class="room-price-period">/ night</span>
          </div>
        </div>
        <div class="room-content">
          <div class="room-category">${room.category}</div>
          <h3 class="room-title">${room.name}</h3>
          <p class="room-description">${room.description}</p>
          <div class="room-specs-row">
            <div class="room-spec-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
              <span>${room.guests}</span>
            </div>
            <div class="room-spec-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="12" rx="2"></rect><path d="M6 12h12"></path></svg>
              <span>${room.bed}</span>
            </div>
            <div class="room-spec-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg>
              <span>${room.size}</span>
            </div>
          </div>
          <div class="room-actions">
            <button class="btn btn-secondary btn-sm view-room-details-btn" data-room-id="${room.id}">
              <span>View Details</span>
            </button>
            <button class="btn btn-primary btn-sm direct-reserve-room-btn" data-room-id="${room.id}">
              <span>Reserve</span>
            </button>
          </div>
        </div>
      `;

      // Event listeners
      card.querySelector('.room-image-wrap').addEventListener('click', () => openRoomDetailModal(room.id));
      card.querySelector('.view-room-details-btn').addEventListener('click', () => openRoomDetailModal(room.id));
      card.querySelector('.direct-reserve-room-btn').addEventListener('click', () => {
        selectRoomForBooking(room);
        openBookingModal(1);
      });

      DOM.roomsContainer.appendChild(card);
    });
  }

  // --- 5. Room Detail Modal Logic ---
  function openRoomDetailModal(roomId) {
    const room = window.RESORT_DATA.rooms.find(r => r.id === roomId);
    if (!room || !DOM.roomDetailModal) return;

    state.selectedRoom = room;

    const modalBody = DOM.roomDetailModal.querySelector('.modal-body-content');
    modalBody.innerHTML = `
      <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 2.5rem; align-items: start;">
        <div>
          <div style="position: relative; aspect-ratio: 16/10; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--gold-border); margin-bottom: 1rem;">
            <img id="detailMainImg" src="${room.gallery[0] || room.image}" alt="${room.name}" style="width:100%; height:100%; object-fit: cover;">
          </div>
          <div style="display: flex; gap: 0.75rem; overflow-x: auto; padding-bottom: 0.5rem;">
            ${(room.gallery || [room.image]).map((img, idx) => `
              <img src="${img}" alt="${room.name} ${idx+1}" class="detail-thumbnail" style="width: 80px; height: 55px; object-fit: cover; border-radius: var(--radius-xs); border: 1px solid ${idx===0 ? 'var(--gold-primary)' : 'rgba(212,175,55,0.2)'}; cursor: pointer;" onclick="document.getElementById('detailMainImg').src='${img}'; document.querySelectorAll('.detail-thumbnail').forEach(t=>t.style.borderColor='rgba(212,175,55,0.2)'); this.style.borderColor='var(--gold-primary)';">
            `).join('')}
          </div>
          <div style="margin-top: 1.5rem; background: rgba(14,24,42,0.6); padding: 1.25rem; border-radius: var(--radius-xs); border: 1px solid var(--gold-border-subtle);">
            <h4 style="font-family: var(--font-serif-display); font-size: 0.85rem; color: var(--gold-primary); margin-bottom: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">Complimentary Inclusions</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; color: var(--text-cream);">
              ${room.includes.map(inc => `<li style="display:flex; align-items:center; gap:0.5rem;"><span style="color:var(--gold-primary)">✦</span> ${inc}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div>
          <span class="gold-badge" style="margin-bottom: 0.75rem;">${room.category}</span>
          <h2 style="font-size: 1.85rem; margin-bottom: 0.5rem;">${room.name}</h2>
          <div style="font-family: var(--font-serif-editorial); font-size: 1.15rem; font-style: italic; color: var(--gold-light); margin-bottom: 1.25rem;">${room.view}</div>
          <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-subtle); margin-bottom: 1.5rem;">${room.description}</p>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; background: var(--bg-surface); padding: 1rem; border-radius: var(--radius-xs); border: 1px solid var(--gold-border-subtle); margin-bottom: 1.5rem; text-align: center;">
            <div>
              <div style="font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase;">Area</div>
              <div style="font-family: var(--font-serif-display); font-size: 0.85rem; color: var(--text-ivory); margin-top: 0.2rem;">${room.size}</div>
            </div>
            <div>
              <div style="font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase;">Occupancy</div>
              <div style="font-family: var(--font-serif-display); font-size: 0.85rem; color: var(--text-ivory); margin-top: 0.2rem;">${room.guests}</div>
            </div>
            <div>
              <div style="font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase;">Bedding</div>
              <div style="font-family: var(--font-serif-display); font-size: 0.85rem; color: var(--text-ivory); margin-top: 0.2rem;">${room.bed}</div>
            </div>
          </div>

          <h4 style="font-family: var(--font-serif-display); font-size: 0.85rem; color: var(--gold-primary); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem;">Suite Features & Amenities</h4>
          <ul style="list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.82rem; color: var(--text-muted); margin-bottom: 2rem;">
            ${room.features.map(f => `<li style="display:flex; align-items:center; gap:0.4rem;"><span style="color:var(--gold-primary); font-size:0.7rem;">✔</span> ${f}</li>`).join('')}
          </ul>

          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(212,175,55,0.2); padding-top: 1.25rem;">
            <div>
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Nightly Rate</div>
              <div style="font-family: var(--font-serif-display); font-size: 1.75rem; font-weight: 700; color: var(--gold-light);">$${room.price.toLocaleString()} <span style="font-size:0.8rem; font-weight:400; color:var(--text-subtle)">/ night</span></div>
            </div>
            <button id="modalBookNowBtn" class="btn btn-primary">
              <span>Reserve This Suite</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('modalBookNowBtn')?.addEventListener('click', () => {
      closeAllModals();
      selectRoomForBooking(room);
      openBookingModal(1);
    });

    openModal(DOM.roomDetailModal);
  }

  function selectRoomForBooking(room) {
    state.booking.selectedRoom = room;
    state.booking.basePrice = room.price;
    state.booking.roomType = room.name;

    if (DOM.quickRoomType) {
      DOM.quickRoomType.value = room.category;
    }
  }

  // --- 6. Render Dining Section ---
  function renderDining() {
    if (!DOM.diningContainer || !window.RESORT_DATA) return;
    const diningList = window.RESORT_DATA.dining;

    DOM.diningContainer.innerHTML = '';
    diningList.forEach(dining => {
      const card = document.createElement('div');
      card.className = 'dining-card';
      card.innerHTML = `
        <div class="dining-img-wrap">
          <img src="${dining.image}" alt="${dining.name}" class="dining-img" loading="lazy">
          <span class="dining-type-badge">${dining.type}</span>
        </div>
        <div class="dining-info">
          <h3 class="dining-title">${dining.name}</h3>
          <div class="dining-tagline">${dining.tagline}</div>
          <p class="dining-desc">${dining.description}</p>
          <div class="dining-meta">
            <span><strong>Hours:</strong> ${dining.hours}</span>
            <span><strong>Attire:</strong> ${dining.dressCode}</span>
          </div>
          <div class="dining-actions">
            <button class="btn btn-secondary btn-sm view-menu-btn" data-dining-id="${dining.id}">
              <span>View Menu</span>
            </button>
            <button class="btn btn-primary btn-sm book-table-btn" data-dining-id="${dining.id}">
              <span>Reserve Table</span>
            </button>
          </div>
        </div>
      `;

      card.querySelector('.view-menu-btn').addEventListener('click', () => openDiningModal(dining.id, 'menu'));
      card.querySelector('.book-table-btn').addEventListener('click', () => openDiningModal(dining.id, 'reserve'));

      DOM.diningContainer.appendChild(card);
    });
  }

  function openDiningModal(diningId, mode) {
    const dining = window.RESORT_DATA.dining.find(d => d.id === diningId);
    if (!dining || !DOM.diningModal) return;

    const modalBody = DOM.diningModal.querySelector('.modal-body-content');
    modalBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <span class="gold-badge">${dining.type}</span>
        <h2 style="font-size: 2rem; margin-bottom: 0.3rem;">${dining.name}</h2>
        <div style="font-family: var(--font-serif-editorial); font-size: 1.25rem; font-style: italic; color: var(--gold-pale);">${dining.chef}</div>
      </div>

      <div style="display: flex; gap: 1rem; border-bottom: 1px solid var(--gold-border-subtle); margin-bottom: 2rem; justify-content: center;">
        <button id="tabMenuBtn" class="btn-text-gold ${mode==='menu'?'active':''}" style="padding-bottom: 0.8rem;">Tasting Menu Highlights</button>
        <button id="tabReserveBtn" class="btn-text-gold ${mode==='reserve'?'active':''}" style="padding-bottom: 0.8rem;">Table Reservation Request</button>
      </div>

      <div id="diningMenuPanel" style="display: ${mode==='menu'?'block':'none'};">
        <div style="display: grid; gap: 1.25rem; margin-bottom: 2rem;">
          ${dining.menuHighlights.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dashed rgba(212,175,55,0.15); padding-bottom: 0.75rem;">
              <div>
                <div style="font-family: var(--font-serif-display); font-size: 1rem; color: var(--text-ivory);">${item.name}</div>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.15rem;">${item.detail}</div>
              </div>
              <div style="font-family: var(--font-serif-display); font-size: 1.1rem; color: var(--gold-light); font-weight: 600; padding-left: 1.5rem;">${item.price}</div>
            </div>
          `).join('')}
        </div>
        <div style="text-align: center;">
          <button id="switchReserveBtn" class="btn btn-primary">
            <span>Request Table at ${dining.name}</span>
          </button>
        </div>
      </div>

      <div id="diningReservePanel" style="display: ${mode==='reserve'?'block':'none'};">
        <form id="diningReservationForm" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem;">
          <div>
            <label class="form-label">Date</label>
            <input type="date" class="form-control" required value="${state.booking.checkIn}">
          </div>
          <div>
            <label class="form-label">Preferred Time</label>
            <select class="form-control" required>
              <option value="19:00">19:00 PM</option>
              <option value="19:30">19:30 PM</option>
              <option value="20:00" selected>20:00 PM</option>
              <option value="20:30">20:30 PM</option>
              <option value="21:00">21:00 PM</option>
            </select>
          </div>
          <div>
            <label class="form-label">Number of Guests</label>
            <select class="form-control" required>
              <option value="1">1 Guest</option>
              <option value="2" selected>2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="6+">6+ Guests (Private Salon)</option>
            </select>
          </div>
          <div>
            <label class="form-label">Seating Preference</label>
            <select class="form-control">
              <option value="terrace">Panoramic Terrace</option>
              <option value="indoor">Main Grand Salon</option>
              <option value="chef">Chef's Viewing Counter</option>
            </select>
          </div>
          <div class="form-group full-width">
            <label class="form-label">Guest Full Name</label>
            <input type="text" class="form-control" placeholder="e.g. Lady Vivienne Montgomery" required>
          </div>
          <div class="form-group full-width">
            <label class="form-label">Dietary Requirements or Occasion</label>
            <textarea class="form-control" style="min-height: 80px;" placeholder="e.g. Anniversary celebration, shellfish allergy, champagne pairing preference..."></textarea>
          </div>
          <div class="form-group full-width" style="text-align: right; margin-top: 1rem;">
            <button type="submit" class="btn btn-primary">
              <span>Confirm Table Request</span>
            </button>
          </div>
        </form>
      </div>
    `;

    const menuPanel = document.getElementById('diningMenuPanel');
    const reservePanel = document.getElementById('diningReservePanel');
    const tabMenuBtn = document.getElementById('tabMenuBtn');
    const tabReserveBtn = document.getElementById('tabReserveBtn');

    tabMenuBtn?.addEventListener('click', () => {
      menuPanel.style.display = 'block';
      reservePanel.style.display = 'none';
      tabMenuBtn.classList.add('active');
      tabReserveBtn.classList.remove('active');
    });

    tabReserveBtn?.addEventListener('click', () => {
      menuPanel.style.display = 'none';
      reservePanel.style.display = 'block';
      tabReserveBtn.classList.add('active');
      tabMenuBtn.classList.remove('active');
    });

    document.getElementById('switchReserveBtn')?.addEventListener('click', () => {
      menuPanel.style.display = 'none';
      reservePanel.style.display = 'block';
      tabReserveBtn.classList.add('active');
      tabMenuBtn.classList.remove('active');
    });

    document.getElementById('diningReservationForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      closeAllModals();
      showToast('Table Reserved', `Your table request at ${dining.name} has been dispatched to the Maître d'.`);
    });

    openModal(DOM.diningModal);
  }

  // --- 7. Render Wellness & Spa ---
  function renderWellness() {
    if (!DOM.wellnessContainer || !window.RESORT_DATA) return;
    const wellnessList = window.RESORT_DATA.wellness;

    DOM.wellnessContainer.innerHTML = '';
    wellnessList.forEach(spa => {
      const card = document.createElement('div');
      card.className = 'wellness-card';
      card.innerHTML = `
        <div class="wellness-card-header">
          <span class="wellness-card-category">${spa.category}</span>
          <span class="wellness-card-price">${spa.price}</span>
        </div>
        <h3 class="wellness-card-title">${spa.title}</h3>
        <p class="wellness-card-desc">${spa.description}</p>
        <div class="wellness-card-footer">
          <span class="wellness-card-duration">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${spa.duration}
          </span>
          <button class="btn-text-gold book-spa-btn" data-spa-id="${spa.id}">
            <span>Book Treatment</span> →
          </button>
        </div>
      `;

      card.querySelector('.book-spa-btn').addEventListener('click', () => openSpaModal(spa.id));
      DOM.wellnessContainer.appendChild(card);
    });
  }

  function openSpaModal(spaId) {
    const spa = window.RESORT_DATA.wellness.find(s => s.id === spaId) || window.RESORT_DATA.wellness[0];
    if (!DOM.spaModal) return;

    const modalBody = DOM.spaModal.querySelector('.modal-body-content');
    modalBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <span class="gold-badge">The Aurelia Spa Sanctuary</span>
        <h2 style="font-size: 1.85rem; margin-bottom: 0.3rem;">${spa.title}</h2>
        <div style="font-family: var(--font-serif-editorial); font-size: 1.15rem; font-style: italic; color: var(--gold-light);">${spa.duration} | ${spa.price}</div>
      </div>

      <p style="text-align: center; max-width: 580px; margin: 0 auto 2rem auto; font-size: 0.92rem; color: var(--text-muted); line-height: 1.7;">
        ${spa.description}
      </p>

      <form id="spaBookingForm" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem;">
        <div>
          <label class="form-label">Preferred Date</label>
          <input type="date" class="form-control" required value="${state.booking.checkIn}">
        </div>
        <div>
          <label class="form-label">Preferred Time Window</label>
          <select class="form-control" required>
            <option value="morning">Morning (09:00 - 12:00)</option>
            <option value="afternoon" selected>Afternoon (13:00 - 17:00)</option>
            <option value="sunset">Twilight Sunset (17:30 - 20:00)</option>
          </select>
        </div>
        <div>
          <label class="form-label">Suite or Spa Sanctuary</label>
          <select class="form-control">
            <option value="spa">Hydrothermal Spa Sanctuary</option>
            <option value="insuite">In-Suite Private Treatment</option>
            <option value="ocean">Oceanfront Cliff Pavilion</option>
          </select>
        </div>
        <div>
          <label class="form-label">Therapist Preference</label>
          <select class="form-control">
            <option value="no-preference">No Preference</option>
            <option value="female">Female Therapist</option>
            <option value="male">Male Therapist</option>
          </select>
        </div>
        <div class="form-group full-width">
          <label class="form-label">Guest Name</label>
          <input type="text" class="form-control" placeholder="Your full name" required>
        </div>
        <div class="form-group full-width" style="text-align: right; margin-top: 1rem;">
          <button type="submit" class="btn btn-primary">
            <span>Confirm Spa Appointment</span>
          </button>
        </div>
      </form>
    `;

    document.getElementById('spaBookingForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      closeAllModals();
      showToast('Treatment Reserved', `Your appointment for ${spa.title} has been confirmed with our wellness director.`);
    });

    openModal(DOM.spaModal);
  }

  // --- 8. Render Experiences Section ---
  function renderExperiences() {
    if (!DOM.experiencesContainer || !window.RESORT_DATA) return;
    const expList = window.RESORT_DATA.experiences;

    DOM.experiencesContainer.innerHTML = '';
    expList.forEach(exp => {
      const card = document.createElement('div');
      card.className = 'experience-card';
      card.innerHTML = `
        <div class="experience-img-wrap">
          <img src="${exp.image}" alt="${exp.title}" class="experience-img" loading="lazy">
          <span class="experience-duration-badge">${exp.time}</span>
          <span class="experience-price-badge">${exp.price}</span>
        </div>
        <div class="experience-content">
          <h3 class="experience-title">${exp.title}</h3>
          <p class="experience-desc">${exp.description}</p>
          <ul class="experience-highlights-list">
            ${exp.highlights.map(h => `
              <li>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"></circle></svg>
                <span>${h}</span>
              </li>
            `).join('')}
          </ul>
          <button class="btn btn-outline-gold btn-sm inquire-experience-btn" data-exp-title="${exp.title}">
            <span>Inquire Experience</span>
          </button>
        </div>
      `;

      card.querySelector('.inquire-experience-btn').addEventListener('click', () => {
        showToast('Experience Inquiry', `Our Head Concierge will curate your private bespoke arrangements for: ${exp.title}.`);
      });

      DOM.experiencesContainer.appendChild(card);
    });
  }

  // --- 9. Render Filterable Gallery & Fullscreen Lightbox ---
  function renderGallery() {
    if (!DOM.galleryContainer || !window.RESORT_DATA) return;
    state.lightboxList = window.RESORT_DATA.gallery;
    displayGalleryItems(state.lightboxList);
  }

  function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        state.selectedGalleryCategory = cat;

        const gallery = window.RESORT_DATA.gallery;
        state.lightboxList = cat === 'all'
          ? gallery
          : gallery.filter(g => g.category.toLowerCase() === cat.toLowerCase());

        displayGalleryItems(state.lightboxList);
      });
    });
  }

  function displayGalleryItems(items) {
    DOM.galleryContainer.innerHTML = '';
    items.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = `gallery-item ${idx % 5 === 0 ? 'featured' : ''}`;
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="gallery-img" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-item-category">${item.category}</span>
          <h4 class="gallery-item-title">${item.title}</h4>
          <p class="gallery-item-caption">${item.caption}</p>
        </div>
      `;

      div.addEventListener('click', () => openLightbox(idx));
      DOM.galleryContainer.appendChild(div);
    });
  }

  function openLightbox(index) {
    state.lightboxIndex = index;
    updateLightboxContent();
    DOM.lightbox?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxContent() {
    const item = state.lightboxList[state.lightboxIndex];
    if (!item) return;

    const img = document.getElementById('lightboxImg');
    const title = document.getElementById('lightboxTitle');
    const desc = document.getElementById('lightboxDesc');
    const counter = document.getElementById('lightboxCounter');

    if (img) img.src = item.image;
    if (title) title.textContent = item.title;
    if (desc) desc.textContent = item.caption;
    if (counter) counter.textContent = `${state.lightboxIndex + 1} of ${state.lightboxList.length}`;
  }

  function nextLightbox() {
    state.lightboxIndex = (state.lightboxIndex + 1) % state.lightboxList.length;
    updateLightboxContent();
  }

  function prevLightbox() {
    state.lightboxIndex = (state.lightboxIndex - 1 + state.lightboxList.length) % state.lightboxList.length;
    updateLightboxContent();
  }

  function closeLightbox() {
    DOM.lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('lightboxNextBtn')?.addEventListener('click', nextLightbox);
  document.getElementById('lightboxPrevBtn')?.addEventListener('click', prevLightbox);
  document.getElementById('lightboxCloseBtn')?.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (DOM.lightbox && DOM.lightbox.classList.contains('open')) {
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'Escape') closeLightbox();
    }
  });

  // --- 10. Animated Statistics (Intersection Observer) ---
  function initAnimatedStats() {
    const statsSection = document.getElementById('whyAureliaSection');
    if (!statsSection || !window.RESORT_DATA) return;

    const statElements = document.querySelectorAll('.stat-number-value');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);

    function animateCounters() {
      const stats = window.RESORT_DATA.statistics;
      statElements.forEach((el, index) => {
        const target = stats[index] ? stats[index].number : 100;
        const duration = 2000;
        const startTime = performance.now();

        function updateNumber(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeOut * target);

          el.textContent = currentVal;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(updateNumber);
      });
    }
  }

  // --- 11. Testimonials Slider ---
  function initTestimonialsSlider() {
    const testimonials = window.RESORT_DATA.testimonials;
    if (!DOM.testimonialsTrack || !testimonials) return;

    DOM.testimonialsTrack.innerHTML = '';
    DOM.testimonialsDots.innerHTML = '';

    testimonials.forEach((t, idx) => {
      const slide = document.createElement('div');
      slide.className = `testimonial-slide ${idx === 0 ? 'active' : ''}`;
      slide.innerHTML = `
        <div class="quote-crest">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
        </div>
        <p class="testimonial-quote">“${t.quote}”</p>
        <div class="testimonial-rating">
          ${'★'.repeat(t.rating)}
        </div>
        <div class="testimonial-author-block">
          <img src="${t.avatar}" alt="${t.author}" class="testimonial-avatar">
          <div>
            <h4 class="author-name">${t.author}</h4>
            <div class="author-location">${t.location}</div>
            <div class="author-badge">${t.badge}</div>
          </div>
        </div>
      `;
      DOM.testimonialsTrack.appendChild(slide);

      const dot = document.createElement('div');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToTestimonial(idx));
      DOM.testimonialsDots.appendChild(dot);
    });

    document.getElementById('prevTestimonialBtn')?.addEventListener('click', () => {
      goToTestimonial((state.activeTestimonial - 1 + testimonials.length) % testimonials.length);
    });

    document.getElementById('nextTestimonialBtn')?.addEventListener('click', () => {
      goToTestimonial((state.activeTestimonial + 1) % testimonials.length);
    });

    startTestimonialAutoSlide();

    DOM.testimonialsTrack.addEventListener('mouseenter', () => clearInterval(state.testimonialTimer));
    DOM.testimonialsTrack.addEventListener('mouseleave', () => startTestimonialAutoSlide());

    // Mobile Swipe Support
    let touchStartX = 0;
    DOM.testimonialsTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    DOM.testimonialsTrack.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        goToTestimonial((state.activeTestimonial + 1) % testimonials.length);
      } else if (touchEndX - touchStartX > 50) {
        goToTestimonial((state.activeTestimonial - 1 + testimonials.length) % testimonials.length);
      }
    }, { passive: true });
  }

  function goToTestimonial(index) {
    state.activeTestimonial = index;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');

    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function startTestimonialAutoSlide() {
    clearInterval(state.testimonialTimer);
    state.testimonialTimer = setInterval(() => {
      const len = window.RESORT_DATA.testimonials.length;
      goToTestimonial((state.activeTestimonial + 1) % len);
    }, 6500);
  }

  // --- 12. Interactive Location Map Hotspots ---
  function initInteractiveMap() {
    const hotspots = document.querySelectorAll('.map-hotspot');
    const infoDisplay = document.getElementById('mapActiveInfo');

    hotspots.forEach(spot => {
      spot.addEventListener('click', () => {
        const title = spot.getAttribute('data-location-title');
        const desc = spot.getAttribute('data-location-desc');
        const coords = spot.getAttribute('data-location-coords');

        if (infoDisplay) {
          infoDisplay.innerHTML = `
            <div style="font-family: var(--font-serif-display); font-size: 0.95rem; color: var(--gold-light); margin-bottom: 0.2rem;">${title}</div>
            <div style="font-size: 0.82rem; color: var(--text-cream); margin-bottom: 0.3rem;">${desc}</div>
            <div style="font-size: 0.72rem; letter-spacing: 0.15em; color: var(--gold-primary); text-transform: uppercase;">GPS: ${coords}</div>
          `;
        }
      });
    });
  }

  // --- 13. Interactive 4-Step Booking Engine ---
  function initBookingEngine() {
    // Open Booking modal on any "Reserve Now" / "Reserve Your Stay" CTA
    document.querySelectorAll('.open-booking-engine-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openBookingModal(1);
      });
    });

    // Stepper navigation buttons
    document.getElementById('toStep2Btn')?.addEventListener('click', () => {
      saveStep1Data();
      renderStep2Addons();
      goToBookingStep(2);
    });

    document.getElementById('backToStep1Btn')?.addEventListener('click', () => goToBookingStep(1));

    document.getElementById('toStep3Btn')?.addEventListener('click', () => {
      goToBookingStep(3);
    });

    document.getElementById('backToStep2Btn')?.addEventListener('click', () => goToBookingStep(2));

    document.getElementById('confirmBookingForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      saveStep3Data();
      generateBookingVoucher();
      goToBookingStep(4);
    });

    document.getElementById('printVoucherBtn')?.addEventListener('click', () => {
      window.print();
    });

    document.getElementById('finishBookingBtn')?.addEventListener('click', () => {
      closeAllModals();
      showToast('Reservation Complete', 'Your reservation confirmation has been sent to your email.');
    });
  }

  function openBookingModal(step = 1) {
    // Sync quick search parameters into booking modal
    if (DOM.quickCheckIn && DOM.quickCheckIn.value) {
      state.booking.checkIn = DOM.quickCheckIn.value;
    }
    if (DOM.quickCheckOut && DOM.quickCheckOut.value) {
      state.booking.checkOut = DOM.quickCheckOut.value;
    }
    if (DOM.quickGuests && DOM.quickGuests.value) {
      state.booking.guests = DOM.quickGuests.value;
    }

    calculateNights();
    populateBookingStep1();
    goToBookingStep(step);
    openModal(DOM.bookingModal);
  }

  function populateBookingStep1() {
    const modalIn = document.getElementById('modalCheckIn');
    const modalOut = document.getElementById('modalCheckOut');
    const modalRoomSelect = document.getElementById('modalRoomSelect');
    const modalGuestsSelect = document.getElementById('modalGuests');

    if (modalIn) modalIn.value = state.booking.checkIn;
    if (modalOut) modalOut.value = state.booking.checkOut;
    if (modalGuestsSelect) modalGuestsSelect.value = state.booking.guests;

    // Populate room options
    if (modalRoomSelect) {
      modalRoomSelect.innerHTML = window.RESORT_DATA.rooms.map(r => `
        <option value="${r.id}" ${state.selectedRoom && state.selectedRoom.id === r.id ? 'selected' : ''}>
          ${r.name} — $${r.price.toLocaleString()} / night
        </option>
      `).join('');

      modalRoomSelect.addEventListener('change', updateBookingSummary);
    }

    modalIn?.addEventListener('change', (e) => {
      state.booking.checkIn = e.target.value;
      calculateNights();
      updateBookingSummary();
    });

    modalOut?.addEventListener('change', (e) => {
      state.booking.checkOut = e.target.value;
      calculateNights();
      updateBookingSummary();
    });

    updateBookingSummary();
  }

  function updateBookingSummary() {
    const modalRoomSelect = document.getElementById('modalRoomSelect');
    const roomId = modalRoomSelect ? modalRoomSelect.value : window.RESORT_DATA.rooms[0].id;
    const room = window.RESORT_DATA.rooms.find(r => r.id === roomId) || window.RESORT_DATA.rooms[0];

    state.selectedRoom = room;
    state.booking.basePrice = room.price;
    const nights = calculateNights();
    const roomTotal = room.price * nights;

    const summaryRoomName = document.getElementById('summaryRoomName');
    const summaryStayNights = document.getElementById('summaryStayNights');
    const summaryRoomTotal = document.getElementById('summaryRoomTotal');

    if (summaryRoomName) summaryRoomName.textContent = room.name;
    if (summaryStayNights) summaryStayNights.textContent = `${nights} Night${nights > 1 ? 's' : ''}`;
    if (summaryRoomTotal) summaryRoomTotal.textContent = `$${roomTotal.toLocaleString()}`;
  }

  function saveStep1Data() {
    const modalIn = document.getElementById('modalCheckIn');
    const modalOut = document.getElementById('modalCheckOut');
    const modalGuests = document.getElementById('modalGuests');

    if (modalIn) state.booking.checkIn = modalIn.value;
    if (modalOut) state.booking.checkOut = modalOut.value;
    if (modalGuests) state.booking.guests = modalGuests.value;

    calculateNights();
  }

  function renderStep2Addons() {
    const container = document.getElementById('addonsSelectionContainer');
    if (!container) return;

    container.innerHTML = window.RESORT_DATA.addons.map(addon => {
      const isChecked = state.booking.selectedAddons.some(a => a.id === addon.id);
      return `
        <div class="addon-card-option ${isChecked ? 'selected' : ''}" data-addon-id="${addon.id}">
          <div class="addon-info">
            <span class="addon-icon">${addon.icon}</span>
            <div>
              <div class="addon-title">${addon.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Optional bespoke enhancement</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="addon-cost">+$${addon.price}</span>
            <input type="checkbox" ${isChecked ? 'checked' : ''} style="accent-color: var(--gold-primary); transform: scale(1.2);">
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.addon-card-option').forEach(card => {
      card.addEventListener('click', () => {
        const addonId = card.getAttribute('data-addon-id');
        const addon = window.RESORT_DATA.addons.find(a => a.id === addonId);
        const idx = state.booking.selectedAddons.findIndex(a => a.id === addonId);

        if (idx >= 0) {
          state.booking.selectedAddons.splice(idx, 1);
          card.classList.remove('selected');
          card.querySelector('input').checked = false;
        } else {
          state.booking.selectedAddons.push(addon);
          card.classList.add('selected');
          card.querySelector('input').checked = true;
        }

        updateLiveGrandTotal();
      });
    });

    updateLiveGrandTotal();
  }

  function updateLiveGrandTotal() {
    const nights = state.booking.nights;
    const roomCost = (state.selectedRoom ? state.selectedRoom.price : 950) * nights;
    const addonsCost = state.booking.selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const grandTotal = roomCost + addonsCost;

    const totalEl = document.getElementById('step2GrandTotal');
    if (totalEl) totalEl.textContent = `$${grandTotal.toLocaleString()}`;
  }

  function saveStep3Data() {
    state.booking.guestInfo = {
      title: document.getElementById('guestTitle')?.value || 'Mr.',
      firstName: document.getElementById('guestFirstName')?.value || 'Alexander',
      lastName: document.getElementById('guestLastName')?.value || 'Vanderbilt',
      email: document.getElementById('guestEmail')?.value || 'guest@luxury.com',
      phone: document.getElementById('guestPhone')?.value || '+1 (555) 019-2834',
      country: document.getElementById('guestCountry')?.value || 'United Kingdom',
      requests: document.getElementById('guestSpecialRequests')?.value || 'Quiet floor, high vantage point.'
    };
  }

  function generateBookingVoucher() {
    const randomRef = 'AGR-' + Math.floor(100000 + Math.random() * 900000);
    const room = state.selectedRoom || window.RESORT_DATA.rooms[0];
    const nights = state.booking.nights;
    const roomCost = room.price * nights;
    const addonsCost = state.booking.selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const taxes = Math.round((roomCost + addonsCost) * 0.1);
    const grandTotal = roomCost + addonsCost + taxes;

    const voucherContainer = document.getElementById('bookingVoucherContainer');
    if (!voucherContainer) return;

    voucherContainer.innerHTML = `
      <div class="booking-voucher-card">
        <div class="voucher-header">
          <div>
            <div style="font-family: var(--font-serif-display); font-size: 1.25rem; color: var(--text-ivory); letter-spacing: 0.15em;">AURELIA GRAND RESORT & SPA</div>
            <div style="font-size: 0.75rem; color: var(--gold-pale); letter-spacing: 0.1em; text-transform: uppercase;">Official Stay Reservation Voucher</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Booking Reference</div>
            <div class="voucher-ref-code">${randomRef}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; background: rgba(14,24,42,0.5); padding: 1rem; border-radius: var(--radius-xs);">
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Primary Guest</div>
            <div style="font-family: var(--font-serif-display); font-size: 0.9rem; color: var(--text-ivory); margin-top: 0.2rem;">
              ${state.booking.guestInfo.title} ${state.booking.guestInfo.firstName} ${state.booking.guestInfo.lastName}
            </div>
          </div>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Stay Dates</div>
            <div style="font-family: var(--font-serif-display); font-size: 0.9rem; color: var(--text-ivory); margin-top: 0.2rem;">
              ${state.booking.checkIn} → ${state.booking.checkOut} (${nights} Nights)
            </div>
          </div>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Accommodation</div>
            <div style="font-family: var(--font-serif-display); font-size: 0.9rem; color: var(--gold-light); margin-top: 0.2rem;">
              ${room.name}
            </div>
          </div>
        </div>

        <table class="voucher-items-table">
          <tr>
            <td>Accommodation Rate (${nights} nights @ $${room.price.toLocaleString()}/night)</td>
            <td>$${roomCost.toLocaleString()}</td>
          </tr>
          ${state.booking.selectedAddons.map(a => `
            <tr>
              <td>✦ ${a.name}</td>
              <td>$${a.price.toLocaleString()}</td>
            </tr>
          `).join('')}
          <tr>
            <td>Resort Hospitality Tax & Luxury Surcharge (10%)</td>
            <td>$${taxes.toLocaleString()}</td>
          </tr>
        </table>

        <div class="voucher-total-row">
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Total Guaranteed Rate</div>
            <div style="font-size: 0.75rem; color: var(--gold-pale);">Payable at check-in with our Front Desk Concierge</div>
          </div>
          <div class="voucher-total-amount">$${grandTotal.toLocaleString()}</div>
        </div>

        <div style="margin-top: 1.5rem; padding: 0.85rem; background: rgba(212, 175, 55, 0.08); border: 1px solid var(--gold-border-subtle); border-radius: var(--radius-xs); font-size: 0.78rem; color: var(--text-cream); text-align: center;">
          ✦ Confirmation dispatched to <strong>${state.booking.guestInfo.email}</strong>. Our VIP Concierge will establish contact 48 hours prior to arrival for yacht or helicopter logistics.
        </div>
      </div>
    `;
  }

  function goToBookingStep(stepNumber) {
    document.querySelectorAll('.step-indicator').forEach((ind, i) => {
      ind.classList.remove('active');
      ind.classList.toggle('completed', i + 1 < stepNumber);
      if (i + 1 === stepNumber) ind.classList.add('active');
    });

    document.querySelectorAll('.booking-step-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const activePanel = document.getElementById(`bookingStep${stepNumber}`);
    if (activePanel) activePanel.classList.add('active');
  }

  // --- 14. Modals General Handler ---
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.remove('open');
    });
    document.body.style.overflow = '';
  }

  function initModalsCloseHandlers() {
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', closeAllModals);
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeAllModals();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllModals();
    });

    // Legal & Policies Modals
    document.getElementById('privacyPolicyLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Privacy Policy', 'Aurelia adheres to international GDPR and Swiss bank-level guest privacy standards.');
    });

    document.getElementById('termsConditionsLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Terms & Conditions', 'Complimentary cancellations are honored up to 72 hours prior to scheduled arrival.');
    });
  }

  // --- 15. Contact Concierge Form Validation ---
  function initContactForm() {
    if (!DOM.contactForm) return;

    DOM.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const phoneInput = document.getElementById('contactPhone');
      const msgInput = document.getElementById('contactMessage');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showFieldError(nameInput, 'Please provide your full name');
        isValid = false;
      } else {
        clearFieldError(nameInput);
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'Please provide a valid email address');
        isValid = false;
      } else {
        clearFieldError(emailInput);
      }

      // Validate Message
      if (!msgInput.value.trim() || msgInput.value.trim().length < 5) {
        showFieldError(msgInput, 'Please state your message or inquiry');
        isValid = false;
      } else {
        clearFieldError(msgInput);
      }

      if (isValid) {
        showToast('Inquiry Dispatched', `Thank you, ${nameInput.value}. Our Head Concierge will reply within 4 hours.`);
        DOM.contactForm.reset();
      }
    });

    function showFieldError(inputEl, msg) {
      inputEl.classList.add('error');
      const errEl = inputEl.parentElement.querySelector('.error-message');
      if (errEl) {
        errEl.textContent = msg;
        errEl.classList.add('visible');
      }
    }

    function clearFieldError(inputEl) {
      inputEl.classList.remove('error');
      const errEl = inputEl.parentElement.querySelector('.error-message');
      if (errEl) {
        errEl.classList.remove('visible');
      }
    }
  }

  // --- 16. Newsletter Subscription ---
  function initNewsletterForm() {
    if (!DOM.newsletterForm) return;

    DOM.newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = DOM.newsletterForm.querySelector('.newsletter-input');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!input || !emailRegex.test(input.value.trim())) {
        showToast('Invalid Email', 'Please enter a valid luxury dispatch email.');
        return;
      }

      showToast('Welcome to Aurelia Gazette', 'You have been added to our private seasonal dispatch registry.');
      input.value = '';
    });
  }

  // --- 17. Atmospheric Ambient Audio Synthesizer ---
  function initAudioSynthesizer() {
    if (!DOM.soundToggle) return;

    DOM.soundToggle.addEventListener('click', () => {
      if (state.audio.isPlaying) {
        stopAmbientSound();
      } else {
        startAmbientSound();
      }
    });
  }

  function startAmbientSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!state.audio.ctx) {
        state.audio.ctx = new AudioCtx();
      }

      if (state.audio.ctx.state === 'suspended') {
        state.audio.ctx.resume();
      }

      const ctx = state.audio.ctx;
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 3);
      gainNode.connect(ctx.destination);
      state.audio.gainNode = gainNode;

      // Soft harmonic chords (F# major 9 / warm Mediterranean dusk chime)
      const frequencies = [185.00, 277.18, 369.99, 440.00];
      state.audio.oscillators = frequencies.map(freq => {
        const osc = ctx.createOscillator();
        const biquad = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        biquad.type = 'lowpass';
        biquad.frequency.setValueAtTime(400, ctx.currentTime);

        osc.connect(biquad);
        biquad.connect(gainNode);
        osc.start();
        return osc;
      });

      state.audio.isPlaying = true;
      DOM.soundToggle.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `;
      DOM.soundToggle.title = 'Mute Ambient Soundscape';
      showToast('Atmospheric Soundscape', 'Harmonic ambient soundscape engaged.');
    } catch (err) {
      console.warn('AudioContext not permitted or supported:', err);
    }
  }

  function stopAmbientSound() {
    if (state.audio.gainNode && state.audio.ctx) {
      state.audio.gainNode.gain.exponentialRampToValueAtTime(0.0001, state.audio.ctx.currentTime + 1);
      setTimeout(() => {
        state.audio.oscillators.forEach(osc => osc.stop());
        state.audio.oscillators = [];
      }, 1000);
    }
    state.audio.isPlaying = false;
    DOM.soundToggle.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>
    `;
    DOM.soundToggle.title = 'Play Ambient Soundscape';
  }

  // --- 18. Toast Notification Utility ---
  function showToast(title, message) {
    if (!DOM.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 14 14"></polyline>
        </svg>
      </div>
      <div class="toast-content">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;

    DOM.toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // Expose useful hooks globally for inline HTML handlers if needed
  window.AureliaApp = {
    openBookingModal,
    openRoomDetailModal,
    openDiningModal,
    openSpaModal,
    showToast
  };

})();
