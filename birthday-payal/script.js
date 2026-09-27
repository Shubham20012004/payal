/* ============================================================
   PAYAL BIRTHDAY WEBSITE — EASY CUSTOMIZATION
   Edit the values below to personalize the website.
============================================================ */
const CONFIG = {

  name: "Payal",

  // CHANGE THIS TO PAYAL'S BIRTHDAY (format: YYYY-MM-DDTHH:MM:SS)
  birthdayDate: "2026-09-28T00:00:00",

  // CHANGE MUSIC HERE — drop your file in audio/ and update the name
  musicFile: "audio/birthday.mp3",
  musicVolume: 0.35,

  // CHANGE PHOTOS HERE — drop images in images/ and edit captions below
  photos: [
    { src: "images/payal1.jpeg", caption: "One of those perfect days ❤️" },
    { src: "images/payal2.jpeg", caption: "Memories that make me smile." },
    { src: "images/payal3.jpeg", caption: "Forever a favorite." },
    { src: "images/payal4.jpeg", caption: "Chaos, laughter & memories 😂" },
    { src: "images/payal5.jpeg", caption: "Beautiful moments." },
    { src: "images/payal6.jpeg", caption: "Just being ourselves." },
    { src: "images/payal7.jpeg", caption: "Another memory to keep." },
    { src: "images/payal8.jpeg", caption: "Always worth remembering." }
  ]
};

// CHANGE OUR STORY HERE — add/edit as many chapters as you like
const timelineData = [
  { chapter: "Chapter 01", title: "The Beginning", year: "", description: "Where it all started — two kids who had no idea how much chaos and love they'd share." },
  { chapter: "Chapter 02", title: "Growing Up", year: "", description: "Shared rooms, shared secrets, and a thousand small memories we didn't know we'd treasure." },
  { chapter: "Chapter 03", title: "The Chaos Years 😂", year: "", description: "The fights over nothing, the inside jokes nobody else understood, the pure chaos of it all." },
  { chapter: "Chapter 04", title: "So Many Memories", year: "", description: "Every celebration, every quiet evening, every ridiculous moment — all of it adding up to something real." },
  { chapter: "Chapter 05", title: "Today", year: "", description: "Still annoying each other, still showing up for each other. Still, always, family." }
];

/* ============================================================
   STATE
============================================================ */
let musicIsPlaying = false;
let cursorSparkleEnabled = true;
let lightboxIndex = 0;
let reducedMotion = false;

/* ============================================================
   INIT
============================================================ */
document.addEventListener("DOMContentLoaded", initializeWebsite);

function initializeWebsite() {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  try { initializeLoadingScreen(); } catch (e) { console.warn("loading screen error", e); }
  try { initializeMusic(); } catch (e) { console.warn("music error", e); }
  try { initializeNavigation(); } catch (e) { console.warn("nav error", e); }
  try { initializeCountdown(); } catch (e) { console.warn("countdown error", e); }
  try { initializeScrollAnimations(); } catch (e) { console.warn("scroll anim error", e); }
  try { initializeMemoryGallery(); } catch (e) { console.warn("gallery error", e); }
  try { initializeTimeline(); } catch (e) { console.warn("timeline error", e); }
  try { initializeMessageReveal(); } catch (e) { console.warn("message reveal error", e); }
  try { initializeGift(); } catch (e) { console.warn("gift error", e); }
  try { initializeCake(); } catch (e) { console.warn("cake error", e); }
  try { initializeLetter(); } catch (e) { console.warn("letter error", e); }
  try { createFloatingHearts(); } catch (e) { console.warn("hearts error", e); }
  try { initializeFinaleSky(); } catch (e) { console.warn("finale sky error", e); }
  try { initializeConfetti(); } catch (e) { console.warn("confetti error", e); }
  try { initializeCursorEffect(); } catch (e) { console.warn("cursor effect error", e); }
  try { initializeBackToTop(); } catch (e) { console.warn("back to top error", e); }
  try { initializeStartSurpriseBtn(); } catch (e) { console.warn("start surprise error", e); }
}

/* ============================================================
   1. LOADING SCREEN
============================================================ */
function initializeLoadingScreen() {
  const screen = document.getElementById("loadingScreen");
  const particlesWrap = screen.querySelector(".loading-particles");
  const openBtn = document.getElementById("openSurpriseBtn");

  // Generate ambient particles
  const count = reducedMotion ? 8 : 26;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.animationDelay = (Math.random() * 3.5) + "s";
    particlesWrap.appendChild(p);
  }

  openBtn.addEventListener("click", () => {
    screen.classList.add("is-hidden");
    document.body.style.overflow = "";
    attemptAutoplay();
    triggerConfettiBurst("open");
    setTimeout(() => {
      screen.setAttribute("aria-hidden", "true");
      screen.style.display = "none";
    }, 1100);
  });

  // Lock scroll while loading screen is visible
  document.body.style.overflow = "hidden";
}

