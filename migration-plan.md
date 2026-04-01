# Recovering Auraria's Past -- Static Site Build Plan

## Project Overview

Build a new static website for "Recovering Auraria's Past," a digital humanities project documenting the displacement of Denver's Auraria neighborhood (a largely Chicano/a community displaced in the 1970s to build the Auraria Higher Education Center). The site is currently a WordPress installation at `aurariahistory.org` hosted on Reclaim Hosting. We are rebuilding from scratch as a Jekyll site hosted on GitHub Pages, keeping the same custom domain.

This is not a migration -- it is a fresh build. We are pulling in select content from the old site but redesigning the structure, layout, and design entirely.

---

## Technical Stack

- **Static site generator:** Jekyll
- **Hosting:** GitHub Pages (with native Jekyll build support -- no CI/CD needed)
- **Domain:** `aurariahistory.org` (currently registered through Reclaim Hosting; will point DNS to GitHub Pages)
- **No JavaScript frameworks required.** Plain HTML/CSS with minimal vanilla JS where needed (e.g., audio player controls). Keep it simple and maintainable.
- **No build tools beyond Jekyll itself.** No Webpack, no Sass compilation pipeline, no npm dependencies. Jekyll's built-in Sass support is fine if desired for CSS organization.

---

## Site Structure

```
/
├── index.md                    # Home / landing page
├── about.md                    # About the project and team
├── history.md                  # History of the Auraria neighborhood
├── tour/
│   ├── index.md                # Tour landing page (overview + full audio)
│   ├── stop-01.md              # Episode 1 (placeholder for now)
│   ├── stop-02.md              # Episode 2 (placeholder)
│   ├── stop-03.md              # Episode 3 (placeholder)
│   ├── stop-04.md              # Episode 4 (placeholder)
│   ├── stop-05.md              # Episode 5 (placeholder)
│   ├── stop-06.md              # Episode 6 (placeholder)
│   ├── stop-07.md              # Episode 7 (placeholder)
│   ├── stop-08.md              # Episode 8 (placeholder)
│   ├── stop-09.md              # Episode 9 (placeholder)
│   ├── stop-10.md              # Episode 10 (placeholder)
│   ├── stop-11.md              # Episode 11 (placeholder)
│   └── stop-12.md              # Episode 12 (placeholder)
├── assets/
│   ├── images/                 # Site images (hero photos, historical photos, team headshots)
│   └── docs/                   # Any PDFs or downloadable documents
├── _layouts/
│   ├── default.html            # Base layout (head, nav, footer)
│   ├── page.html               # Standard content page
│   ├── tour-landing.html       # Tour index/landing page layout
│   └── tour-episode.html       # Individual tour stop layout
├── _includes/
│   ├── nav.html                # Navigation bar
│   ├── footer.html             # Site footer
│   ├── audio-player.html       # Reusable embedded audio player (iframe from podcast host)
│   └── podcast-links.html      # "Listen on" badges for Spotify, Apple Podcasts, etc.
├── _sass/                      # Stylesheets (if using Jekyll's Sass support)
│   ├── _variables.scss
│   ├── _layout.scss
│   ├── _typography.scss
│   ├── _nav.scss
│   ├── _tour.scss
│   └── _responsive.scss
├── css/
│   └── main.scss               # Entry point that imports partials
├── _config.yml                 # Jekyll configuration
├── CNAME                       # Contains: aurariahistory.org
├── .gitignore
└── README.md
```

---

## Navigation

Four top-level items. Simple, flat. No complex dropdown menus.

```
Home    About    History    Tour
```

- **Home** -- `/` (landing page)
- **About** -- `/about/`
- **History** -- `/history/`
- **Tour** -- `/tour/` (landing page; individual episodes are linked from here)

The nav should highlight the current section. On mobile, collapse to a hamburger menu.

---

## Page Specifications

### Home (`index.md`)

The landing page. Should feel visually impactful -- this is a public history project about a displaced community. Design should convey dignity and substance, not flashiness.

**Elements needed:**
- Hero section with a large historical photograph and the project title "Recovering Auraria's Past" with the tagline "Histories of a displaced neighborhood."
- A brief introductory paragraph (2-3 sentences) about what the project is
- Section cards or links pointing to the three main areas: About, History, and Tour
- Footer with contact email (rachel.gross@ucdenver.edu) and project affiliation (University of Colorado Denver)
- NEH (National Endowment for the Humanities) grant acknowledgment somewhere on the homepage

