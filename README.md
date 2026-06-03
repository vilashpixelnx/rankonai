# RankOnAI — Landing Page

A single-page marketing / sales landing page for **RankOnAI**, an *AI visibility* (GEO — Generative Engine Optimization) product. The pitch: get a website cited *inside* AI answers (ChatGPT, Claude, Perplexity, Gemini, Copilot) instead of relying on traditional SEO. Sold as a one-time low-ticket offer.

This document explains **what the project is and how it is organized**. For the rules on *how to edit* the page (class conventions, CSS structure, responsive rules), see [DEVELOPMENT_GUIDELINES.md](DEVELOPMENT_GUIDELINES.md).

## Tech Stack

- Static **HTML/CSS/JS** — no build step, no framework, no package manager.
- **Bootstrap 5** (local `bootstrap.min.css` / `bootstrap.bundle.min.js`) — used only for the grid (`container-fluid`, `row`, `col-*`) and helpers like `d-none`, `d-flex`.
- **jQuery 3.6** — `custom.js` is wrapped in a jQuery IIFE.
- **Swiper** + **AOS** — vendored but not actively wired into the current sections.
- **Hanken Grotesk** — loaded from Google Fonts; the single site font (`--fontHanken`).
- Designed to run under the VS Code **Live Server** extension (port `5501`, see `live/.vscode/settings.json`).

## Folder Structure

```
rankonai/
├── README.md                   ← this file (project overview & structure)
├── DEVELOPMENT_GUIDELINES.md   ← editing rules / styling contract
└── live/                        ← the deployable site root
    ├── index.html               ← the entire page (one file, all sections)
    ├── .vscode/settings.json    ← Live Server port (5501)
    └── assets/
        ├── css/
        │   ├── common.css       ← atomic utility system (fonts, spacing, colors, gradients)
        │   ├── style.css        ← :root variables + per-section styling
        │   ├── bootstrap.min.css
        │   ├── swiper-bundle.min.css
        │   ├── sticky_bar.css   ← fixed promo bar (component, not yet placed in HTML)
        │   └── table.css        ← pricing table (component, not yet placed in HTML)
        ├── js/
        │   ├── custom.js        ← site script (jQuery IIFE; footer year helper)
        │   ├── jquery-3.6.0.min.js
        │   ├── bootstrap.bundle.min.js
        │   ├── swiper-bundle.min.js
        │   └── aos.js
        └── images/
            ├── banner/  big-deal/  new-search/  plugin/  top-slider/
            └── (section mockups: no_answer, cruelest, smart-money, seo_trap, …)
```

