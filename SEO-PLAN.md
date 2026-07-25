# SEO Plan — Ranking #1 for "Raul Kalev"

**Target query:** `Raul Kalev` (and close variants: `Raul Kalev Revit`, `Raul Kalev BIM`, `Raul Kalev insener`)
**Site:** https://tools.raulkalev.ee/ (migrating from https://raulkalev.github.io/rktools/)
**Plan date:** 2026-07-25

---

## 1. Where you actually stand today

A live SERP check for "Raul Kalev" returns roughly this:

| # | Result | Whose entity |
|---|---|---|
| 1 | Goodreads — Raul Kalev, author of *Ilona tagasivõitmise lugu* | **Namesake** |
| 2 | **raulkalev.github.io/rktools — "Raul Kalev — RK Tools"** | **You** |
| 3 | LinkedIn — Raul Kalev, BIM Engineer, Low Current Systems Designer | **You** |
| 4 | Inforegister.ee — Raul Kalev (21.10.1972), board member | Namesake |
| 5 | IMDb — Raul Kalev | Namesake |
| 6 | Facebook | ambiguous |
| 7 | et.wikipedia.org — Raul Kalev | **Namesake** |
| 8 | ERR opinion piece by Raul Kalev | Namesake |
| 9 | Visionest Institute author page | Namesake |

**The good news:** you are already page-one, position ~2, and you own two of the top three slots. This is not a "start from zero" project. Most of the work is consolidation, not creation.

**The real problem:** there is a well-established namesake — an Estonian PR consultant, communications adviser and author (b. 1972) who has an **Estonian Wikipedia article**, ERR bylines, Goodreads and IMDb entries, and a business-registry footprint. Google almost certainly treats *him* as the primary "Raul Kalev" entity in its Knowledge Graph.

So this is not really a keyword-ranking problem. **It is an entity disambiguation problem.** The goal is to make Google confident that there are two distinct people named Raul Kalev, and that yours is the one with the stronger, fresher, more corroborated web presence.

That reframing drives everything below.

---

## 2. Strategy in one paragraph

Build a single, unambiguous, machine-readable identity hub for *you* — a real `/about/` entity page, a complete `Person` graph, and a dense web of `sameAs` links to profiles you control — then push enough fresh, linkable content and off-site corroboration through it that Google's confidence in "Raul Kalev = Revit/BIM electrical engineer from Estonia" grows past the legacy namesake signals. Owning position 1 *and* 2 and 3 (site + LinkedIn + GitHub) is the realistic win condition; a Knowledge Panel is the stretch goal.

---

## 3. Findings from the current codebase

### 3.1 Bugs / blockers (fix these first — they cost you nothing but are actively wasted effort today)

**A. `robots.txt` is in a location crawlers ignore.**
`robots.txt` lives at `/rktools/robots.txt`. Per the robots exclusion standard, robots.txt is **only** honoured at the **host root** — i.e. `https://raulkalev.github.io/robots.txt`. Your file is invisible to every crawler, and so is the `Sitemap:` directive inside it.
*Impact:* sitemap auto-discovery does not work. (Search Console submission still works, so this is not fatal — but it is a silent failure worth knowing about.)
*Fix:* **resolved by the move to `tools.raulkalev.ee`** — the site is served at that host's root, so `robots.txt` and sitemap auto-discovery both start working. Submit the sitemap manually in Search Console in the meantime.

**B. Estonian translations exist but are unreachable — by users and by Google.**
`app.js` lines 74–107 contain a full `en`/`et` string dictionary, and the HTML carries `data-i18n` attributes. But the nav bar that held the language switcher was removed (`index.html:253-257`), so `#langDropdown` does not exist on any page. The Estonian content is dead code. Even if the switcher were restored, client-side `localStorage` switching produces **no separate URL**, so Google can only ever index the English version.
*Impact:* you are invisible for Estonian-language name searches — which is precisely where the namesake is strongest.

