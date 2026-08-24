# talkingscientistventures.com

Parent site for TalkingScientist Ventures LLC. Static HTML/CSS, no build step,
no JavaScript.

## Layout

- `index.html`, `about.html`, `products.html`, `contact.html` — the site
- `terms.html`, `privacy.html`, `refunds.html` — legal pages, linked from every footer
- `404.html`, `.htaccess`, `robots.txt` — server plumbing (404 page, www→apex redirect)
- `assets/style.css`, `assets/favicon.svg` — the only assets
- `deploy.sh` — deployment (mediabeast → tsv01 → DreamHost VPS docroot)
- `ops/` — evidence and friction log; never deployed

## Editing

Edit the HTML directly; header and footer are repeated per page, so a nav or
footer change means touching every page (seven files — grep for the block).
Legal pages carry an effective date; update it when the content changes.

Voice rules: plain and factual. No fabricated testimonials, team photos, or
history. Payment language must reflect that marketplaces / a merchant of
record process all payments.

## Deploying

```
./deploy.sh
```

Requires ssh access to tsv01, which holds the `vps` alias and deploy key.
The docroot is mirrored with `--delete` — the repo is the source of truth.
