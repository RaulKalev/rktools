// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initialize Lenis Smooth Scroll
let lenis;

// Force Scroll to Top on Refresh (Aggressive)
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// Reinforce after load
window.addEventListener('load', () => {
    setTimeout(() => window.scrollTo(0, 0), 10);
});

document.addEventListener("DOMContentLoaded", () => {
    // Set Current Year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    // Check if Lenis loaded
    if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });

        // Sync GSAP with Lenis
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    } else if (typeof Lenis === 'undefined') {
        console.warn('Lenis not loaded');
    }
});


// ============================================
// Extreme Kinetics Animations
// ============================================

// 1. Text Splitter Helper
function splitTextToSpans(element) {
    const text = element.innerText;
    element.innerHTML = '';
    const words = text.split(' ');

    words.forEach(word => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        wordSpan.style.display = 'inline-block';
        wordSpan.style.overflow = 'hidden';
        wordSpan.style.verticalAlign = 'top';
        wordSpan.style.marginRight = '0.3em';

        const innerSpan = document.createElement('span');
        innerSpan.className = 'char-inner';
        innerSpan.innerText = word;
        innerSpan.style.display = 'inline-block';

        wordSpan.appendChild(innerSpan);
        element.appendChild(wordSpan);
    });
}

// 2. Logic: Theme, Lang, Interaction (Executed FIRST to set up DOM)
// ============================================

// Theme Switch
const themeBtn = document.getElementById('themeSwitch');
const savedTheme = localStorage.getItem('rk-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'light') {
    document.documentElement.classList.add('light');
} else if (!savedTheme && !prefersDark) {
    document.documentElement.classList.add('light');
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('light');
        const isLight = document.documentElement.classList.contains('light');
        localStorage.setItem('rk-theme', isLight ? 'light' : 'dark');
    });
}


// Language Logic
const strings = {
    en: {
        subtitle: 'Extra-Low Voltage Systems Engineer · Revit Specialist · Plugin & App Developer',
        nav_about: 'About', nav_workdone: 'Work', nav_contact: 'Contact',
        about_title: 'About me',
        about_list: `
        <li>Specializing in <strong>Revit</strong> electrical design workflows (Fire Alarm, CCTV, IT).</li>
        <li>Developing custom <strong>C# & Python</strong> plugins to automate the mundane.</li>
        <li>Practical, field-tested understanding of installation vs. design.</li>
    `,
        plugins_title: 'Revit Plugin Portfolio',
        plugins_sub: 'Purpose-built tools for electrical design, BIM coordination, and documentation workflows.',
        view_details: 'View details', more_info: 'Expand', close_info: 'Close',
        contact_title: 'Contact',
        footer: 'Raul Kalev',
        send: 'Send'
    },
    et: {
        subtitle: 'Nõrkvoolusüsteemide insener · Revit-spetsialist · Pluginate ja rakenduste arendaja',
        nav_about: 'Minust', nav_workdone: 'Tööd', nav_contact: 'Kontakt',
        about_title: 'Minust',
        about_list: `
        <li>Spetsialiseerun <strong>Revit</strong>-põhistele elektriprojektidele (ATS, Valve, IT).</li>
        <li>Arendan <strong>C# & Python</strong> pluginaid rutiini automatiseerimiseks.</li>
        <li>Praktiline ja objektil testitud kogemus paigalduse vallas.</li>
    `,
        plugins_title: 'Reviti pluginate portfoolio',
        plugins_sub: 'Elektriprojekteerimise, BIM-koordineerimise ja dokumenteerimise tööriistad.',
        view_details: 'Vaata lähemalt', more_info: 'Ava', close_info: 'Sulge',
        contact_title: 'Kontakt',
        footer: 'Raul Kalev',
        send: 'Saada'
    }
};

const langRoot = document.getElementById('langDropdown');
const langBtn = langRoot ? langRoot.querySelector('.lang-btn') : null;
const langMenu = langRoot ? langRoot.querySelector('.lang-menu') : null;
const currentFlag = document.getElementById('currentFlag');
const savedLang = localStorage.getItem('rk-lang') || (navigator.language?.startsWith('et') ? 'et' : 'en');