**C. You own the ideal domain and it is currently contributing nothing.**
`raulkalev.github.io/rktools/` puts your identity hub one directory deep, and the site "homepage" is not the host root. Meanwhile you own **`raulkalev.ee`** — an exact-match, country-appropriate domain — but it serves an internal company site. A `site:raulkalev.ee` query returns **zero indexed pages**, so the strongest name-matching asset you have is invisible to Google. See §4.1 for how to reclaim it.

**D. Client-side `document.documentElement.lang` mutation.**
`app.js:117` rewrites `lang` after load while the served HTML says `lang="en"`. Harmless today (the switcher is gone) but will send mixed signals if i18n is restored the same way.

**E. `.exe` installers served from the Pages site.** *(resolved on this branch)*
`Installers/*.exe` (~28 MB) were served directly. Unsigned executables on a Pages host are a Safe Browsing risk that, if ever flagged, would be catastrophic for rankings. Nothing on the site linked to them — they were orphaned files. `Installers/KaabliKatloog.bat` additionally published the company's internal Dropbox folder structure.

*Action taken:* the directory is deleted. Re-publish the binaries as GitHub Release assets, which is what Releases are for, and link out from the plugin pages. Note that this trims the published site but **not** the repository — the blobs remain in git history, and removing them from there needs a `git filter-repo` rewrite, which is disruptive and probably not worth it.

### 3.2 Content gaps

- **No dedicated person page.** The `About me` section on the homepage is ~90 words: four stat tiles, three bullets, five skill tags. That is far too thin to establish an entity.
- **Homepage `<title>` leads with the brand:** `RK Tools — Revit Plugins for Electrical Design | Raul Kalev`. For a name query, the name should lead.
- **The name barely appears off the homepage.** "Raul Kalev" occurs 9× on `/`, **1×** on `/plugins/`, and **0×** on `/pulse/`. Two of your three pages barely mention you.
- **No blog / no dated content.** Nothing gives Google a freshness signal or a reason for anyone to link to you.
- **No 404 page**, no `/contact/`, no CV/résumé page.

### 3.3 Structured data gaps

The existing JSON-LD is genuinely good — `WebSite` + `ProfilePage` + `Person` + `ItemList`, correctly `@id`-linked, `numberOfItems: 23` matching 23 real items. Credit where due. What is missing on the `Person` node:

- `image` (a face photo — critical for Knowledge Panel eligibility)
- `description` (a one-sentence disambiguating summary)
- `alumniOf`, `worksFor`, `nationality`, `homeLocation`, `email`
- `sameAs` currently lists **only 2** profiles. This is the single weakest signal in the whole build.
- No `Organization` node for RK Tools with `founder` → you
- No `SoftwareApplication` nodes for the individual plugins
- `/plugins/` and `/pulse/` do not declare `author` → you (only `/pulse/` does)

### 3.4 Technical hygiene (all minor, all easy)

- `sitemap.xml` omits `privacypolicy.html`; `lastmod` values are hand-set and will go stale
- Portrait `resources/raul-kalev.jpg` is 1024×1024 and `loading="lazy"` — fine, but the alt text ("Raul Kalev outdoors at sunset") is descriptive of the photo rather than the person's role
- No `<meta name="author">`
- Three render-blocking third-party origins (cdnjs, unpkg, fonts.googleapis) — a Core Web Vitals drag, not a ranking blocker
- `og:image` is a generic brand card, not a face — face images perform better on person queries

---

## 4. The plan

### Phase 0 — Measure before you touch anything (Day 1, ~1 hour)

You cannot tell whether any of this worked without a baseline.

