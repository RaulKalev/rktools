
// ===== Theme toggle (switch) =====
const themeSwitch = document.getElementById('themeSwitch');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('rk-theme');
if (savedTheme === 'light') document.documentElement.classList.add('light');
if (!savedTheme && !prefersDark) document.documentElement.classList.add('light');

function updateSwitchState() {
  const isLight = document.documentElement.classList.contains('light');
  themeSwitch.dataset.state = isLight ? 'light' : 'dark';
  themeSwitch.setAttribute('aria-checked', String(isLight));
}
updateSwitchState();

themeSwitch.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  const isLight = document.documentElement.classList.contains('light');
  localStorage.setItem('rk-theme', isLight ? 'light' : 'dark');
  updateSwitchState();
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// ===== i18n: EN / ET =====
const strings = {
  en: {
    subtitle: 'Extra-Low Voltage Systems Engineer · Revit Specialist · Plugin & App Developer (C#/.NET, Python)',
    nav_about: 'About', nav_work: 'Work', nav_downloads: 'Downloads', nav_contact: 'Contact',
    about_title: 'About me',
    about_p1:
      "I’m an Extra-Low Voltage systems engineer with a BSc in Architectural Technology & Construction Management, specializing in <strong>Revit</strong>-based electrical design workflows for fire alarm, access control, CCTV, IT, public address, and related systems. I bring over 5 years of experience as a systems installer and serviceman, giving me a practical, field-tested understanding of how designs translate into successful installations.",
    about_p2:
      "Alongside engineering, I develop custom <strong>Revit plugins</strong> and Windows applications in <strong>C#/.NET</strong> and <strong>Python</strong>—streamlining workflows, automating repetitive tasks, improving data accuracy, and accelerating documentation for engineering teams.",
    cta_contact: 'Get in touch', cta_downloads: 'Browse downloads',
    work_title: 'Selected work', work_sub: 'Deep dives & case studies (Revit automation, ELV design tooling, data pipelines).',
    work_issue: 'Manage Jira issues without leaving Revit. A modeless WPF pane syncs issues, uploads view screenshots, and tracks assignees and priorities.',
    work_dialux: 'Parses linked elements, groups fixtures, creates family types, and places/rotates instances with parameter mapping + round/strip logic.',
    work_panel: 'Material Design DataGrids to manage circuit rows, update parameters (incl. virtual rows), and place detail items with level-aware logic.',
    read_more: 'Read more',
    downloads_title: 'Work Done', downloads_sub: 'Public tools, Revit plugins, and docs. Versioned releases with changelogs.',
    dl_revctrl: 'Set and manage sheet revision numbers with a clean WPF UI and modeless flow.',
    dl_circuit: 'Set all circuits\' path to "All Devices" across the project with a single click.',
    dl_dwg: 'Exports & combines DWG Layout1 files, auto-sorts, and prompts for cleanup.',
    download: 'Download', more_info: 'More info',
    contact_title: 'Contact', contact_p: 'For consulting, custom plugins, or support, reach out below.',
    name_placeholder: 'Your name', email_placeholder: 'Email', message_placeholder: 'How can I help?',
    send: 'Send', open_email: 'Open in email client', elsewhere: 'Elsewhere',
    footer: 'Raul Kalev'
  },
  et: {
    subtitle: 'Nõrkvoolusüsteemide insener · Revit-spetsialist · Pluginate ja rakenduste arendaja (C#/.NET, Python)',
    nav_about: 'Minust', nav_work: 'Tööd', nav_downloads: 'Allalaadimised', nav_contact: 'Kontakt',
    about_title: 'Minust',
    about_p1:
      'Olen nõrkvoolusüsteemide insener, kellel on bakalaureusekraad arhitektuuri tehnoloogia ja ehitusjuhtimise erialal. Spetsialiseerun <strong>Revit</strong>-põhistele elektriprojektide töövoogudele: tulekahjusignalisatsioon, läbipääs, CCTV, IT, valjuhääldus ja muud süsteemid. Mul on üle 5 aasta kogemust süsteemide paigaldaja ja hooldustehnikuna, mis annab mulle praktilise ja reaalses elus testitud arusaama sellest, kuidas projekte edukalt ellu viia.',
    about_p2:
      'Lisaks inseneritööle loon kohandatud <strong>Revit-i pluginaid</strong> ja Windowsi tööriistu <strong>C#/.NET</strong>-i ja <strong>Pythoni</strong> abil—töövoogude sujuvamaks muutmiseks, kordustöö automatiseerimiseks, andmekvaliteedi parandamiseks ja dokumentatsiooni kiirendamiseks.',
    cta_contact: 'Võta ühendust', cta_downloads: 'Laadi alla / vaata',
    work_title: 'Valik projekte', work_sub: 'Süvavaated ja juhtumiuuringud (Revit-i automatiseerimine, ELV tööriistad, andmevood).',
    work_issue: 'Halda Jira ülesandeid lahkumata Revitist. Modeless-paneel sünkroonib isikud, laadib üles vaadete ekraanipilte ning jälgib määramisi ja prioriteete.',
    work_dialux: 'Töötleb seotud mudeleid, rühmitab valgustid, loob tüübid ja paigutab/pöörab instantsid koos parameetrite kaardistusega (ka ümar/LED-riba loogika).',
    work_panel: 'Material Designi DataGridid skeemiridade haldamiseks, parameetrite uuendamiseks (sh virtuaalread) ja detailide paigutamiseks tasemete loogikaga.',
    read_more: 'Loe lähemalt',
    downloads_title: 'Tehtud tööd', downloads_sub: 'Avalikud tööriistad, Revit-i pluginad ja dokumentatsioon. Versioonid koos muudatuste logidega.',
    dl_revctrl: 'Lehtede versiooninumbrite seadmine ja haldus puhta WPF-i kasutajaliidesega.',
    dl_circuit: 'Määrab kõigi vooluahelate teeraja väärtuseks "All Devices" ühe klikiga.',
    dl_dwg: 'Ekspordib ja ühendab DWG Layout1 failid, sorteerib automaatselt ning pakub puhastust.',
    download: 'Laadi alla', more_info: 'Rohkem infot',
    contact_title: 'Kontakt', contact_p: 'Konsultatsioon, eritellimuspluginad või tugi — kirjuta allpool.',
    name_placeholder: 'Sinu nimi', email_placeholder: 'E-post', message_placeholder: 'Kuidas saan aidata?',
    send: 'Saada', open_email: 'Ava e-posti kliendis', elsewhere: 'Mujal',
    footer: 'Raul Kalev'
  }
};


