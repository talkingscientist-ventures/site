// Screenshot + sanity harness. Run with node 22 from a repo that has
// playwright 1.62 installed (e.g. cd /mnt/storage/user-storage/repos/agent-office).
//   BASE=https://talkingscientistventures.com OUT=/abs/out node /abs/ops/shots.mjs
//   BASE=file:///mnt/storage/user-storage/repos/site OUT=... node ops/shots.mjs
//   PAGES="/candidate-a.html" for a single file.
import { chromium } from 'playwright';
import fs from 'fs';

const OUT = process.env.OUT || 'site-shots';
fs.mkdirSync(OUT, { recursive: true });

const base = process.env.BASE || 'https://talkingscientistventures.com';
const isFile = base.startsWith('file:');
const pages = process.env.PAGES
  ? process.env.PAGES.split(',')
  : ['/index.html', '/about.html', '/products.html', '/contact.html', '/terms.html', '/privacy.html', '/refunds.html', '/404.html'];
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
    const url = isFile ? base + p : base + (p === '/index.html' ? '/' : p);
    await page.goto(url, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 1) problems.push(`[overflow ${vp.name}] ${p}: ${overflow}px wider than viewport`);
    const name = p.replace(/^\//, '').replace(/\.html$/, '').replace(/[^a-zA-Z0-9-]/g, '-') || 'index';
    await page.screenshot({ path: `${OUT}/${name}-${vp.name}.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close();

fs.writeFileSync(`${OUT}/problems.txt`, problems.join('\n') + '\n');
console.log(problems.length ? `PROBLEMS (${problems.length}):\n` + problems.join('\n') : 'ALL CHECKS PASSED');