1. **Confirm Search Console coverage.** The verification file (`googleeaa2d9fa4dfbe546.html`) verifies the URL-prefix property `https://raulkalev.github.io/rktools/`. Confirm that property exists and is collecting data.
2. **Create a Search Console _Domain_ property for `raulkalev.ee`** (TXT record at zone.ee), not a URL-prefix property — it covers the apex and every subdomain, so the future apex move needs no property hand-off. Submit `sitemap.xml` there.
3. **Record the baseline:** current average position and impressions for the query `raul kalev`, plus the top-10 SERP as it stands today. Screenshot it.
4. **Check `site:raulkalev.github.io`** — confirm all three pages are indexed and no stray URLs (e.g. the verification file) are.
5. **Run PageSpeed Insights** on `/` and record LCP/CLS/INP for mobile.

---

### Phase 1 — Technical foundation (Week 1, ~3 hours)

**1.1 Domain and hosting.** Decided: `tools.raulkalev.ee`, served by GitHub Pages with a custom domain. See §4.1 for the zone.ee records, the cutover runbook, and what a later apex move would cost.

Everything else in this plan works regardless of which option you pick.

**1.2 Fix robots.txt placement.** If you go with B or C, move `robots.txt` to the host root and keep the `Sitemap:` line. If you stay on A, delete the misleading file or leave it and rely on manual Search Console submission.

**1.3 Rewrite the homepage title and meta description, name-first.**

```html
<title>Raul Kalev — Extra-Low Voltage Engineer &amp; Revit Plugin Developer</title>
<meta name="description"
  content="Raul Kalev is an Estonian extra-low voltage systems engineer and Revit
  plugin developer. He builds RK Tools, a library of 20+ Revit add-ins for
  electrical design, BIM coordination, and documentation." />
<meta name="author" content="Raul Kalev" />
```

The description is written as a third-person factual statement on purpose — that phrasing is what Google's entity extraction is tuned to parse.

**1.4 Add `<meta name="author" content="Raul Kalev">` to all three pages**, and work the full name naturally into `/plugins/` and `/pulse/` body copy (a "Built by Raul Kalev" byline line under each `<h1>`, linking to `/about/`, is enough).

**1.5 Regenerate `sitemap.xml`** to include every indexable page (add `/about/`, `/privacypolicy.html`, and later `/et/` and blog posts). Consider a tiny GitHub Action that stamps `lastmod` from git commit dates so it never goes stale.

**1.6 Add a `404.html`** that links back to `/` and `/about/`.

**1.7 Move the `.exe` installers to GitHub Releases** and replace the in-repo files with links. Removes ~28 MB from the Pages deploy and eliminates the Safe Browsing risk.

---

### 4.1 Domain: `tools.raulkalev.ee` now, apex later

**Decision taken:** the site moves to `tools.raulkalev.ee`, served by **GitHub Pages** with a custom domain. No DigitalOcean, no separate host. The apex stays with the internal company site for now.

#### The facts

- Domain registered at **zone.ee**; nameservers are `ns.zone.eu`, `ns2.zone.ee`, `ns3.zonedata.net`. DNS records are managed in the zone.ee panel, **not** Cloudflare.
- `raulkalev.ee` (apex) resolves to Cloudflare IPs; `www.raulkalev.ee` is a CNAME to `octopus-app-krosl.ondigitalocean.app`.
- `site:raulkalev.ee` returns **zero indexed pages** — the internal site is already noindexed or auth-walled. Keep it that way.
- `tools.raulkalev.ee` does not resolve yet.
- The repo is public with Pages already enabled, which is all a custom domain needs.

#### Why GitHub Pages rather than DigitalOcean

Pages hosts a custom domain natively and throws in the two things that matter most here:

- **A real server-issued 301** from `raulkalev.github.io/rktools/*` to `tools.raulkalev.ee/*`, automatically, the moment the custom domain is configured. This is what protects the position-2 ranking, and it is strictly better than the meta-refresh workaround any other host would require.
- **Automatic Let's Encrypt TLS**, renewed without intervention.