// Language dropdown logic
const langRoot = document.getElementById('langDropdown');
const langBtn = langRoot.querySelector('.lang-toggle');
const langMenu = langRoot.querySelector('.lang-menu');
const currentFlag = document.getElementById('currentFlag');
const currentLang = document.getElementById('currentLang');

const savedLang2 = localStorage.getItem('rk-lang') || (navigator.language?.startsWith('et') ? 'et' : 'en');

function applyLang(lang) {
  const dict = strings[lang] || strings.en;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const spec = el.getAttribute('data-i18n-attr');
    const [attr, key] = spec.split(':');
    if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
  });
  localStorage.setItem('rk-lang', lang);
  currentLang.textContent = lang.toUpperCase();
  currentFlag.textContent = lang === 'et' ? '🇪🇪' : '🇬🇧';
}

applyLang(savedLang2);

langBtn.addEventListener('click', () => {
  const open = langMenu.classList.toggle('open');
  langBtn.setAttribute('aria-expanded', String(open));
});
langMenu.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-lang]');
  if (!btn) return;
  const code = btn.getAttribute('data-lang');
  applyLang(code);
  langMenu.classList.remove('open');
  langBtn.setAttribute('aria-expanded', 'false');
});
document.addEventListener('click', (e) => {
  if (!langRoot.contains(e.target)) { langMenu.classList.remove('open'); langBtn.setAttribute('aria-expanded', 'false'); }
});

function renderCarousel(gallery, imgs, startIndex = 0) {
  const safeImgs = imgs.map(src => (src.includes(' ') ? encodeURI(src) : src));
  // Build markup
  gallery.innerHTML = `
    <img class="slide" src="${safeImgs[startIndex]}" alt="">
    <button class="nav prev" aria-label="Previous image" type="button">
      <svg viewBox="0 0 24 24"><path d="M15.5 19 8.5 12l7-7"/></svg>
    </button>
    <button class="nav next" aria-label="Next image" type="button">
      <svg viewBox="0 0 24 24"><path d="M8.5 5 15.5 12l-7 7"/></svg>
    </button>
    <div class="dots">${safeImgs.map((_,i)=>`<div class="dot${i===startIndex?' active':''}"></div>`).join('')}</div>
  `;
  gallery.dataset.index = String(startIndex);
  gallery.dataset.count = String(safeImgs.length);

  const imgEl = gallery.querySelector('.slide');
  const dots = [...gallery.querySelectorAll('.dot')];

  function show(i) {
    const count = safeImgs.length;
    const idx = (i + count) % count;   // wrap
    gallery.dataset.index = String(idx);
    imgEl.src = safeImgs[idx];
    dots.forEach((d,k)=>d.classList.toggle('active', k===idx));
  }

  gallery.querySelector('.prev').addEventListener('click', () => {
    show(Number(gallery.dataset.index) - 1);
  });
  gallery.querySelector('.next').addEventListener('click', () => {
    show(Number(gallery.dataset.index) + 1);
  });
  dots.forEach((d,i)=>d.addEventListener('click', ()=>show(i)));

  // Optional: keyboard nav when focused
  gallery.tabIndex = 0;
  gallery.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(Number(gallery.dataset.index) - 1);
    if (e.key === 'ArrowRight') show(Number(gallery.dataset.index) + 1);
  });
}

function populateGallery(card) {
  const gallery = card.querySelector('.gallery');
  if (!gallery || gallery.childElementCount) return;

  const imgs = (card.getAttribute('data-images') || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  if (!imgs.length) {
    gallery.innerHTML = '<div class="ph">No images yet</div>';
    return;
  }

  renderCarousel(gallery, imgs, 0);
}


function toggleExpand(card) {
  const btn = card.querySelector('.more-info');
  const lang = localStorage.getItem('rk-lang') || 'en';
  const isOpen = card.classList.toggle('expanded');

  if (isOpen) {
    populateGallery(card);
    btn.textContent = lang === 'et' ? 'Sulge' : 'Close';
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    btn.textContent = (strings[lang]?.more_info) || 'More info';
  }
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.more-info');
  if (btn) {
    e.preventDefault();
    const card = btn.closest('.moreinfo-card');
    if (!card) return;
    toggleExpand(card);
  }
});

// ===== Contact form (no inline onsubmit) =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const lang = localStorage.getItem('rk-lang') || 'en';
  const name = encodeURIComponent(document.getElementById('name').value.trim());
  const email = encodeURIComponent(document.getElementById('email').value.trim());
  const message = encodeURIComponent(document.getElementById('message').value.trim());
  const subject = lang === 'et' ? `Portfoolio päring: ${name}` : `Portfolio inquiry from ${name}`;
  const body = lang === 'et' ? `Nimi: ${name}%0D%0AE-post: ${email}%0D%0A%0D%0A${message}` : `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
  window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
});