function applyLang(lang) {
    const dict = strings[lang] || strings.en;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');

        if (dict[key]) {
            // Special Handler for List (HTML Content)
            if (key === 'about_list') {
                el.innerHTML = dict[key];
                // Re-split the children LIs for animation
                el.querySelectorAll('li').forEach(li => splitTextToSpans(li));
            }
            // Handler for Split Text Elements
            else if (el.querySelectorAll('.word').length > 0) {
                el.setAttribute('data-original-text', dict[key]);
                el.innerText = dict[key];
                splitTextToSpans(el);
            }
            // Simple Text
            else {
                el.innerHTML = dict[key];
            }
        }
    });

    localStorage.setItem('rk-lang', lang);
    if (currentFlag) {
        currentFlag.textContent = lang === 'et' ? '🇪🇪' : '🇬🇧';
    }

    // Update button states
    document.querySelectorAll('.project-card.expanded .more-info').forEach(btn => {
        btn.textContent = dict.close_info;
    });
    document.querySelectorAll('.project-card:not(.expanded) .more-info').forEach(btn => {
        btn.textContent = dict.more_info;
    });
}

// Language Interaction
if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('open');
    });
}
if (langMenu) {
    langMenu.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-lang]');
        if (!btn) return;
        applyLang(btn.getAttribute('data-lang'));
        langMenu.classList.remove('open');
        // Reload page to reset GSAP animations with new text nodes?
        // Or implement complex kill/refresh logic. For now, simple reload is robust.
        // window.location.reload(); // Optional, but cleaner for animations
    });
}
document.addEventListener('click', () => langMenu.classList.remove('open'));


// Apply Language (Sets up DOM)
applyLang(savedLang);


// 3. Initial Setup: Split Text (Generic for non-i18n elements)
// Note: We don't animate the Hero Title characters here anymore because the 
// whole container zooms. We only split for potential hover effects or later use.
document.querySelectorAll('h2, .stat-value, .about-subtitle').forEach(el => {
    // Skip if already split by applyLang
    if (el.querySelector('.word')) return;

    const originalText = el.innerText;
    el.setAttribute('data-original-text', originalText);
    splitTextToSpans(el);
});


// ============================================
// 4. Extreme Kinetics Animations (GSAP)
// ============================================

// 5. Hero "Focus" Entry (Zoom/Scale) - SCROLL DRIVEN
// The user sees the name HUGE first, then scrolling shrinks it and reveals content.
const heroTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "+=1200", // More scroll distance for drama
        scrub: 1,
        pin: true,
        anticipatePin: 1
    },
    defaults: { ease: 'none' }
});

// Set initial state (Massive Name, Hidden Content)
gsap.set('.hero-title', {
    scale: 3, // 3x Zoom (Requested)
    filter: 'blur(0px)', // Clear text
    transformOrigin: 'center center',
    y: 0
});
gsap.set('.hero-subtitle', { y: 50, opacity: 0 });
gsap.set('.socials .social-link', { y: 30, opacity: 0, scale: 0.5 }); // Target links individually

// Animation Sequence linked to scroll
heroTl
    // Step 1: Shrink Name
    .to('.hero-title', {
        scale: 1,
        duration: 2
    })
    // Step 2: Reveal Info
    .to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 1
    }, '-=0.5') // Overlap
    // Step 3: Socials Pop In
    .to('.socials .social-link', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: 'back.out(2)'
    }, '-=0.2');


// 4. Section Headers "Explode" or Slide Up with Skew
document.querySelectorAll('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 90%',
        },
        y: 100,
        skewY: 10,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });
});


// 5. "About" Stats - 3D Slot Machine Rotation
// 5. "About" Stats - 3D Cube Reveal
gsap.from('.about-stats-container', {
    scrollTrigger: {
        trigger: '.about-stats-container',
        start: 'top 85%'
    },
    rotationX: -90, // Start flat (perpendicular to screen)
    opacity: 0,
    y: 100,
    transformOrigin: 'top center -100px', // Hinge from top-back
    duration: 1.5,
    ease: 'elastic.out(1, 0.7)' // Bouncy arrival
});

// Animate numbers *after* the card lands
// Animate numbers *after* the card lands
// Train Station Clock / Split-Flap Effect
const statChars = document.querySelectorAll('.stat-value .char-inner');
gsap.from(statChars, {
    scrollTrigger: {
        trigger: '.about-stats-container',
        start: 'top 70%',
        end: 'bottom top', // Allow reversing when scrolling back up
        toggleActions: 'play reverse play reverse'
    },
    rotationX: -90, // Flip from top
    opacity: 0,
    y: -20, // Slight slide from top
    stagger: 0.05,
    duration: 0.8,
    ease: 'back.out(1.7)',
    transformOrigin: 'center center'
});

// "The Bridge Between..." & List Items - Liquid Typing Effect
const liquidChars = document.querySelectorAll('.about-subtitle .char-inner, .feature-list li .char-inner');
gsap.from(liquidChars, {
    scrollTrigger: {
        trigger: '.about-text-content',
        start: 'top 80%',
        end: 'bottom 20%', // Wider range to allow full reverse
        toggleActions: 'play reverse play reverse'
    },
    x: -20, // Slide from left
    y: 0,
    opacity: 0,
    filter: 'blur(4px)', // Liquid feel
    stagger: 0.04, // Slower typing speed
    duration: 0.8,
    ease: 'power2.out'
});