It also removes the entire deployment layer: no App Platform app, no `doctl`, no OAuth grant, no second dashboard. Push to `main`, Pages redeploys. And as noted below, it makes the eventual apex move *easier* rather than harder.

DigitalOcean remains the right home for the internal company app. It is simply the wrong tool for a four-page static site.

#### Why a subdomain is a perfectly good choice

For a person-name query the token that matters is `raulkalev`, and it is in the hostname either way. Google treats subdomains as largely separate sites for indexing, but the brand/entity association with a domain bearing your name still carries. The apex is stronger, but the gap is smaller than the gap between *any* `raulkalev.ee` hostname and a `github.io` subpath.

It also fixes a real bug for free: on `tools.raulkalev.ee` the site is served at the **host root**, so `robots.txt` finally works (finding 3.1.A).

#### Will a later move to the apex lose the progress?

**Not permanently — but it is not free, and the cost grows the longer you wait.**

What is preserved: 301 redirects pass essentially full link equity. Google has been explicit that no PageRank is lost through a permanent redirect. Your content, your structured data, your accumulated links all carry over.

What it costs:

1. **2–8 weeks of re-crawl and ranking volatility** for a site this size. Unavoidable, temporary.
2. **Every external link has to be updated by hand** — `sameAs` entries, LinkedIn, the GitHub profile, the Autodesk App Store listing, YouTube descriptions, forum signatures. This is the real cost, and it is the one that scales.
3. **A redirect hop is added** to anything still pointing at the old host.

Point 2 is the one that should drive your timing. **Right now roughly two external profiles point at the site. After Phase 4 there will be ten or more.** Migrating before you build the `sameAs` network is dramatically cheaper than migrating after it.

So:

- If there is a realistic chance you can free up the apex **within a few months**, consider waiting and doing one move instead of two.
- If the apex is blocked for the foreseeable future, go to `tools.raulkalev.ee` now — which is the decision taken — and accept a modest one-time cost later.
- Either way, **do not migrate twice more.** One more move, maximum.

#### The one thing that makes the future move cheap

**Create a Search Console _Domain_ property for `raulkalev.ee` now**, not a URL-prefix property.

A Domain property covers the apex *and every subdomain* under one roof. That means `tools.raulkalev.ee` today and `raulkalev.ee` tomorrow are the same property — no hand-off, no split history, no Change of Address dance, and a continuous performance graph straight through the migration.

Verify it with a DNS TXT record added in the zone.ee panel. Do this before anything else; the historical data only starts accumulating once the property exists.

#### What to set up in zone.ee

Open the zone.ee control panel → your domain → DNS / nameserver records. Labels vary slightly by panel version, but the records are these.

**Required — one CNAME:**

| Field | Value |
|---|---|
| Type | `CNAME` |
| Host / name | `tools` (some panels want the full `tools.raulkalev.ee`) |
| Target / value | `raulkalev.github.io.` |
| TTL | default (3600); optionally drop to 300 during cutover |

Three things people get wrong here:

- The target is **`raulkalev.github.io`** — the Pages host, with no `/rktools` path. DNS has no concept of paths. GitHub works out which repo to serve from the `CNAME` file in the repository.
- Include the **trailing dot** if the panel expects fully-qualified names, so it is not silently expanded to `raulkalev.github.io.raulkalev.ee`.
- Do **not** also add an A record for `tools`. A CNAME cannot coexist with other records on the same name.

**Recommended — Search Console Domain property:**

| Field | Value |
|---|---|
| Type | `TXT` |
| Host / name | `@` (the apex, `raulkalev.ee`) |
| Value | `google-site-verification=…` (token from Search Console) |

**Optional — GitHub domain verification**, which prevents anyone else from claiming the subdomain on Pages. GitHub gives the token under Settings → Pages → Verify domain:

| Field | Value |
|---|---|
| Type | `TXT` |
| Host / name | `_github-pages-challenge-raulkalev` |
| Value | token from GitHub |

