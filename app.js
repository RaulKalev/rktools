// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;

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
    if (typeof Lenis !== 'undefined' && !prefersReducedMotion && !isMobileViewport) {
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


// Theme, language, and interaction setup
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
        plugins_sub: 'A growing library of 20+ purpose-built tools for electrical design, BIM coordination, and documentation, with more added every month.',
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
        plugins_sub: 'Kasvav kogu enam kui 20 elektriprojekteerimise, BIM-koordineerimise ja dokumenteerimise tööriistaga. Uusi lahendusi lisandub iga kuu.',
        view_details: 'Vaata lähemalt', more_info: 'Ava', close_info: 'Sulge',
        contact_title: 'Kontakt',
        footer: 'Raul Kalev',
        send: 'Saada'
    }
};

// Language switching is intentionally NOT applied client-side.
//
// This block previously ran applyLang(savedLang) on every load, where savedLang
// fell back to navigator.language. An Estonian-locale visitor therefore saw the
// homepage swapped to Estonian, and <html lang> rewritten to "et", at a URL
// whose served markup and canonical both say English. One URL cannot be two
// languages: the Estonian version is invisible to search engines and the served
// markup contradicts what the visitor sees.
//
// Estonian now lives at its own URL (/et/about/) with proper hreflang. The
// `strings` dictionary above is kept as the source vocabulary for translating
// the remaining pages; the [data-i18n] attributes in the HTML mark what still
// needs translating.


// ============================================
// Motion system
// ============================================

// 5. Hero "Focus" Entry (Zoom/Scale) - SCROLL DRIVEN
// The user sees the name HUGE first, then scrolling shrinks it and reveals content.
const heroMotion = gsap.matchMedia();
heroMotion.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=1200",
            scrub: 1,
            pin: true,
            anticipatePin: 1
        },
        defaults: { ease: 'none' }
    });

    gsap.set('.hero-title', {
        scale: 3,
        transformOrigin: 'center center',
        y: 0
    });
    gsap.set('.hero-subtitle', { y: 50, opacity: 0 });
    gsap.set('.socials .social-link', { y: 30, opacity: 0, scale: 0.5 });

    heroTl
        .to('.hero-title', {
            scale: 1,
            duration: 2
        })
        .to('.hero-subtitle', {
            y: 0,
            opacity: 1,
            duration: 1
        }, '-=0.5')
        .to('.socials .social-link', {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: 'back.out(2)'
        }, '-=0.2');

    return () => {
        gsap.set('.hero-title, .hero-subtitle, .socials .social-link', { clearProps: 'all' });
    };
});


if (!prefersReducedMotion) {
    document.querySelectorAll('.section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 88%',
                once: true
            },
            y: 28,
            opacity: 0,
            filter: 'blur(6px)',
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'transform,opacity,filter'
        });
    });

    gsap.from('.about-stats-container', {
        scrollTrigger: {
            trigger: '.about-stats-container',
            start: 'top 86%',
            once: true
        },
        y: 42,
        scale: 0.985,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
    });

    gsap.from('.about-text-content > *', {
        scrollTrigger: {
            trigger: '.about-text-content',
            start: 'top 84%',
            once: true
        },
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.72,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
    });
}

// Plugin cards share one restrained reveal: shell first, content second.
const projectCards = document.querySelectorAll('.project-card');
if (!prefersReducedMotion) {
    projectCards.forEach(card => {
        const cardContent = card.querySelectorAll('.card-top, .card-features, .card-actions');
        const reveal = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                once: true
            }
        });

        reveal
            .fromTo(card, {
                autoAlpha: 0,
                y: 46,
                scale: 0.985,
                filter: 'blur(8px)'
            }, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.88,
                ease: 'power3.out',
                clearProps: 'transform,opacity,visibility,filter'
            })
            .fromTo(cardContent, {
                autoAlpha: 0,
                y: 14
            }, {
                autoAlpha: 1,
                y: 0,
                stagger: 0.07,
                duration: 0.45,
                ease: 'power2.out',
                clearProps: 'transform,opacity,visibility'
            }, '-=0.48');
    });
}

window.addEventListener('load', () => ScrollTrigger.refresh());

// Expandable Cards Logic
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('more-info')) {
        const card = e.target.closest('.project-card');
        const isExp = card.classList.toggle('expanded');
        const dict = strings.en;

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
    if (!canvas || prefersReducedMotion || isMobileViewport) return;

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