// 6. Project Cards - Unique Reversible Animations
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, i) => {
    // Define varied start states based on index
    let startState = {};

    switch (i % 5) {
        case 0: // Slide In Left & Rotate
            startState = { x: -150, rotation: -15, opacity: 0, scale: 0.8 };
            break;
        case 1: // Slide In Right & Rotate
            startState = { x: 150, rotation: 15, opacity: 0, scale: 0.8 };
            break;
        case 2: // 3D Flip Down (Garage Door)
            startState = { rotationX: -90, y: -50, opacity: 0, transformPerspective: 1000 };
            break;
        case 3: // Zoom Pop
            startState = { scale: 0, rotation: -360, opacity: 0 };
            break;
        case 4: // Skew Slide Up
            startState = { y: 100, skewY: 20, opacity: 0 };
            break;
    }

    gsap.fromTo(card,
        startState,
        {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom top', // Allow full reverse
                toggleActions: 'play reverse play reverse'
            },
            x: 0,
            y: 0,
            rotation: 0,
            rotationX: 0,
            scale: 1,
            skewY: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            overwrite: 'auto'
        }
    );
});

// Force refresh after a moment to ensure layout is settled
setTimeout(() => ScrollTrigger.refresh(), 500);
setTimeout(() => ScrollTrigger.refresh(), 2000);


// 7. Magnetic Buttons (Preserved)
const magneticBtns = document.querySelectorAll('.btn-primary, .social-link, .more-info, .nav-links a');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.4)'
        });
    });
});


// 8. Card Glow & Parallax (Preserved)
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);

        // Tilt
        const xCenter = rect.width / 2;
        const yCenter = rect.height / 2;
        const xOffset = (e.clientX - rect.left) - xCenter;
        const yOffset = (e.clientY - rect.top) - yCenter;

        gsap.to(card, {
            rotationY: xOffset * 0.02,
            rotationX: -yOffset * 0.02,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    });
});



// Expandable Cards Logic
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('more-info')) {
        const card = e.target.closest('.project-card');
        const isExp = card.classList.toggle('expanded');
        const lang = localStorage.getItem('rk-lang') || 'en';
        const dict = strings[lang] || strings.en;

        e.target.textContent = isExp ? dict.close_info : dict.more_info;
        e.target.setAttribute('aria-expanded', String(isExp));

        if (isExp) {
            populateGallery(card);
            // Wait for transition then scroll
            setTimeout(() => {
                if (lenis) lenis.scrollTo(card, { offset: -100 });
            }, 300);
        }
    }
});