**Content to pull from existing site:**
- The quote from Frances Torres displayed on the current homepage: "We started to feel more marginalized as we learned about the displacement and as people were labeling us 'blighted'.... I never thought of my neighborhood as being blighted." -- Frances Torres, Auraria Historical Advocacy Council Member & Displaced Aurarian, Histories and Legacies of Displacement and Removal Symposium, September 28-29, 2022
- The tagline: "Histories of a displaced neighborhood."
- NEH acknowledgment: "Recovering Auraria's Past is made possible by a Humanities Initiative at Colleges and Universities grant from the National Endowment for the Humanities."

### About (`about.md`)

Consolidates information from the current site's "About the Project" and "Team Members" pages into a single page.

**Content to include:**

*Project description:*
> "Recovering Auraria's Past" is a three-year collaborative project with faculty and community members designed to collect, organize, and share existing course materials and research on the history of the Auraria neighborhood in Denver, Colorado. The current Auraria campus in downtown was built in the 1970s through the razing of a Chicano neighborhood and the displacement of over 300 families. This project examines the lasting impact of this displacement. From 2024-2026, we will welcome scholars to the University of Colorado Denver campus to share their work addressing similar projects around the country. Our work will culminate with a digital tour that focuses on the neighborhood's history and its displaced Chicano/a community members.

*Team members (with headshot photos and short bios):*
- **Cameron Blevins** -- Associate Professor, Clinical Teaching Track, History Department; Director of Digital Initiatives, CLAS, University of Colorado Denver. Overseeing technical development of digital walking tours.
- **Michelle Comstock** -- Associate Professor of Writing, Rhetoric, and Technology, Department of English, CU Denver. Research in sonic rhetoric, cultural studies, environmental humanities. Media lead for the project.
- **Rachel Gross** -- Assistant Professor of History, CU Denver. Public historian working with community groups on researching and commemorating the past.
- **Sophia Imperioli** -- Graduate student (based on author role in the WordPress site; may need updated bio).

### History (`history.md`)

History of the Auraria neighborhood. Standalone content page.

**Content to include:**

> In 1972, the city of Denver displaced a largely Chicano/a neighborhood in order to build a new university campus, the Auraria Higher Education Center. Neighborhood residents and community organizations resisted the city's Housing and Urban Development Agency, but ultimately Denver voters gave the agency authority to clear the city's oldest neighborhood and pave the way for the construction of the campus. It was not Auraria's first episode of displacement. Indigenous peoples, including groups of Cheyenne, Arapaho, and Ute, had lived on this land for centuries. Miners occupied their territory in 1858, establishing the Auraria Town Company and touching off a gold rush that violently displaced the area's Indigenous inhabitants. Built on a legacy of displacement, the Auraria campus is now home to Community College of Denver, Metro State University, and the University of Colorado Denver.