function initializeStartSurpriseBtn() {
  const btn = document.getElementById("startSurpriseBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const target = document.getElementById("countdown");
    if (target) target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  });
}

/* ============================================================
   2. BACKGROUND MUSIC
============================================================ */
function initializeMusic() {
  const birthdayMusic = document.getElementById("birthdayMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");

  birthdayMusic.loop = true;
  birthdayMusic.volume = CONFIG.musicVolume;

  musicToggle.addEventListener("click", () => {
    if (!birthdayMusic.src && !birthdayMusic.currentSrc) return;
    if (musicIsPlaying) {
      birthdayMusic.pause();
      musicIsPlaying = false;
      musicIcon.textContent = "🔇";
      musicToggle.setAttribute("aria-pressed", "false");
    } else {
      birthdayMusic.play().then(() => {
        musicIsPlaying = true;
        musicIcon.textContent = "🔊";
        musicToggle.setAttribute("aria-pressed", "true");
      }).catch(() => { /* silently ignore */ });
    }
  });

  birthdayMusic.addEventListener("error", () => {
    console.warn("Background music failed to load. The website will continue without it.");
  });
}

function attemptAutoplay() {
  const birthdayMusic = document.getElementById("birthdayMusic");
  const musicIcon = document.getElementById("musicIcon");
  const musicToggle = document.getElementById("musicToggle");
  if (!birthdayMusic) return;

  birthdayMusic.play().then(() => {
    musicIsPlaying = true;
    musicIcon.textContent = "🔊";
    musicToggle.setAttribute("aria-pressed", "true");
  }).catch(() => {
    showMusicPrompt();
  });
}

function showMusicPrompt() {
  const prompt = document.getElementById("musicPrompt");
  const playBtn = document.getElementById("playMusicBtn");
  const birthdayMusic = document.getElementById("birthdayMusic");
  const musicIcon = document.getElementById("musicIcon");
  const musicToggle = document.getElementById("musicToggle");

  prompt.classList.remove("hidden");

  const handler = () => {
    birthdayMusic.play().then(() => {
      musicIsPlaying = true;
      musicIcon.textContent = "🔊";
      musicToggle.setAttribute("aria-pressed", "true");
    }).catch(() => { /* still blocked, do nothing technical */ });
    prompt.classList.add("hidden");
    playBtn.removeEventListener("click", handler);
  };
  playBtn.addEventListener("click", handler);
}

/* ============================================================
   3. NAVIGATION
============================================================ */
function initializeNavigation() {
  const nav = document.getElementById("mainNav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }, { passive: true });

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  links.querySelectorAll(".nav__link").forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ============================================================
   4. COUNTDOWN
============================================================ */
function initializeCountdown() {
  const timerEl = document.getElementById("countdownTimer");
  const doneEl = document.getElementById("countdownDone");

  const target = new Date(CONFIG.birthdayDate);
  if (isNaN(target.getTime())) {
    console.warn("Invalid birthday date in CONFIG — countdown disabled.");
    timerEl.classList.add("hidden");
    return;
  }

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");

  let hasCelebrated = false;

  function tick() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      timerEl.classList.add("hidden");
      doneEl.classList.remove("hidden");
      if (!hasCelebrated) {
        hasCelebrated = true;
        triggerConfettiBurst("countdown");
        document.getElementById("countdown").classList.add("is-glowing");
      }
      clearInterval(intervalId);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(mins).padStart(2, "0");
    secsEl.textContent = String(secs).padStart(2, "0");
  }

  tick();
  const intervalId = setInterval(tick, 1000);
}

/* ============================================================
   5. SCROLL ANIMATIONS
============================================================ */
function initializeScrollAnimations() {
  const revealEls = document.querySelectorAll(".reveal-up");
  if (!("IntersectionObserver" in window) || revealEls.length === 0) {
    revealEls.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  revealEls.forEach(el => observer.observe(el));
}

/* ============================================================
   6. MEMORY GALLERY
============================================================ */
function initializeMemoryGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const rotations = [-3, 2, -1.5, 3, -2.5, 1.5, -1, 2.5];

  CONFIG.photos.forEach((photo, i) => {
    const item = document.createElement("figure");
    item.className = "gallery__item";
    item.setAttribute("role", "listitem");
    item.style.setProperty("--rot", (rotations[i % rotations.length]) + "deg");
    item.dataset.index = i;

    const img = document.createElement("img");
    img.src = photo.src;
    img.loading = "lazy";
    img.alt = `${CONFIG.name} — ${photo.caption.replace(/[❤️😂✨]/g, "").trim()}`;
    img.addEventListener("error", () => {
      item.classList.add("gallery__item--placeholder");
      const box = document.createElement("div");
      box.className = "gallery__placeholder-box";
      box.textContent = "📷";
      item.insertBefore(box, img);
    });

    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption;

    item.appendChild(img);
    item.appendChild(caption);
    item.addEventListener("click", () => openLightbox(i));
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", `Open photo: ${photo.caption}`);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); }
    });

    grid.appendChild(item);
  });

  // Reveal gallery items on scroll
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    grid.querySelectorAll(".gallery__item").forEach((el, idx) => {
      el.style.transitionDelay = (idx % 4) * 0.08 + "s";
      obs.observe(el);
    });
  } else {
    grid.querySelectorAll(".gallery__item").forEach(el => el.classList.add("is-visible"));
  }

  initializeLightboxControls();
}

