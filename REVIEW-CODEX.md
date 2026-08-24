# Adversarial pre-ship review

Reviewed August 24, 2026. Scope: the repository source and the deployed site at
`https://talkingscientistventures.com`, including the legal pages, public claims,
links, metadata, accessibility basics, Paddle-facing compliance, and HTTP response
headers. The deployed HTML, CSS, favicon, and `robots.txt` matched the repository
byte-for-byte when tested, so the source line references below describe the live
site.

This is a product/compliance review, not legal advice. Counsel should approve the
consumer-law and contract changes before launch.

## Codex Finding 1: The domain does not meet Paddle's published product and pricing review requirements

Severity: **blocker**

`products.html:33-48` shows one Etsy-only product line and says all software apps
are still in development. It provides no price, concrete Paddle-sold product,
feature list, deliverables, screenshots, demo, billing interval, or cancellation
path. The home page is similarly generic (`index.html:33-57`).

Paddle's current [Domain Review requirements](https://www.paddle.com/help/start/account-verification/what-is-domain-verification)
require a clear description of the product being sold through Paddle, pricing,
key features or deliverables, and accessible terms, privacy, and refund pages.
Paddle warns that missing information can delay review. A screenshot of pricing
may be accepted when pricing is not yet live, but this site contains neither a
price nor a pricing screenshot.

This also makes the site look like a prelaunch shell to a startup-credit reviewer:
the only released item points to a shop homepage, while the software business for
which Paddle would be relevant is described only as future work.

Fix before submitting the domain to Paddle: publish a factual page for the exact
product Paddle will sell. Include its current name, screenshots or a working demo,
specific deliverables/features, supported platforms, current price and currency,
billing cadence, cancellation route, support scope, and links to the applicable
legal terms. Link to specific live Etsy listings for the Etsy catalog. Do not fill
these gaps with projections or placeholder claims.

## Codex Finding 2: The privacy policy contradicts the site's stated collection and use

Severity: **major**

`privacy.html:40-43` says support email is used only to answer the sender and fix
the reported problem, then calls support email and server logs the "complete
list" of data collected. The rest of the live site and the policy itself contradict
that statement:

- `products.html:48` invites visitors to email so the company can notify them when
  a product ships and use their message to decide what to build.
- `contact.html:49-51` asks for order numbers, screenshots, product context, and
  product ideas.
- `privacy.html:58` says marketplaces and payment platforms share order details
  for delivery and support, but order data is absent from "What we collect."
- `privacy.html:40` says correspondence is kept as ordinary business records but
  gives no retention rule. `privacy.html:67` promises deletion without explaining
  provider backups, legal holds, or transaction-record retention.

The Arkansas Attorney General's [online-purchase guidance](https://arkansasag.gov/divisions/public-protection/technology/online-purchases/)
specifically tells consumers to determine who collects their information, why it
is collected, and how it is shared. The current internal contradictions defeat
that disclosure.

Fix: disclose each actual category and purpose: support correspondence,
waitlist/release notifications, product research, refund/order data, marketplace
order records, and server logs. State the actual retention period or criterion for
each. Identify which third parties act as independent controllers versus service
providers, and qualify deletion to cover legal retention and backup expiry. Remove
"complete list," "only," and unconditional deletion language unless operations
can prove them continuously.

## Codex Finding 3: The merchant-of-record refund section omits Paddle's controlling process and mandatory rights

Severity: **major**

`refunds.html:43` tells direct-checkout buyers to start with this company and says
"we'll arrange" the refund. `refunds.html:49` generalizes that digital goods cannot
be returned and most channels reflect that. `refunds.html:55-57` says either route
is fine and promises to route a refund when the company considers it the right
answer. The page never identifies Paddle, links Paddle's buyer terms or refund
portal, states that Paddle is the seller for the transaction, or preserves
non-waivable consumer rights.

That is incomplete for the intended model:

- Paddle's [Buyer Terms](https://www.paddle.com/legal/buyer-terms) say the buyer
  purchases from Paddle while the supplier makes the product available under the
  supplier agreement.
- Paddle's [Refund Policy](https://www.paddle.com/legal/refund-policy) directs
  buyers to their receipt/account or Paddle's buyer-support site. It also lists
  country-specific withdrawal periods and states that mandatory consumer rights
  are not limited.
- Paddle's [Master Services Agreement](https://www.paddle.com/legal/terms) says
  Paddle is the seller, Paddle executes refunds, and Paddle may grant refunds in
  circumstances outside the supplier's discretion.