> **Note:** `index.html` links `./assets/css/tab.css`, but that file does not exist yet. See [Known Issues](#known-issues--cleanup-backlog).

## How to Run

No build is required — it is a static site.

1. Open the project in VS Code.
2. Install the **Live Server** extension.
3. Right-click `live/index.html` → **Open with Live Server** (serves on port `5501`).

Alternatively, open `live/index.html` directly in a browser, or serve `live/` with any static file server.

## The Utility-Class System (`common.css`)

The page is built almost entirely from **atomic helper classes**, which is why the markup carries long class strings like `xxl50 xl50 lg50 md40 sm40 xs38 ys32 zs26 w800 lh110`. Understand this system before touching the HTML.

### Responsive breakpoints (mobile-first, `min-width`)

Each breakpoint has a font-size prefix. Sizes scale from smallest (`zs`) up; a larger prefix overrides on wider screens.

| Prefix | Activates at | Typical use |
|--------|--------------|-------------|
| `zs`   | ≥ 300px      | phones (base size) |
| `ys`   | ≥ 480px      | large phones |
| `xs`   | ≥ 576px      | landscape phones |
| `sm`   | ≥ 768px      | tablets |
| `md`   | ≥ 992px      | small laptops |
| `lg`   | ≥ 1200px     | laptops |
| `xl`   | ≥ 1400px     | desktops |
| `xxl`  | ≥ 1600px     | large desktops |

### Class families

- **Font size:** `{prefix}{5–150}` → e.g. `xxl50` = 50px at ≥1600px, `zs26` = 26px at ≥300px.
- **Spacing (in %):** `{prefix}{mt|mb|pt|pb}{1–20}` → e.g. `xsmt2` = `margin-top:2%` at ≥576px; `zspb3` = `padding-bottom:3%`. Section padding uses `xspt4 zspt4 xspb4 zspb3` patterns.
- **Font weight:** `w100`–`w900`.
- **Line height:** `lh0`–`lh230` (value = percentage, e.g. `lh120` = `line-height:120%`).
- **Border radius:** `br_5`–`br_30`.
- **Colors:** `white-color`, `dark-color`, `text-color`, `primary-color`, `yellow-color`, `orange-color`, etc.
- **Gradients (text):** `white-gradient-color`, `orange-gradient-color`.
- **Gradients / backgrounds:** `organe-gradient` *(note the existing spelling)*, `organe-gradient-btn`, `dark-bg`, `dark-bg2`, `dark-bg3`, `dark-bg4`.
- **Animations:** `ani_top`, `ani_bottom`, `ani_left_right`, `ani_tri`, `ani_bounce`.

### Design tokens (`style.css` `:root`)

| Variable | Value | Meaning |
|----------|-------|---------|
| `--primary-color` | `#FEA703` | brand amber |
| `--yellow-color` / `--yellow-color2` | `#FF8000` / `#FFFF00` | accent yellows |
| `--darkBg` | `#120C07` | base dark background (`dark-bg`) |
| `--darkColor` | `#222222` | dark text |
| `--white-color` | `#ffffff` | primary text on dark |
| `--text-color` | `#757575` | muted text |
| `--fontHanken` | Hanken Grotesk | global font |

The signature look: **dark brown/black backgrounds + orange (`#FFA11D → #FF4D00`) gradient accents + high-contrast white/gradient headings.** Section backgrounds step through `dark-bg` → `dark-bg2` → `dark-bg3` → `dark-bg4` to create subtle separation.

## Page Sections (narrative flow)

The page is a long-form sales funnel. Each `<section>` is `fe_`-prefixed and styled in `style.css`. Sections are authored **hidden with `d-none`** and revealed when finished.

| # | Section class | Purpose | Currently |
|---|---------------|---------|-----------|
| 1 | `fe_banner_wrap` | Hero: headline, VSL video, $17 CTA, guarantee badges | `d-none` |
| 2 | `fe_marquee_section` | Scrolling credibility strip | `d-none` |
| 3 | `fe_ai_engine_section` | "Found across every AI engine" logo grid | `d-none` |
| 4 | `fe_stats_section` | 4 stat cards (900M, 64%, 60%, 48–60%) | `d-none` |
| 5 | `fe_result_section` | Testimonial marquee + 4.9/5 social proof | `d-none` |
| 6 | `fe_plugin_section` | Plugin result screenshots + dashboard mockup | `d-none` |
| 7 | `fe_newSearch_section` | "AI is the new search" problem framing | `d-none` |
| 8 | `fe_noAnswer_section` | "Handing customers to whoever is in the answer" | `d-none` |
| 9 | `fe_cruelest_section` | "Your tools can't even see it happening" | `d-none` |
| 10 | `fe_noAnswer_section` (2nd) | "Smart money already moved" stats | `d-none` |
| 11 | `fe_secTrap_section` | "But I already do SEO — that's the trap" | `d-none` |
| 12 | `fe_bigIdea_section` | **SEO vs GEO** comparison ("The Big Idea") | **Visible** |

> Only the final **Big Idea** section renders right now — its wrapper uses `d-none1` (a non-existent class), so it is *not* hidden. Every other section is explicitly `d-none` while in progress.

### Reusable layout helpers (`style.css`)

Cross-section building blocks worth reusing instead of re-inventing:

- `grid-2-cols` — two-column responsive grid (collapses to 1 column ≤991px).
- `flex-column-gap` — vertical stack with gap.
- `card-left-accent` — dark card with an orange left-accent bar (used for stat/proof lists).
- `flex-center` — centering wrapper.
- `fe_divider` / `fe_newSearch_divider` — horizontal gradient divider.
- `common_orange_pills` / `fe_pill_heading` — the orange pill label above headings.
- `mix-blend-mode-lighten` — blends mockup PNGs into the dark background.

## JavaScript (`custom.js`)

Minimal. A jQuery IIFE (`ShowcaseAI` object) that currently only runs `FooterCopyright()`, which sets the text of an element with id `currentYear` to the current year.

> The `#currentYear` element does not exist in `index.html` yet (the footer is not built), so this call currently no-ops/errors silently. Add the element when the footer section is created.

## Conventions (summary)

Full rules live in [DEVELOPMENT_GUIDELINES.md](DEVELOPMENT_GUIDELINES.md). The essentials:

- **Understand first**, then edit. Read `index.html`, `common.css`, and `style.css` before changing anything.
- **Reuse utility classes**; prefix any *new* class/variable with `fe_`.
- **No inline CSS** — write into the correct stylesheet, wrapped in `/* section START */ … /* section END */` comments.
- **Media queries go at the very end** of the stylesheet; reuse existing breakpoints; no normal CSS after the media-query block begins.
- **Merge duplicates**; keep the dark-background + orange-gradient visual language consistent.

## Known Issues / Cleanup Backlog

These are pre-existing rough edges worth addressing (documented, not yet fixed):

- **Missing stylesheet:** `index.html` links `./assets/css/tab.css`, but the file does not exist (404). Either add `tab.css` or remove the link.
- **Duplicate script load:** `swiper-bundle.min.js` is included twice (one tag has a `defter` typo for `defer`).
- **`d-none1` typo:** the Big Idea section uses `d-none1` (no such class), so it stays visible — intentional for now, but easy to misread.
- **Placeholder copy:** testimonial cards in `fe_result_section` still contain WordPress-theme lorem text.
- **Unused vendors:** `aos.js` and Swiper are loaded but not wired to any active section.
- **Footer not built:** `custom.js` expects `#currentYear`, which isn't in the DOM yet.