function initializeLightboxControls() {
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", previousPhoto);
  document.getElementById("lightboxNext").addEventListener("click", nextPhoto);

  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("lightbox");
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") previousPhoto();
    if (e.key === "ArrowRight") nextPhoto();
  });
}

function openLightbox(index) {
  lightboxIndex = index;
  updateLightboxImage();
  document.getElementById("lightbox").classList.remove("hidden");
  document.getElementById("lightboxClose").focus();
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
  document.body.style.overflow = "";
}

function nextPhoto() {
  lightboxIndex = (lightboxIndex + 1) % CONFIG.photos.length;
  updateLightboxImage();
}

function previousPhoto() {
  lightboxIndex = (lightboxIndex - 1 + CONFIG.photos.length) % CONFIG.photos.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const photo = CONFIG.photos[lightboxIndex];
  if (!photo) return;
  const img = document.getElementById("lightboxImg");
  img.src = photo.src;
  img.alt = photo.caption;
  img.onerror = () => { img.style.display = "none"; };
  img.onload = () => { img.style.display = "block"; };
  document.getElementById("lightboxCaption").textContent = photo.caption;
}

/* ============================================================
   7. TIMELINE
============================================================ */
function initializeTimeline() {
  const wrap = document.getElementById("timelineList");
  if (!wrap) return;

  timelineData.forEach(item => {
    const el = document.createElement("div");
    el.className = "timeline__item";
    el.innerHTML = `
      <p class="timeline__chapter">${item.chapter}${item.year ? " · " + item.year : ""}</p>
      <h3 class="timeline__title">${item.title}</h3>
      <p class="timeline__desc">${item.description}</p>
    `;
    wrap.appendChild(el);
  });

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    wrap.querySelectorAll(".timeline__item").forEach(el => obs.observe(el));
  } else {
    wrap.querySelectorAll(".timeline__item").forEach(el => el.classList.add("is-visible"));
  }
}