Fix: add a named Paddle section only when Paddle checkout is actually live. Say
that Paddle is the authorized reseller/seller and merchant of record for those
transactions; link the current Paddle Buyer Terms, Refund Policy, and buyer-support
route; state that the company can submit a request but cannot promise Paddle's
decision; and preserve statutory rights. Keep the Etsy policy separate. The
policy version in force at the transaction should govern rather than an unspecified
future channel policy.

## Codex Finding 4: The app-marketplace billing claim is factually wrong

Severity: **major**

`refunds.html:42` groups the Shopify App Store, "WordPress.org-distributed plugins
with paid upgrades," and the Chrome Web Store together and says the marketplace's
refund rules and billing system apply.

That is not a valid shared model. WordPress.org is a free plugin directory, not the
billing system for a paid upgrade. Its current [plugin guidelines](https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/)
prohibit trialware/locked paid functionality in the directory and describe the
limited forms of external premium or service monetization. Google's current
[Chrome Web Store documentation](https://developer.chrome.com/docs/webstore)
identifies Chrome Web Store payments as deprecated; extensions must use an
external payment arrangement. Any Shopify billing/refund implementation must also
be described according to the concrete app configuration, not inferred from the
word "marketplace."

Fix: remove hypothetical channels from the legal policy. Add a channel only after
its product, seller of record, billing provider, refund decision-maker, refund
request route, and applicable terms are verified. WordPress.org distribution and
an external paid upgrade must be described as separate roles.

## Codex Finding 5: The product license and liability terms may never become part of an off-site purchase

Severity: **major**

`terms.html:38` says that using the site or products creates agreement. The license
restrictions and liability cap appear at `terms.html:53-70`, but all purchases are
said to happen on third-party sites (`terms.html:43-48`). Nothing in this repository
shows a buyer receiving these terms before purchase or affirmatively accepting
them. A footer link on the corporate site is weak evidence that an Etsy, app-store,
or Paddle buyer agreed to the supplier license.

Paddle's current Buyer Terms expressly define a separate supplier agreement that
governs product use. If these site terms are intended to be that agreement, the
purchase flow and product delivery need to identify and incorporate the exact
version.

Fix: have counsel choose the contract flow per channel. Put the applicable
supplier/license terms in, or conspicuously link them from, each listing and
checkout before purchase; preserve the accepted version with the order; include
the license with the downloaded product; and use affirmative assent where the
channel supports it. Do not rely on "by using this site" to bind an off-site buyer.

## Codex Finding 6: The dispute and change clauses do not cleanly separate supplier terms from transaction terms

Severity: **major**

`terms.html:47` correctly says the marketplace or merchant-of-record terms govern
the purchase. But `terms.html:85` says material changes take effect immediately
when posted, and `terms.html:90` says any unresolved dispute must be brought in
Arkansas. Those blanket statements do not distinguish a product-license dispute
with the supplier from a payment, tax, cancellation, or refund dispute with the
marketplace/MoR. They also omit a carve-out for mandatory consumer forum and
statutory rights.

Paddle's Buyer Terms apply their own governing-law, dispute, notice, and
country-specific consumer provisions to Paddle transactions. The current wording
can therefore tell one buyer that both the platform's forum and an exclusive
Arkansas forum control the same dispute.

Fix: limit the Arkansas clause to disputes under the supplier/site agreement,
expressly exclude matters governed by the transaction seller's terms, preserve
mandatory consumer rights and forums, and apply material changes prospectively.
Notify existing licensees before a change affects an existing product license.
Have Arkansas counsel review the resulting clause.

## Codex Finding 7: Multiple public claims fail the site's own no-fabrication standard

Severity: **major**

The repository contains no evidence for several concrete or absolute claims:

- "Built from real workflows" (`index.html:44`) and "designed around how trade
  work actually runs" (`products.html:40`).
- "Our customers run shops, crews, and storefronts" and lack IT departments
  (`about.html:37`). No customer list, sales evidence, interview notes, or research
  basis appears in the repository.
- Build, test, and support automation handles "most" repetitive work
  (`about.html:43`).
- Every product is maintained, never abandoned, routes to support, and receives
  an answer (`index.html:64-65`, `about.html:46-49`, `products.html:33`).
- The only product is "Available now" (`index.html:49-55`), but automated review
  could only confirm that `gritbench.etsy.com` redirects to an Etsy shop URL; Etsy
  returned 403 to both `curl` and a browser-fetch service, and public search did
  not return a GritBench listing. This is an evidence gap, not proof that the shop
  is unavailable.

These claims are especially risky because `about.html:47` promises that product
pages describe current facts rather than roadmaps. A reviewer who cannot verify
the sole product or the claimed operating history may treat the whole site as
manufactured credibility.

Fix: maintain a release-evidence packet for every factual claim. Link the product
page to specific live listings, not only the shop root. Keep claims only when the
release owner can point to dated workflow research, current listings, support
records, and maintenance status. Otherwise rewrite them as narrow intentions—for
example, who the product is designed for—without inventing customers, outcomes,
or operating history.

The claim that the company is an Arkansas-registered LLC is also unverified in
this review: Arkansas's official entity-search service returned a CloudFront 403
to automated access, and the repository has no registration artifact. This does
not show the claim is false. Keep the current government-issued registration and
good-standing evidence ready for Paddle and credit-program verification.

## Codex Finding 8: The requested legal URLs return 404

Severity: **major**

Live tests returned 404, with no redirect, for all three conventional legal URLs:

- `https://talkingscientistventures.com/terms`
- `https://talkingscientistventures.com/privacy`
- `https://talkingscientistventures.com/refunds`

The `.html` versions return 200 and are linked in the footer. However, a compliance
application, receipt, app listing, or reviewer using the extensionless URLs lands
on the custom 404 page. Canonical tags do not create routes.

Fix: add permanent, exact redirects from `/terms`, `/privacy`, and `/refunds` to
the corresponding canonical `.html` pages, or make extensionless URLs canonical
and redirect the old `.html` URLs. Test both forms after deployment and use one
form consistently in every marketplace and application.

## Codex Finding 9: The live site has no meaningful browser security headers

Severity: **minor**

Live HTML responses contained standard cache and Apache headers but none of the
following: Content-Security-Policy, Strict-Transport-Security,
X-Content-Type-Options, Referrer-Policy, Permissions-Policy, or frame protection.
`.htaccess:1-7` contains only the 404 configuration and www-to-apex redirect.

The static/no-JavaScript design makes a restrictive policy practical. After
testing on the host, add the equivalent of:

```apache
<IfModule mod_headers.c>
  Header always set Content-Security-Policy "default-src 'self'; script-src 'none'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests"
  Header always set Strict-Transport-Security "max-age=31536000"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "accelerometer=(), camera=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()"
  Header always set X-Frame-Options "DENY"
</IfModule>
```

Add `includeSubDomains` to HSTS only after inventorying every subdomain; do not
submit the domain to the HSTS preload list as part of this change. Confirm that
Google Fonts and the Etsy navigation still work and that 404 responses receive
the same headers.

## Codex Finding 10: Share previews have no Open Graph or card metadata

Severity: **minor**

Every normal page has a title, description, and canonical URL, but no page has an
Open Graph or social-card tag. There is no share image. A link pasted into a
Paddle ticket, credit application, Slack, LinkedIn, or other review workflow may
therefore render as a bare or inconsistent preview.

Fix the home and product pages first with factual `og:title`, `og:description`,
`og:url`, `og:type`, and a stable 1200x630 `og:image`; add
`twitter:card=summary_large_image`. Use a real product/site image, not fabricated
customer or team imagery. Legal pages do not need bespoke cards.

## Codex Finding 11: Repeated navigation has no keyboard bypass

Severity: **minor**

The pages have valid language metadata, one H1, ordered headings, semantic main
and navigation landmarks, no content images needing alt text, and tested color
pairs ranging from 5.51:1 to 15.01:1. Those basics pass. The missing accessibility
basic is a skip link: every page makes a keyboard user traverse the repeated
header navigation before reaching `main`.

Fix: add a visible-on-focus "Skip to main content" link as the first focusable
element and a stable target on `main`. Preserve the browser's visible focus
outline. Test at 200% zoom and with keyboard-only navigation after the change.

## Verification notes and data gaps

- All first-party navigation links and assets returned 200. HTTP and www requests
  redirected to the HTTPS apex. No mixed-content URL appears in source.
- TLS covered both apex and www and was valid during review. The support domain
  had a Google Workspace MX record.
- Direct Google Fonts CSS loaded successfully. Bare preconnect origins returning
  404 are not broken page links.
- The Etsy shop URL redirected to Etsy but Etsy blocked automated requests with
  403. A human browser check of the shop and each listing remains required.
- The repository's same-day desktop/mobile screenshots showed no obvious clipping
  or horizontal overflow, and the deployed files matched the files used for those
  screenshots. A fresh local Playwright run was unavailable because this host has
  Node 18 while the installed Playwright requires Node 20; that rendered-audit gap
  should be closed on the documented `tsv01` verification host.
- Existing Endor findings could not be browsed: `endorctl` is not installed, no
  `ENDOR_NAMESPACE` is set, and no default Endor config exists. No Endor scan was
  started. This report makes no claim that the repository has a clean Endor
  finding inventory.

Verdict: BLOCK