Leave the existing apex and `www` records alone — those are the internal site.

#### Cutover runbook

Code changes are committed on this branch, including the `CNAME` file. Order matters:

1. **Add the CNAME record at zone.ee** (above). For a few minutes `tools.raulkalev.ee` will resolve to GitHub and return a 404, because Pages does not yet know the domain. Harmless — nobody has the URL yet.
2. **Merge this branch to `main`.** Pages reads the `CNAME` file, begins serving `tools.raulkalev.ee`, and starts 301-ing the old github.io URLs. The rewritten canonicals land in the same commit, so the markup and the live hostname never disagree.
3. **Wait for the certificate.** Repo → Settings → Pages shows the status; usually minutes, occasionally up to an hour. Then tick **Enforce HTTPS**.
4. **Verify:**
   ```bash
   curl -sI https://raulkalev.github.io/rktools/   # expect 301 → tools.raulkalev.ee
   curl -sI https://tools.raulkalev.ee/            # expect 200
   curl -s  https://tools.raulkalev.ee/robots.txt  # now actually honoured
   ```
5. **In Search Console:** submit the sitemap under the new Domain property. Keep the old URL-prefix property open for a few months to watch traffic hand over.
6. **Re-run the Rich Results Test** on all three pages — the JSON-LD `@id` values changed, so confirm the entity graph still resolves as one connected set.
7. **Update the external profiles** — GitHub, LinkedIn, Autodesk App Store — to the new URL.

#### When you do go to the apex

Choosing Pages quietly removed the biggest obstacle here. DigitalOcean App Platform would have needed an **ALIAS/ANAME** record at the apex — which CNAMEs cannot provide and zone.ee does not reliably offer, meaning a nameserver migration first. **GitHub Pages uses plain A records at an apex**, which zone.ee supports natively:

