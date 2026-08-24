# Parent-site build evidence — 2026-08-24

Task: replace the DreamHost placeholder at talkingscientistventures.com with a
finished parent site plus legal pages, unlocking the Paddle application and the
startup-credit applications.

## What shipped

Static HTML/CSS site, zero JavaScript (so zero console errors by construction):

- `/` `about.html` `products.html` `contact.html`
- `terms.html` `privacy.html` `refunds.html` — all dated **August 24, 2026**,
  linked from the footer of every page
- `404.html` + `.htaccess` (custom 404, 301 www → apex), `robots.txt`
- Fonts: Fraunces + Public Sans via Google Fonts; single stylesheet;
  light/dark via `prefers-color-scheme`

Deployed with `deploy.sh`: mediabeast → tsv01 (staging in /tmp) → `vps` alias →
`~/talkingscientistventures.com/`, mirrored with `--delete` (placeholder
`index.html`, empty `favicon.ico`/`favicon.gif`, and the DreamHost `.dh-diag`
symlink were removed; `.dh-diag` is a DreamHost diagnostic link the panel can
regenerate — harmless).

## Verification (Playwright chromium 1.62.1 on tsv01, live URLs)

Script: repo `ops/` was verified by `/tmp/verify.mjs` on tsv01; results in
`problems.txt` alongside the screenshots.

- All 7 pages return 200 at desktop (1440×900) and mobile (375×812); the
  deliberate `/nope-404-test` returns 404 and renders the custom 404 page.
- Zero horizontal overflow at mobile width on every page.
- Zero console errors, page errors, or failed requests on all real pages.
  (The only two logged console entries are the 404 test page's own 404
  response — expected.)
- Footer of every page links `/terms.html`, `/privacy.html`, `/refunds.html`;
  every page carries the Etsy shop link (gritbench.etsy.com) and
  `support@talkingscientistventures.com`.
- `grep -rniE '\bAI\b|AI-led|AI-powered|artificial intelligence'` over the
  built output: no matches. The only automation reference is the About page's
  "run it on heavy automation" line, per the recorded rule.

## Live checks

- `https://talkingscientistventures.com/` → 200 (HTTP/2, Apache)
- `https://www.talkingscientistventures.com/` → 301 → apex
- Certificate: Let's Encrypt, CN=talkingscientistventures.com,
  SAN covers apex + www, valid 2026-08-11 → 2026-11-09 (DreamHost
  auto-renews). No founder action needed.

## Screenshots

`ops/evidence/*.png` — every page at desktop and mobile widths, full page.
Copies also staged for the session evidence drop.
