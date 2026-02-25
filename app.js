// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

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
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Sync GSAP with Lenis
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    } else {
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
        downloads_title: 'Work & Downloads', downloads_sub: 'Public tools, Revit plugins, and docs.',
        download: 'Download', more_info: 'Expand', close_info: 'Close',
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
        downloads_title: 'Tehtud tööd', downloads_sub: 'Tööriistad ja dokumendid.',
        download: 'Laadi alla', more_info: 'Ava', close_info: 'Sulge',
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

    if (images.length === 0) return;

    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Project screenshot";
        gallery.appendChild(img);
    });
}


// ============================================
// Pulse Canvas — Fixed Top-Right Heartbeat Circle + Particles
// ============================================
(function initPulseCanvas() {
    const canvas = document.getElementById('pulse-canvas');
    if (!canvas) return;

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

    class Particle {
        constructor(burst) {
            this.burst = burst;
            const angle = Math.random() * Math.PI * 2;
            // Spawn from the circle edge
            const r = BASE_RADIUS + (Math.random() - 0.5) * 6;
            this.x = cx() + Math.cos(angle) * r;
            this.y = cy() + Math.sin(angle) * r;
            const speed = (this.burst ? 0.4 : 0.25) + Math.random() * 0.3;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.radius = 0.7 + Math.random() * (this.burst ? 1.2 : 0.8);
            this.life = 0;
            this.maxLife = 190 + Math.random() * 20; // ~200 frames → 90% faded by next beat (3s)
            this.dead = false;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life++;
            if (this.life >= this.maxLife) this.dead = true;
        }

        draw() {
            // Linear fade-out: full at start, zero at end
            const t = this.life / this.maxLife;
            const alpha = (1 - t) * (this.burst ? 0.22 : 0.15);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fill();
        }
    }


    // ── Heartbeat scheduler ─────────────────────────────────
    function spawnBurst(strong) {
        const count = strong ? 8 : 5;
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