```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

(Optionally the matching `AAAA` records for IPv6.) So the future move is: free the apex, swap the `CNAME` file to `raulkalev.ee`, add those A records, done — no change of DNS provider.

Also remember to point `www.raulkalev.ee` at the apex at that time — today it serves the internal app, which would be confusing once the apex is your personal site.

---

### Phase 2 — Build the entity page (Week 1–2, ~4 hours) — **highest impact item in this plan**

Create **`/about/`** — a dedicated, substantial page about *you as a person*, not about the tools.

This is the page you want Google to treat as the canonical "Raul Kalev" document on the open web. Target **900–1,400 words** of genuine, specific prose.

Required structure:

- `<title>Raul Kalev — Extra-Low Voltage Systems Engineer, Estonia</title>`
- `<h1>Raul Kalev</h1>`
- **Opening paragraph, third person, dense with disambiguating facts.** Something like: *"Raul Kalev is an extra-low voltage systems engineer and software developer based in Estonia. He designs fire alarm, CCTV, access control and IT infrastructure systems in Autodesk Revit, and develops RK Tools — a library of over 20 Revit add-ins written in C# and .NET…"* Every proper noun in that sentence (Estonia, Revit, Autodesk, C#, fire alarm) is a disambiguation anchor separating you from the PR consultant.
- **The portrait, above the fold**, with the filename `raul-kalev.jpg` kept, `loading="eager"`, and alt text rewritten to `Raul Kalev, extra-low voltage systems engineer and Revit plugin developer`.
- **Background** — the BSc in Architectural Technology & Construction, the 5+ years of field experience, the installation-to-design path. Name the institution. Name real project types.
- **What I work on** — expand the three bullets into real paragraphs.
- **Technical skills** — Revit API, C#, .NET, WPF, Python, JavaScript, IFC.
- **Selected work** — link to `/plugins/`, `/pulse/`, the Autodesk App Store listing, GitHub.
- **Contact + every profile link**, each as a real `<a rel="me">`.

Then link to `/about/` from every page, using **"Raul Kalev"** as the anchor text. Internal anchor text is a signal you fully control — use it.

**Do not** add a "not to be confused with" line about the namesake. Naming him on your page creates a co-occurrence association, which is the opposite of what you want. Disambiguate by being *specific about yourself*, never by referencing him.

---

### Phase 3 — Complete the entity graph (Week 2, ~2 hours)

Upgrade the `Person` node in the homepage JSON-LD and mirror it on `/about/`:

```jsonc
{
  "@type": "Person",
  "@id": "https://raulkalev.github.io/rktools/#raul-kalev",
  "name": "Raul Kalev",
  "givenName": "Raul",
  "familyName": "Kalev",
  "url": "https://raulkalev.github.io/rktools/about/",
  "mainEntityOfPage": "https://raulkalev.github.io/rktools/about/",
  "image": "https://raulkalev.github.io/rktools/resources/raul-kalev.jpg",
  "description": "Estonian extra-low voltage systems engineer and Revit plugin developer, creator of RK Tools.",
  "jobTitle": "Extra-Low Voltage Systems Engineer and Revit Plugin Developer",
  "nationality": { "@type": "Country", "name": "Estonia" },
  "homeLocation": { "@type": "Place", "address": {
      "@type": "PostalAddress", "addressCountry": "EE" } },
  "email": "mailto:raul.kalev@icloud.com",
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "<institution>" },
  "worksFor": { "@id": "https://raulkalev.github.io/rktools/#rktools" },
  "knowsAbout": [
    "Autodesk Revit", "Revit API", "Electrical design",
    "Extra-low voltage systems", "Fire alarm system design",
    "CCTV system design", "Building information modeling",
    "IFC", "C#", ".NET", "WPF", "Python"
  ],
  "sameAs": [ /* see below — this list is the priority */ ]
}
```

Add an `Organization` node and point `founder` at yourself:

```jsonc
{
  "@type": "Organization",
  "@id": "https://raulkalev.github.io/rktools/#rktools",
  "name": "RK Tools",
  "url": "https://raulkalev.github.io/rktools/",
  "logo": "https://raulkalev.github.io/rktools/resources/LogoRK.png",
  "founder": { "@id": "https://raulkalev.github.io/rktools/#raul-kalev" }
}
```

Also: declare `"author": {"@id": "…#raul-kalev"}` on the `/plugins/` `CollectionPage` (currently missing — `/pulse/` already has it), and consider `SoftwareApplication` nodes for the flagship plugins.

Validate everything with the Rich Results Test and Schema.org validator before shipping.

---

### Phase 4 — Build the `sameAs` corroboration network (Weeks 2–5, ongoing) — **second-highest impact**

Your `sameAs` array has **two** entries. This is the biggest single gap. Google builds entity confidence from *mutually corroborating* profiles — each profile should link to your site, and your site should link back to each profile.

Priority order, roughly by authority-per-hour-of-effort:

**Tier 1 — do these first**

1. **Autodesk App Store publisher profile.** You already have a live CAD Manager listing. Make sure the publisher name reads exactly "Raul Kalev", the publisher URL points at your site, and the bio mentions you. `marketplace.autodesk.com` is a high-authority domain and the listing already surfaces in search.
2. **GitHub profile README** (`RaulKalev/RaulKalev` repo). Full name in the profile name field, bio, location Estonia, website link. GitHub profiles rank extremely well for name queries.
3. **LinkedIn** — already ranking at #3. Add the website to the Featured section and the contact panel. Keep the headline keyword-specific ("Extra-Low Voltage Systems Engineer · Revit Plugin Developer").
4. **A YouTube channel** with 60-second plugin demos. Video results appear in person-name SERPs, and each video description is a link back. Even 5 short screen recordings would be meaningful.

**Tier 2**

5. Stack Overflow / Autodesk Forums developer profile (you are answering Revit API questions anyway — link the site from the profile)
6. dev.to or Medium author profile with 2–3 cross-posted articles
7. X/Twitter and/or Bluesky, real name in the display name field
8. about.me or a similar identity aggregator
9. Estonian business registry entry, if you operate through an OÜ
10. Speaker Deck / conference bios if you present anywhere

**Rules that make this work:**
- Use the **exact same name string** ("Raul Kalev") and the **exact same photo** on every profile. Consistency is what lets Google merge them into one entity.
- Every profile links to `/about/`.
- Every profile appears in `sameAs`.
- Add `rel="me"` on the outbound links on your site (you already do this on the homepage socials — keep it).

Realistically this is where most of the remaining ranking gap gets closed.

---

### Phase 5 — Ship the Estonian version (Weeks 3–4, ~4 hours)

The namesake's strength is concentrated in Estonian-language results (Wikipedia, ERR, Inforegister, Visionest). You currently compete for **none** of them, despite already having the translations written.

1. **Move from client-side switching to real URLs:** `/et/` for Estonian, `/` stays English. Static duplicate pages are fine — three pages is not a maintenance burden.
2. Serve correct `<html lang="et">` in the markup, not via JS.
3. Add reciprocal `hreflang` on both versions:
   ```html
   <link rel="alternate" hreflang="en" href="https://raulkalev.github.io/rktools/" />
   <link rel="alternate" hreflang="et" href="https://raulkalev.github.io/rktools/et/" />
   <link rel="alternate" hreflang="x-default" href="https://raulkalev.github.io/rktools/" />
   ```
4. Self-referencing canonicals on each.
5. Restore the language switcher UI (removed with the nav bar) as real `<a href>` links, not JS buttons.
6. Add both to `sitemap.xml`.
7. Write a genuine Estonian `/et/about/` — translated, not machine-generated, using natural Estonian terminology (*nõrkvoolusüsteemide insener*, *ATS*, *videovalve*, *läbipääsusüsteem*). The `et` strings in `app.js` are a good starting vocabulary.

---

### Phase 6 — Content and links (Month 2 onward, ~4 hours/month)

Rankings for a competitive name ultimately follow domain authority, and authority follows links. You have almost none.

**Start a `/blog/` and publish one substantial post per month.** Write about what you already know and nobody else is writing about:

- "Automating DIALux imports into Revit"
- "Connecting Claude to Revit with MCP: what actually works" *(this one has real link potential — MCP + Revit is a genuinely underserved topic right now)*
- "Bypassing view template limits for DWG visibility in Revit"
- "Calculating camera fields of view parametrically in Revit"
- "SPL and STI calculations from a Revit speaker layout"

Each post: `Article` schema with `author` → your `Person` `@id`, a real `datePublished`, and a byline linking to `/about/`. This gives Google a steady freshness signal tied to your entity.

**Distribute each post** to r/Revit, r/bim, the Autodesk Revit API forum, LinkedIn, and the Dynamo/BIM Discord and Slack communities. These are the audiences that actually link.

**Actively pursue:**
- Getting RK Tools included in "best Revit plugins" roundups (Revizto, DiRoots, Piaxis and others publish these annually — several already rank for plugin queries)
- A guest post or interview on a BIM blog or podcast
- Estonian AEC industry coverage — this is the highest-value target of all, because an Estonian-language article about *you* directly contests the namesake's home turf

**On Core Web Vitals:** self-host the Outfit font subset and GSAP/Lenis rather than pulling from three third-party origins. Worth doing, but it is a tiebreaker — do it after Phases 1–4, not before.

---

## 5. Timeline and expected outcome

| Week | Work | Expected effect |
|---|---|---|
| 1 | Phase 0 + Phase 1 (baseline, technical fixes, title rewrite) | Better SERP snippet; clean crawl |
| 1–2 | **Phase 2 — `/about/` entity page** | Primary ranking asset exists |
| 2 | Phase 3 — full entity graph | Machine-readable identity |
| 2–5 | **Phase 4 — `sameAs` network** | Entity confidence rises; more owned SERP slots |
| 3–4 | Phase 5 — Estonian version | Contest the namesake's home turf |
| 6+ | Phase 6 — content + links | Compounding authority |

**Realistic expectations, stated honestly:**

- **1–2 months:** stable position 1–2 for "Raul Kalev", with you owning 3–4 of the top 10 results (site, `/about/`, LinkedIn, GitHub, Autodesk listing).
- **3–6 months:** position 1 for the English-language query is very achievable. You are already at 2 and the competing #1 (a Goodreads author page) is not a strong result — it is an aggregator page with thin content.
- **Knowledge Panel:** possible but not guaranteed, and not fully in your control. Phases 3 + 4 are the prerequisites; Wikidata is the usual trigger. Treat it as a stretch goal.
- **The et.wikipedia entry will not go away**, and shouldn't be your measure of success. You are not trying to erase the other Raul Kalev — you are trying to make yours the *default* interpretation for people searching in an engineering/software context, and to own as much of the page as possible.

**One caveat worth stating plainly:** the namesake has a Wikipedia article, which is an unusually durable ranking signal. If he continues publishing and getting press, the SERP may permanently stay mixed. Owning positions 1, 2, 3 and 5 with a mixed page one is a genuinely good outcome and probably the practical ceiling.

---

## 6. Measurement

Track monthly in Search Console:

- Average position for the query `raul kalev` (and `raul kalev revit`, `rk tools`, `raul kalev insener`)
- Impressions and CTR for those queries
- Number of distinct pages of yours appearing in the top 10 (manual check, incognito, Estonian IP if possible)
- Referring domains (use Ahrefs Webmaster Tools free tier or Search Console's Links report)
- Indexed page count as `/et/` and `/blog/` come online

Re-screenshot the SERP monthly. Position for a name query is noisy week to week; only the monthly trend is meaningful.

---

## 7. What not to do

- **Do not keyword-stuff "Raul Kalev".** The name already appears 9× on the homepage, which is plenty. More will look manipulative and can trigger a spam classifier.
- **Do not buy links or use a "reputation management" service.** For a name query with this little competition, they are pure downside risk.
- **Do not mention the other Raul Kalev anywhere on the site.** It creates exactly the association you are trying to break.
- **Do not create fake or duplicate profiles** to pad `sameAs`. Google detects thin identity spam, and a bad `sameAs` link is worse than a missing one.
- **Do not migrate domains more than once more.** One further move (to the apex) is acceptable and recoverable; a third is not. See §4.1 on timing it before the `sameAs` network is built.
- **Do not buy `raulkalev.com`.** You already own the better domain for this query. Spend the effort reclaiming it instead.
- **Do not gate the plugin content behind JS.** Your current pages render server-side in the HTML, which is correct — keep it that way as the site grows.

---

## 8. Suggested execution order

If you want a single prioritised checklist, do it in this order:

1. Submit the sitemap in Search Console and record the baseline *(30 min)*
2. Rewrite the homepage `<title>` and meta description, name-first *(15 min)*
3. Build `/about/` *(3–4 h)* ← **do not skip or shorten this one**
4. Complete the `Person` + `Organization` JSON-LD *(1–2 h)*
5. Fix the Autodesk App Store publisher profile and the GitHub profile README *(1 h)*
6. Add name bylines and `/about/` links to `/plugins/` and `/pulse/` *(30 min)*
7. Execute the `tools.raulkalev.ee` cutover — one zone.ee CNAME, then merge (§4.1) *(under an hour)*
8. Ship `/et/` with real hreflang *(4 h)*
9. Record 5 short plugin demo videos on YouTube *(half a day)*
10. Start the blog; one post per month, distributed *(ongoing)*

Steps 1–6 are roughly a single focused day and should capture the majority of the achievable gain.