/* ============================================================
   8. MESSAGE STAGGERED REVEAL
============================================================ */
function initializeMessageReveal() {
  const paragraphs = document.querySelectorAll("#messageText p");
  if (!paragraphs.length) return;

  if (!("IntersectionObserver" in window)) {
    paragraphs.forEach(p => p.classList.add("is-visible"));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        paragraphs.forEach((p, i) => {
          setTimeout(() => p.classList.add("is-visible"), i * (reducedMotion ? 0 : 220));
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  obs.observe(document.getElementById("message"));
}

/* ============================================================
   9. INTERACTIVE GIFT
============================================================ */
function initializeGift() {
  const btn = document.getElementById("openGiftBtn");
  if (!btn) return;
  btn.addEventListener("click", openGift);
}

function openGift() {
  const box = document.getElementById("giftBox");
  const message = document.getElementById("giftMessage");
  const btn = document.getElementById("openGiftBtn");

  if (box.classList.contains("is-open")) return;
  btn.disabled = true;

  box.classList.add("is-shaking");
  setTimeout(() => {
    box.classList.remove("is-shaking");
    box.classList.add("is-open");
    triggerConfettiBurst("gift");
    setTimeout(() => {
      message.classList.remove("hidden");
      message.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
    }, 500);
  }, reducedMotion ? 50 : 500);
}

/* ============================================================
   10. MAKE A WISH — CAKE
============================================================ */
function initializeCake() {
  const btn = document.getElementById("blowCandlesBtn");
  if (!btn) return;
  btn.addEventListener("click", blowCandles);
}

function blowCandles() {
  const cake = document.getElementById("wishCake");
  const result = document.getElementById("wishResult");
  const btn = document.getElementById("blowCandlesBtn");
  const section = document.getElementById("wish-cake");

  if (cake.classList.contains("is-blown")) return;
  btn.disabled = true;

  cake.classList.add("is-blown");
  section.style.background = "linear-gradient(135deg, #fff8f2, #fce5ef)";
  triggerConfettiBurst("cake");
  spawnTravelingStars();

  setTimeout(() => result.classList.remove("hidden"), 400);
}

function spawnTravelingStars() {
  const wrap = document.getElementById("cakeStars");
  if (!wrap) return;
  const count = reducedMotion ? 4 : 14;
  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    star.className = "floating-star";
    star.textContent = "✨";
    star.style.left = 30 + Math.random() * 40 + "%";
    star.style.bottom = "20%";
    star.style.fontSize = 10 + Math.random() * 10 + "px";
    star.style.setProperty("--drift", (Math.random() * 60 - 30) + "px");
    star.style.animationDuration = (2.2 + Math.random() * 1.5) + "s";
    wrap.appendChild(star);
    setTimeout(() => star.remove(), 4000);
  }
}

/* ============================================================
   11. FINAL LETTER
============================================================ */
function initializeLetter() {
  const btn = document.getElementById("openLetterBtn");
  if (!btn) return;
  btn.addEventListener("click", openLetter);
}

function openLetter() {
  const envelope = document.getElementById("envelope");
  const btn = document.getElementById("openLetterBtn");
  if (envelope.classList.contains("is-open")) return;
  envelope.classList.add("is-open");
  btn.disabled = true;
  triggerConfettiBurst("letter");
}

/* ============================================================
   12. FLOATING HEARTS
============================================================ */
function createFloatingHearts() {
  const containers = document.querySelectorAll(".floating-layer");
  if (!containers.length) return;
  const symbols = ["❤️", "💗", "✨", "⭐"];
  const maxPerContainer = reducedMotion ? 3 : 10;

  containers.forEach(container => {
    function spawn() {
      if (document.hidden) return;
      const existing = container.children.length;
      if (existing >= maxPerContainer) return;

      const el = document.createElement("span");
      el.className = "floating-heart";
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.left = Math.random() * 100 + "%";
      el.style.bottom = "-5%";
      el.style.fontSize = (12 + Math.random() * 16) + "px";
      el.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
      el.style.animationDuration = (6 + Math.random() * 4) + "s";
      container.appendChild(el);
      setTimeout(() => el.remove(), 11000);
    }

    const interval = setInterval(spawn, reducedMotion ? 3000 : 1400);
    spawn();
    // Store for potential cleanup (not required for this static page)
    container.dataset.intervalId = interval;
  });
}

/* ============================================================
   13. FINALE STARRY SKY
============================================================ */
function initializeFinaleSky() {
  const sky = document.getElementById("finaleSky");
  if (!sky) return;
  const count = reducedMotion ? 30 : 90;
  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = (Math.random() * 3) + "s";
    sky.appendChild(star);
  }

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerConfettiBurst("finale");
          triggerFireworks();
          obs.disconnect();
        }
      });
    }, { threshold: 0.5 });
    obs.observe(document.getElementById("finale"));
  }
}

function triggerFireworks() {
  if (typeof confetti !== "function") return;
  if (reducedMotion) return;
  const duration = 3000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#F0A8C3", "#D9C6F2", "#E3BE6E"] });
    confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#F0A8C3", "#D9C6F2", "#E3BE6E"] });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/* ============================================================
   14. CONFETTI
============================================================ */
function initializeConfetti() {
  // canvas-confetti attaches to its own canvas automatically;
  // our #confettiCanvas is kept for graceful fallback styling only.
}

function triggerConfettiBurst(eventName) {
  if (reducedMotion) return;
  if (typeof confetti !== "function") return;

  const presets = {
    open: { particleCount: 90, spread: 80, origin: { y: 0.5 } },
    countdown: { particleCount: 160, spread: 100, origin: { y: 0.4 } },
    gift: { particleCount: 130, spread: 90, origin: { y: 0.55 } },
    cake: { particleCount: 110, spread: 85, origin: { y: 0.6 } },
    letter: { particleCount: 70, spread: 70, origin: { y: 0.5 } },
    finale: { particleCount: 200, spread: 120, origin: { y: 0.3 } }
  };

  const preset = presets[eventName] || presets.open;
  confetti({ ...preset, colors: ["#F0A8C3", "#D9C6F2", "#E3BE6E", "#FFFFFF"] });
}

/* ============================================================
   15. CURSOR SPARKLE (desktop only)
============================================================ */
function initializeCursorEffect() {
  const isTouch = window.matchMedia("(hover: none)").matches;
  if (isTouch || reducedMotion) { cursorSparkleEnabled = false; return; }

  let lastSpawn = 0;
  document.addEventListener("mousemove", (e) => {
    if (!cursorSparkleEnabled) return;
    const now = Date.now();
    if (now - lastSpawn < 60) return; // throttle
    lastSpawn = now;

    const sparkle = document.createElement("span");
    sparkle.className = "cursor-sparkle";
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 900);
  });
}

/* ============================================================
   16. BACK TO TOP
============================================================ */
function initializeBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
}