// Gallery Logic (Simple Grid)
function populateGallery(card) {
    const gallery = card.querySelector('.gallery');
    if (!gallery || gallery.children.length > 0) return; // already populated

    const imagesStr = card.getAttribute('data-images') || '';
    const images = imagesStr.split(',').map(s => s.trim()).filter(Boolean);
    const projectName = card.querySelector('.card-meta h3')?.textContent.trim() || 'Project';

    if (images.length === 0) return;

    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${projectName} interface screenshot`;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.width = 350;
        img.height = 800;
        gallery.appendChild(img);
    });
}


// ============================================
// Pulse Canvas — Fixed Top-Right Heartbeat Circle + Particles
// ============================================
(function initPulseCanvas() {
    const canvas = document.getElementById('pulse-canvas');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Centre of canvas so the full circle is always visible
    const cx = () => canvas.width / 2;
    const cy = () => canvas.height / 2;

    // ── Heartbeat timing (lub-dub) — 1 cycle per second ─────
    const BEAT_OFFSET = 200;   // ms between lub and dub
    const CYCLE_MS = 3000;  // 1 beat per 3 seconds
    const BASE_RADIUS = 28;    // resting circle radius (2x smaller)
    const PEAK_SCALE = 1.38;
    const PEAK_SCALE2 = 1.22;
    const DECAY = 8;

    let beatScale = 1;
    let beatAlpha = 0.03; // 2x more transparent resting

    const particles = [];

    // Accent colour matching CSS --accent: #b4fbf0
    const PARTICLE_COLOR = { r: 180, g: 251, b: 240 };

    // At 60 fps, CYCLE_MS=3000 → ~180 frames per cycle.
    // We want particles at 10% opacity (90% faded) when the next pulse fires,
    // so maxLife = 180 frames and alpha decays linearly: alpha(t) = maxAlpha * (1 - t).
    // At t=1 alpha=0; at t=0.9 alpha=maxAlpha*0.10  → exactly 90% gone.
    const FRAMES_PER_CYCLE = Math.round(CYCLE_MS / (1000 / 60)); // ≈180

    class Particle {
        constructor(burst) {
            this.burst = burst;
            const angle = Math.random() * Math.PI * 2;
            // Spawn from the circle edge at its expanded radius
            const edgeR = BASE_RADIUS * (burst ? PEAK_SCALE : PEAK_SCALE2);
            const r = edgeR + Math.random() * 3;
            this.x = cx() + Math.cos(angle) * r;
            this.y = cy() + Math.sin(angle) * r;

            // Wide speed distribution: many slow drifters, some fast streakers
            // Cube-root curve: more mid-range particles, still plenty of slow ones
            const speedT = Math.pow(Math.random(), 1.5);
            const maxSpeed = burst ? 1.6 : 1.0;
            const minSpeed = 0.1;
            const speed = minSpeed + speedT * (maxSpeed - minSpeed);

            // Mostly radial but with a small random tangential wobble
            const tangent = (Math.random() - 0.5) * 0.6;
            this.vx = Math.cos(angle) * speed + Math.cos(angle + Math.PI / 2) * tangent;
            this.vy = Math.sin(angle) * speed + Math.sin(angle + Math.PI / 2) * tangent;

            // Low friction so particles keep drifting outward — star-explosion feel
            this.friction = 0.985 + Math.random() * 0.012;

            // Wide size range: dust specks → large blobs, power-curve biased toward small
            const sizeRoll = Math.random();
            if (sizeRoll < 0.55) {
                // 55% dust specks
                this.radius = 0.2 + Math.random() * 0.6;
            } else if (sizeRoll < 0.80) {
                // 25% small-medium
                this.radius = 0.8 + Math.random() * 1.2;
            } else if (sizeRoll < 0.94) {
                // 14% medium-large
                this.radius = 0.8 + Math.random() * 0.8;
            } else {
                // 6% large blobs
                this.radius = 1.6 + Math.random() * 1.2;
            }

            this.life = 0;
            // Lifetime just under one cycle so they reach ~10% opacity before the next burst
            this.maxLife = FRAMES_PER_CYCLE * 0.88 + Math.random() * (FRAMES_PER_CYCLE * 0.1);
            // Larger particles slightly more opaque, then reduce overall by 30%
            this.maxAlpha = (burst
                ? 0.55 + (this.radius / 7) * 0.3
                : 0.40 + (this.radius / 7) * 0.2) * 0.70;
            this.dead = false;
        }

        update() {
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.x += this.vx;
            this.y += this.vy;
            this.life++;
            if (this.life >= this.maxLife) this.dead = true;
        }

        draw() {
            // Linear fade: starts at maxAlpha, reaches 0 at maxLife
            const t = this.life / this.maxLife;
            const alpha = this.maxAlpha * (1 - t);
            const { r, g, b } = PARTICLE_COLOR;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
            ctx.fill();
        }
    }


    // ── Heartbeat scheduler ─────────────────────────────────
    function spawnBurst(strong) {
        const count = strong ? 65 : 40;
        for (let i = 0; i < count; i++) particles.push(new Particle(strong));
        beatScale = strong ? PEAK_SCALE : PEAK_SCALE2;
        beatAlpha = strong ? 0.07 : 0.05;
    }

    function scheduleCycle() {
        spawnBurst(true);                                    // lub
        setTimeout(() => spawnBurst(false), BEAT_OFFSET);   // dub
        setTimeout(scheduleCycle, CYCLE_MS);                // next cycle
    }
    scheduleCycle();

    // ── Draw the central transparent circle ─────────────────
    function drawCenter() {
        const r = BASE_RADIUS * beatScale;

        // Soft outer glow
        const grd = ctx.createRadialGradient(cx(), cy(), r * 0.3, cx(), cy(), r * 1.6);
        grd.addColorStop(0, `rgba(255,255,255,${beatAlpha * 0.4})`);
        grd.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.arc(cx(), cy(), r * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core circle — more opaque white fill + bright stroke
        ctx.beginPath();
        ctx.arc(cx(), cy(), r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${beatAlpha * 0.6})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255,255,255,${beatAlpha * 2.0})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Smooth decay toward resting values
        beatScale = 1 + (beatScale - 1) * (1 - 1 / (DECAY * 1.5));
        beatAlpha = 0.03 + (beatAlpha - 0.03) * (1 - 1 / (DECAY * 2));
    }

    // ── Main loop ────────────────────────────────────────────
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCenter();
        for (const p of particles) { p.update(); p.draw(); }
        // Remove dead particles
        for (let i = particles.length - 1; i >= 0; i--) {
            if (particles[i].dead) particles.splice(i, 1);
        }
        requestAnimationFrame(loop);
    }
    loop();
})();

