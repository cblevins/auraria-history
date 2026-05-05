# Audio Tour Implementation Plan

## 1. Clarify Site Structure

- The tour officially has 11 stops.
- Each stop page is the canonical home for that stop’s:
  - audio
  - transcript
  - location/orientation
  - starting perspective photo
- The full tour is a separate page, not Stop 12.

Recommended URL structure:

- `/tour/`
- `/tour/stop-01/`
- `/tour/stop-02/`
- …
- `/tour/stop-11/`
- `/tour/full/`

## 2. Standardize Stop Frontmatter

Use a compact frontmatter schema for the 11 official stops.

Recommended schema:

```yaml
layout: tour-episode
title: "Welcome to the Westside!"
stop_number: 1
permalink: /tour/stop-01/

location_name: "1015 9th St."
location_lat: 39.741301891632276
location_lng: -105.00352433424034

perspective_image: "/assets/images/stop-01-start.jpeg"
thumbnail_image: "/assets/images/stop-01-drawing-icon.jpg"

spotify_url: ""
apple_url: ""
rss_url: ""
```

Field notes:

- `title`: stop title only, without `Stop 1:` baked into the title.
- Titles are as follows (sequential)

1. Welcome to the Westside
2. Growing Up in Auraria
3. The Torres Family Porch
4. Local Business
5. Play in Industrial and Residential Spaces
6. Community Gathering
7. Urban Renewal Takes Aim at the Westside
8. The Trauma of Displacement
9. The Histories That Get Remembered
10. Redress and Renovation
11. Resilience

- `stop_number`: controls numbering, sorting, previous/next navigation, map marker labels, and audio file lookup.
- `location_name`: the prominent written address/location shown on the stop page.
  - Examples:
    - `1015 9th St.`
    - `The Arts Building on 9th Street Plaza`
    - `St. Cajetan's Church`
- `location_lat` and `location_lng`: hand-located coordinates for maps.
- `perspective_image`: the starting perspective photo.
- `thumbnail_image`: small visual used in the stop index or page header.
- `spotify_url`, `apple_url`, `rss_url`: optional per-stop streaming links.

Remove from the stop frontmatter unless a later need appears:

- `description`
- `location_address`
- `map_query`
- `duration`

## 3. Audio Source Strategy

Use two layers of audio access.

Primary web audio:

- Internet Archive audio remains the embedded/direct web player on each stop page.
- The stop page can derive the Archive MP3 URL from `stop_number`, as it does now, if file naming remains stable.

Secondary listening options:

- Per-stop streaming links appear as compact icons.
- These are optional and render only when frontmatter URLs exist.

## 4. Build Streaming Links Component

Create or adapt a reusable include for streaming links.

Supported links:

- Spotify
- Apple Podcasts
- RSS

Display:

```text
Listen on: [Spotify icon] [Apple icon] [RSS icon]
```

Behavior:

- Hide the entire component if no links exist.
- Render only populated links.
- Use compact icon buttons suitable for mobile.
- Include accessible labels:
  - `Listen to this stop on Spotify`
  - `Listen to this stop on Apple Podcasts`
  - `Subscribe via RSS`
- Open external links in a new tab with `rel="noopener"`.

Use this component on:

- individual stop pages
- full-tour page, if full-tour streaming URLs are available

## 5. Redesign Tour Landing Page

The tour landing page should function as a practical tour dashboard.

Recommended order:

1. Page title and concise intro
2. Primary actions
   - Start at Stop 1
   - Listen to Full Tour
   - View Stops
3. Interactive numbered map
4. Numbered stop list

Each stop list item should include:

- stop number
- title
- thumbnail
- `location_name`
- link to the canonical stop page

Keep the landing page focused. Do not show every per-stop streaming link here unless the goal shifts toward making the landing page a listening dashboard.

## 6. Build Clickable Numbered Map

Start with numbered stop locations only.

Implementation approach:

- Use Leaflet.
- Pull coordinates from `_stops` frontmatter.
- Render one numbered marker per stop.
- Marker label should match `stop_number`.
- Marker popup should include:
  - stop number
  - title
  - `location_name`
  - link to stop page

Rules:

- Use only hand-entered `location_lat` and `location_lng`.
- Do not use `map_query`.
- If coordinates are missing for a stop, omit that stop from the map but keep it in the stop list.

## 7. Redesign Individual Stop Page

Each stop page should be clean, consistent, and orientation-first.

Recommended order:

1. Header
   - `Stop {{ stop_number }}`
   - `title`
   - prominent `location_name`

2. Orientation block
   - starting perspective photo
   - compact map using `location_lat` and `location_lng`

3. Audio block
   - Internet Archive audio player
   - compact streaming-player icons:
     - Spotify
     - Apple Podcasts
     - RSS

4. Transcript block
   - transcript pulled from `_transcripts/stop-NN-transcript.md`
   - preserve existing markdown formatting
   - transcript functions primarily as accessibility support

5. Stop navigation
   - previous stop
   - all stops
   - next stop

Design notes:

- Avoid duplicating wayfinding instructions already embedded in the audio.
- Use neutral labels such as:
  - `Starting View`
  - `Location`
  - `Listen`
  - `Transcript`
- On desktop, consider showing photo and map together.
- On mobile, make photo, map, and audio easy to reach without much scrolling or hidden interaction.

## 8. Create Full Tour Page

Make `/tour/full/` a separate page type.

Recommended structure:

1. Header
   - `Full Tour`
   - short description

2. Full audio player
   - Internet Archive embed/direct audio

3. Streaming links
   - Spotify
   - Apple Podcasts
   - Amazon Music
   - RSS

4. Transcript table of contents
   - Stop 1
   - Stop 2
   - …
   - Stop 11
   - each item links to its transcript anchor on the same page
   - each item also links to the canonical stop page

5. Full transcript
   - stop-by-stop headings
   - anchor each stop heading
   - preserve existing transcript formatting

Optional later:

- timestamps, if available
- compact map/list alongside the transcript

## 9. Clean Up Collection Logic

Ensure only the 11 official stops appear in:

- tour landing stop list
- interactive map
- previous/next stop navigation
- any generated stop collections

Likely cleanup:

- remove or relocate `_stops/stop-12.md`
- keep the full-tour page outside `_stops`
- ensure `/tour/full/` is stable

## 10. Responsive Design Pass

Check the tour experience on:

- mobile phone
- tablet
- desktop/laptop

Priority checks:

- starting perspective photo is recognizable
- map is usable
- `location_name` is prominent
- audio player is easy to find
- streaming icons are tappable
- transcript is readable
- previous/next navigation does not crowd awkwardly
- landing page map and stop list work together cleanly

## 11. Accessibility Pass

Verify:

- streaming icons have accessible labels
- maps have useful labels
- images have clear alt text
- transcript markdown remains screen-reader friendly
- keyboard focus works for:
  - streaming icons
  - map links
  - transcript controls, if collapsible
  - previous/next navigation
- external links use `rel="noopener"`

## 12. Suggested Implementation Order

1. Remove or relocate `stop-12` so the official stop collection contains only Stops 1-11.
2. Standardize frontmatter for the 11 stop files.
3. Add `location_name`, `location_lat`, and `location_lng` to every stop.
4. Remove unused `description`, `location_address`, `map_query`, and `duration` fields.
5. Build the reusable streaming-links include.
6. Update individual stop page layout.
7. Create/update the full-tour page layout.
8. Update the tour landing page stop list.
9. Add the interactive numbered landing map.
10. Run responsive and accessibility checks.
11. Polish spacing, typography, and mobile layout.