- Should include historical photographs (from the media library -- images of the neighborhood, St. Cajetan's Church, construction, residents)
- Link out to Denver Public Library's "Auraria Neighborhood History" resource

### Tour Landing Page (`tour/index.md`)

Overview and entry point for the walking tour.

**Elements needed:**
- Introduction explaining what the tour is (a walking tour of the historic Auraria neighborhood written and given by CU Denver Public History graduate students, using historic photographs and oral history excerpts)
- An embedded audio player for the full combined tour (all 12 stops in a single audio file) -- this will be an embed from the external podcast host (e.g., SoundCloud, Spotify embed, etc.). This audio file is still in production.
- **"Listen on" links/badges** for podcast platforms -- Spotify, Apple Podcasts, and wherever else the podcast is distributed. These should be prominent so people can easily subscribe and listen while walking. Use official badge/button images from each platform where available.
- A grid or list of all 12 tour stops with links to individual episode pages. Each stop should show at minimum: stop number, title, and a thumbnail or placeholder image. As content is produced, these can be enriched with descriptions.
- Optional: an embedded Google Map showing all 12 stop locations (the current site has a Google My Maps embed: `https://www.google.com/maps/d/u/0/embed?mid=1ygI0m5sYyq_BiQxvTbVtZ8WKmEGM8SI&ehbc=2E312F`)

**Layout:** `tour-landing.html`

### Tour Episode Pages (`tour/stop-01.md` through `tour/stop-12.md`)

Individual pages for each of the 12 walking tour stops. Content is still in production, so these need to be **placeholder-ready** -- the template should gracefully handle missing fields.

**Front matter schema for each episode:**

```yaml
---
layout: tour-episode
title: "Stop 1: [Title TBD]"
stop_number: 1
# All fields below are optional -- template should handle their absence
description: ""
audio_embed: ""          # embed URL from podcast host (SoundCloud, Spotify, etc.)
audio_direct_url: ""     # direct link to episode on podcast platform (for "Listen on" links)
transcript: ""           # or could be inline content in the page body
images:
  - src: ""
    alt: ""
    caption: ""
location:
  name: ""
  lat:
  lng:
  address: ""
duration: ""              # e.g. "8 minutes"
---
```

**Template behavior:**
- If `audio_embed` is present, render the embedded player from the podcast host (typically an iframe -- e.g., SoundCloud or Spotify embed code)
- If `audio_direct_url` is present, show a "Listen on [Platform]" link/button
- If `images` are present, display them with captions
- If `location` is present, optionally show a small map or link to Google Maps
- If `duration` is present, display it
- Always show prev/next navigation to adjacent stops
- Always show a link back to the tour landing page
- Page body (below front matter) is used for the main narrative/descriptive text or transcript

For now, create all 12 files with minimal placeholder content (just stop number and a note that content is forthcoming).

---

## Design Requirements

### Visual Identity

The current site uses a palette and feel that works well for the subject matter. Draw from it but modernize and simplify.

- **Primary color:** Olive/dark green (used in the nav bar and accents) -- approximately `#5B6F47` or similar muted olive
- **Accent color:** Warm gold/amber (used for buttons and highlights) -- approximately `#E8A838`
- **Background:** White or very light warm gray
- **Text:** Dark charcoal/near-black for body text
- **Typography:** Serif font for headings (conveys historical weight -- something like Playfair Display, Lora, or similar Google Font). Clean sans-serif for body text (e.g., Inter, Source Sans Pro). Keep it readable and accessible.

### Logo

The current site has a small building/house illustration logo with "Recovering Auraria's Past" text beneath it. This is an SVG file in the WordPress media library. It should be carried over and used in the nav bar.

### General Design Principles

- Clean, spacious layout with generous whitespace
- Mobile-responsive (the site will be used by people on walking tours with their phones)
- Accessible: proper heading hierarchy, alt text on images, sufficient color contrast, keyboard-navigable
- Fast-loading: optimize images, minimal CSS/JS
- Academic but approachable -- this is a university project aimed at both scholars and the general public
- The embedded audio player and podcast links should be prominent and easy to use on mobile (large tap targets). People will be using this while walking around the neighborhood.

---

## Audio Hosting & Podcast Distribution

Audio files will **not** be stored in the GitHub repository due to size limits. Instead, episodes will be hosted on a third-party podcast platform (e.g., SoundCloud, Buzzsprout, Anchor, Libsyn -- TBD) and distributed as a podcast to major listening apps.

### How this affects the site

- **No `/assets/audio/` directory.** Audio lives entirely on the external host.
- **Embedded players:** Each tour episode page and the tour landing page will embed the audio player provided by the podcast host (typically an iframe). The embed URL goes in the episode's front matter (`audio_embed` field).
- **Podcast platform links:** The tour landing page should include prominent "Listen on" badges/links for Spotify, Apple Podcasts, and any other platforms where the podcast is distributed. These URLs are configured in `_config.yml` so they can be set once and referenced across the site.
- **Podcast host is TBD.** The site templates should be flexible enough to accommodate different embed formats. An iframe-based approach works for most hosts (SoundCloud, Spotify, Buzzsprout, etc.).

### Config for podcast links

```yaml
# _config.yml
podcast:
  spotify_url: ""         # URL to the show on Spotify (fill in when available)
  apple_url: ""           # URL to the show on Apple Podcasts
  soundcloud_url: ""      # URL to the show on SoundCloud (or other primary host)
  rss_url: ""             # Direct RSS feed URL
```

The `_includes/audio-player.html` component should accept an embed URL and render the appropriate iframe. The tour landing page template should pull the podcast platform links from `site.podcast` and render them as badge-style links.

---

## Jekyll Configuration (`_config.yml`)

```yaml
title: "Recovering Auraria's Past"
description: "Histories of a displaced neighborhood."
url: "https://aurariahistory.org"
baseurl: ""

# Contact
contact_email: rachel.gross@ucdenver.edu

# Podcast / audio hosting (fill in when platform is chosen)
podcast:
  spotify_url: ""
  apple_url: ""
  soundcloud_url: ""
  rss_url: ""

# Build settings
markdown: kramdown
permalink: pretty

# Sass
sass:
  style: compressed

# Exclude from build
exclude:
  - README.md
  - Gemfile
  - Gemfile.lock
  - vendor
```

---

## Content NOT Being Carried Over

The following sections from the current WordPress site are being dropped in this rebuild:

- Teaching Material section (Curriculum, Assignments, Lesson Plans, Syllabi, Readings, Courses, Student Work)
- News and Events
- Related Projects
- Related Archives
- Project CV
- Digital Tour page (replaced by the new Tour section)
- Contact page (was a starter template leftover with WPForms)
- Services page (starter template leftover)
- About page at `/about/` (starter template leftover -- not the same as "About the Project")
- Privacy Policy (draft)

---

## Deployment & Domain Setup

### GitHub Pages Setup
1. Create a GitHub repository (e.g., `recovering-aurarias-past` or similar)
2. Enable GitHub Pages from the repo settings, pointing to the `main` branch
3. Add a `CNAME` file to the repo root containing `aurariahistory.org`

### DNS Configuration at Reclaim Hosting
When ready to go live, update DNS records:
- Add an `A` record pointing to GitHub Pages IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
- Add a `CNAME` record for `www` pointing to `<username>.github.io`
- Enable HTTPS in GitHub Pages settings after DNS propagates

### Transition Plan
- Build and preview the site on GitHub Pages at `<username>.github.io/<repo-name>` first
- Once the site is ready, switch the DNS
- Cancel Reclaim Hosting WordPress plan after confirming the new site is live and stable

---

## Development Priorities

### Phase 1 -- Scaffolding (do this first)
- Initialize Jekyll project with directory structure
- Create `_config.yml`
- Build the `default.html` layout with nav and footer
- Create `page.html` layout
- Set up CSS/Sass with the color palette and typography
- Make the nav responsive (hamburger on mobile)
- Create the CNAME file

### Phase 2 -- Core Content Pages
- Build the Home page with hero section and section cards
- Build the About page with project description and team member bios
- Build the History page with text content and image placeholders
- Ensure all three pages render correctly and navigation works

### Phase 3 -- Tour Infrastructure
- Create `tour-landing.html` layout
- Create `tour-episode.html` layout with conditional rendering for optional fields
- Create the `_includes/audio-player.html` component (iframe-based embed from podcast host)
- Create the `_includes/podcast-links.html` component (Spotify, Apple Podcasts, etc. badges)
- Build the tour landing page (`tour/index.md`)
- Create all 12 placeholder episode files (`tour/stop-01.md` through `tour/stop-12.md`)
- Implement prev/next navigation between episodes
- Test that adding content to a placeholder episode renders correctly

### Phase 4 -- Polish
- Optimize for mobile (especially the tour pages -- people will use these while walking)
- Accessibility audit (contrast, alt text, heading structure, keyboard nav)
- Test across browsers
- Add any final design touches

---

## Files from the Current Site

The following files are available for reference and content extraction. They are from the WordPress export and screenshots of the current site:

- `recoveringaurariaspast_WordPress_2026-03-17.xml` -- full WordPress XML export containing all page content, metadata, media attachment references, and navigation structure
- `homepage01.png` through `homepage04.png` -- screenshots of the current homepage (hero image, section cards, Frances Torres quote, project description, footer)
- `pagelistwordpress.png` -- screenshot of the WordPress Pages list (20 pages total)
- `pluginlistwordpress.png` -- screenshot of active plugins (Elementor, Astra, WPForms, etc. -- none of this carries over)
- `wordpresstheme.png` -- screenshot showing the Astra theme is active

The media library (images, PDFs, audio) is in a separate zip file not included here. Images will be provided separately as needed. For now, use placeholder images where real ones are not yet available.
