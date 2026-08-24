import { chromium } from 'playwright';
import fs from 'fs';

const OUT = process.env.OUT || 'site-shots';
fs.mkdirSync(OUT, { recursive: true });

const base = 'https://talkingscientistventures.com';
const pages = ['/', '/about.html', '/products.html', '/contact.html', '/terms.html', '/privacy.html', '/refunds.html', '/nope-404-test'];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 375, height: 812 },
];

const problems = [];
const browser = await chromium.launch();

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') problems.push(`[console ${vp.name}] ${page.url()}: ${m.text()}`); });
  page.on('pageerror', e => problems.push(`[pageerror ${vp.name}] ${page.url()}: ${e.message}`));
  page.on('requestfailed', r => problems.push(`[reqfail ${vp.name}] ${page.url()} -> ${r.url()}: ${r.failure()?.errorText}`));

  for (const p of pages) {
    const resp = await page.goto(base + p, { waitUntil: 'networkidle' });
    const status = resp.status();
    const expected = p.includes('404-test') ? 404 : 200;
    if (status !== expected) problems.push(`[status] ${p} -> ${status} (expected ${expected})`);
    // horizontal overflow check (mobile responsiveness)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 1) problems.push(`[overflow ${vp.name}] ${p}: body ${overflow}px wider than viewport`);
    const name = p === '/' ? 'index' : p.replace(/^\//, '').replace(/\.html$/, '').replace(/[^a-z0-9-]/g, '-');
    await page.screenshot({ path: `${OUT}/${name}-${vp.name}.png`, fullPage: true });
  }
  await ctx.close();
}

// footer legal links present on every page
const ctx = await browser.newContext();
const page = await ctx.newPage();
for (const p of pages.filter(p => !p.includes('404-test'))) {
  await page.goto(base + p);
  for (const legal of ['/terms.html', '/privacy.html', '/refunds.html']) {
    const n = await page.locator(`footer a[href="${legal}"]`).count();
    if (n === 0) problems.push(`[legal-link] ${p}: footer missing link to ${legal}`);
  }
  const shop = await page.locator('a[href="https://gritbench.etsy.com"]').count();
  if (shop === 0) problems.push(`[shop-link] ${p}: no Etsy shop link`);
  const mail = await page.locator('a[href^="mailto:support@talkingscientistventures.com"]').count();
  if (mail === 0) problems.push(`[support] ${p}: no support mailto`);
}
await browser.close();

fs.writeFileSync(`${OUT}/problems.txt`, problems.join('\n') + '\n');
console.log(problems.length ? `PROBLEMS (${problems.length}):\n` + problems.join('\n') : 'ALL CHECKS PASSED');
