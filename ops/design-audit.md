# Design audit — talkingscientistventures.com vs the impeccable.style slop catalog

Date: 2026-08-24. Scored against the full tell catalog at impeccable.style/slop
(the 59-check set; catalog fetched same day). Before-state screenshots:
`ops/evidence-v2/before/` (live site, desktop 1440 + mobile 375, all 8 pages).

## Tells PRESENT in the shipped v1 site

| Tell | Where | Verdict |
|---|---|---|
| Cream / beige palette ("the default 'tasteful' AI surface") | `--paper: #f6f2ea` warm cream background, cream-tinted rules and raised panels across every page | KILL — move to a crisp cool paper/ink scheme |
| Side-tab accent border ("the most recognizable tell of AI-generated UIs") | `.card { border-left: 4px solid var(--accent) }` on the GritBench card (home + products) | KILL |
| Kicker / eyebrow label above heading + hero eyebrow chip | `.kicker` tracked-uppercase label above the h1 on all 5 content pages ("A PRODUCT STUDIO IN ARKANSAS", "THE CATALOG", "404"…) | KILL |
| Status-chip styling | `.tag` tracked-uppercase chips ("FIRST LINE", "AVAILABLE NOW") inside cards; with `.kicker`, `.col-label`, and `.contact-block dt` the page accumulates four flavors of tracked-uppercase microlabel | KILL chips; keep at most one microlabel style where it labels data |
| Em-dash overuse (AI cadence) | 3–5 per page in body copy (home lede alone has two) | REDUCE on content pages (legal pages: content untouched per scope) |
| Monotonous spacing / sections all the same shape | Every section: identical 3.5rem gap, identical h2-over-hairline treatment, one centered 46rem column for everything including the hero | KILL — asymmetric rhythm, varied section shapes |
| Flat-ish type hierarchy | h2 at 1.5rem vs 1.06rem body; display tops out at 3.1rem | STRENGTHEN — bigger jumps between levels |

## Tells ABSENT (verified against the catalog; keep it that way)

Purple/violet gradients and cyan-on-dark; gradient text; radial halos and
spotlight glows; dark-mode glow accents; glassmorphism; hairline-border +
wide-shadow combo; ghost cards; nested cards; identical icon-card grids; icon
tile above heading; italic-serif display hero; oversized viewport-filling
hero; overused fonts (Inter/Geist/Space Grotesk); single-font page; all-caps
body; border-radius blobs (site uses zero radius); decorative grid-line or
stripe backgrounds; hero-metric layout; tiny numbered section labels; pulsing
dots, blinking cursors, marquees, bounce easing, hover transforms (no motion
at all); marketing buzzwords; broken/placeholder images (no images); script
errors (no JS); justified text; sub-12px body; skipped heading levels; tight
line-height; content overflow (verified 0px at 375w).

## Direction for v2

Workshop/toolbench, not tech-startup: ink + cool paper + one confident accent
used sparingly; strong condensed-vs-text type contrast; asymmetric spec-sheet
layout rhythm; concrete clinical copy; zero JavaScript retained; dark mode via
prefers-color-scheme retained.

## Candidates (N-variants rule)

Three home-page candidates built as self-contained static files in
`ops/candidates/`, screenshots in `ops/evidence-v2/candidates/`.

- **A — "Signage"** (`candidate-a.html`): Barlow Semi Condensed display +
  Public Sans text; cool paper `#f4f4f2`, ink `#181815`, safety-orange accent;
  spec-sheet grid — section labels in a left rail, content right; product as a
  full-width ruled band, not a card.
- **B — "Title block"** (`candidate-b.html`): engineering-drawing motif —
  heavy ruled frames, a drawing-style title block for the studio details,
  Oswald display + Source Sans 3 text, near-monochrome with oxide-red accent
  reserved for links/CTA only.
- **C — "Crisp ink"** (`candidate-c.html`): conservative evolution — keeps
  Fraunces + Public Sans but on crisp white, kills kicker/side-tab/chips,
  doubles display scale, dark ink masthead band, moss-green accent.

### Verdicts (one line each)

- A — **WINNER**: the condensed-grotesque signage voice plus the left-rail
  spec grid reads instantly "hardware store, not SaaS" and gives every section
  a different shape; strongest at both 1440 and 375.
- B: the title-block frame is a great motif but the full ruled frame turns
  every section back into a same-shaped box — the motif survives as the
  footer colophon block in the applied design.
- C: safest but still reads like v1 with the volume up; Fraunces at display
  size keeps a literary cast that undercuts the toolbench brief.
