# SEO Baseline — "Raul Kalev"

Reference point for measuring the work in `SEO-PLAN.md`. Recorded from a live
search because Search Console has almost no history for this site: the
property was added only days before the domain migration, so there is no
meaningful pre-work data to compare against.

The absence of Search Console data is **not** evidence the site was
unindexed — it clearly was, and ranking, before any property existed.

---

## Baseline — 2026-07-25

**Query:** `Raul Kalev`

| # | Result | Owner |
|---|---|---|
| 1 | Goodreads — author of *Ilona tagasivõitmise lugu* | Namesake |
| 2 | **Raul Kalev — RK Tools** (`raulkalev.github.io/rktools/`) | **You** |
| 3 | **LinkedIn — BIM Engineer, Low Current Systems Designer** | **You** |
| 4 | Inforegister.ee — Raul Kalev (21.10.1972) | Namesake |
| 5 | IMDb | Namesake |
| 6 | Facebook | Ambiguous |
| 7 | et.wikipedia.org — Raul Kalev | Namesake |
| 8 | raulkalev.blogspot.com — Raul Kalevi blogi | Namesake |
| 9 | Visionest Institute — author page | Namesake |
| 10 | Kalev Kallemets (en.wikipedia) | Unrelated |

**Position:** 2
**Results owned:** 2 of 10 (positions 2 and 3)
**Namesake:** 6 of 10

### State at baseline

- Google still shows the **pre-migration URL** `raulkalev.github.io/rktools/`. The move to `tools.raulkalev.ee` had not been reprocessed yet. Expect the displayed URL to switch over the following weeks — that switch is itself a useful signal that the 301s were processed.
- `/about/` and `/et/about/` were new and not yet indexed.
- `sameAs` had just gone from 2 profiles to 4.
- The homepage title still led with the brand at the moment of this snapshot; it was changed to lead with the name in the same session.
- Search Console: `raulkalev.github.io/rktools/` property added days earlier, sitemap submission had failed, nothing requested for indexing.

### Why the sitemap failed on the old property

`robots.txt` sat at `/rktools/robots.txt`, which crawlers ignore — robots.txt is only honoured at a host root. Resolved by the move: the site now serves at the root of `tools.raulkalev.ee`, so both `robots.txt` and `sitemap.xml` work normally.

---

## Monthly log

Re-run the query in a private window, screenshot the first page, and add a row.
Position on a name query is noisy week to week; only the trend matters.

| Date | Position | Results owned in top 10 | Displayed URL | Notes |
|---|---|---|---|---|
| 2026-07-25 | 2 | 2 | `raulkalev.github.io/rktools/` | Baseline |
|  |  |  |  |  |

### Also worth logging monthly

- Average position and impressions for `raul kalev` in Search Console (remember to switch **Average position** on — it is off by default)
- Indexed page count under Indexing → Pages
- Referring domains under Links → Top linking sites

---

## Win conditions

- **Near term:** hold position 2, get `/about/` indexed, displayed URL switches to `tools.raulkalev.ee`
- **Mid term:** own 3–4 of the top 10 as GitHub, the Autodesk publisher profile and `/about/` surface alongside the site and LinkedIn
- **Target:** position 1
- **Realistic ceiling:** a permanently mixed first page. The namesake holds an Estonian Wikipedia article, which is durable. Owning the top few slots is the practical win, not erasing him.
