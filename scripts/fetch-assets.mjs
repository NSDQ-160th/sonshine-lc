#!/usr/bin/env node
/**
 * Vercel / CI helper: pull published photos, PDFs, and fonts when they are
 * missing from the checkout. Local builds skip files already in public/.
 * Do not invent new assets here — only published Squarespace / sibling-repo URLs.
 */
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

const fontsBase =
  'https://raw.githubusercontent.com/NSDQ-160th/calvary-frederick/addb48194a7878a3879d7d8975b0286633e6c1e7/public/fonts';

const assets = [
  {
    dest: 'public/images/logo.jpg',
    url: 'https://images.squarespace-cdn.com/content/v1/614a1b3c2ee0f214783ad721/ac7928f3-0ae1-452f-a878-ada0c5b08f9f/sonshine.jpg',
  },
  {
    dest: 'public/images/og.jpg',
    url: 'https://images.squarespace-cdn.com/content/v1/614a1b3c2ee0f214783ad721/ac7928f3-0ae1-452f-a878-ada0c5b08f9f/sonshine.jpg',
  },
  {
    dest: 'public/images/classroom.jpg',
    url: 'https://images.squarespace-cdn.com/content/v1/614a1b3c2ee0f214783ad721/85f8171a-45e0-4771-a738-08391a9c1863/Schedule_picture.jpg',
  },
  {
    dest: 'public/images/teachers/mhairi.jpg',
    url: 'https://images.squarespace-cdn.com/content/v1/614a1b3c2ee0f214783ad721/f094f5f7-77d7-4a40-a532-0ca26ab39b20/IMG_0050.jpeg',
  },
  {
    dest: 'public/images/teachers/kathy.jpg',
    url: 'https://images.squarespace-cdn.com/content/v1/614a1b3c2ee0f214783ad721/bffa86a4-dddf-49cd-8b48-33890e9f65db/Kathy.jpg',
  },
  { dest: 'public/s/SSLC-Fees-Schedule.pdf', url: 'https://www.sonshinelc.com/s/SSLC-Fees-Schedule.pdf' },
  { dest: 'public/s/SonShine-Parent-Handbook.pdf', url: 'https://www.sonshinelc.com/s/SonShine-Parent-Handbook.pdf' },
  {
    dest: 'public/s/Student-Enrollment-Application_Current.pdf',
    url: 'https://www.sonshinelc.com/s/Student-Enrollment-Application_Current.pdf',
  },
  { dest: 'public/s/emergency-form.pdf', url: 'https://www.sonshinelc.com/s/emergency-form.pdf' },
  {
    dest: 'public/s/SonShine-Photo-Permission-Form.pdf',
    url: 'https://www.sonshinelc.com/s/SonShine-Photo-Permission-Form.pdf',
  },
  {
    dest: 'public/s/OCC-1215-Health-Inventory-Revised-September-2022-final.pdf',
    url: 'https://www.sonshinelc.com/s/OCC-1215-Health-Inventory-Revised-September-2022-final.pdf',
  },
  { dest: 'public/s/FROG-schedule.pdf', url: 'https://www.sonshinelc.com/s/FROG-schedule.pdf' },
  { dest: 'public/s/Learning-Schedule.pdf', url: 'https://www.sonshinelc.com/s/Learning-Schedule.pdf' },
  {
    dest: 'public/s/Sonshine-Camp-Registration-Packet.pdf',
    url: 'https://www.sonshinelc.com/s/Sonshine-Camp-Registration-Packet.pdf',
  },
  { dest: 'public/fonts/oswald-500.woff2', url: `${fontsBase}/oswald-500.woff2` },
  { dest: 'public/fonts/source-sans-3-400.woff2', url: `${fontsBase}/source-sans-3-400.woff2` },
  { dest: 'public/fonts/source-sans-3-600.woff2', url: `${fontsBase}/source-sans-3-600.woff2` },
  { dest: 'public/fonts/newsreader-400-italic.woff2', url: `${fontsBase}/newsreader-400-italic.woff2` },
];

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function fetchOne({ dest, url }) {
  const path = resolve(root, dest);
  if (await exists(path)) {
    console.log(`skip ${dest}`);
    return;
  }
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`${dest}: ${res.status} ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, buf);
  console.log(`wrote ${dest} (${buf.length} bytes)`);
}

const missing = [];
for (const asset of assets) {
  try {
    await fetchOne(asset);
  } catch (err) {
    console.error(String(err));
    missing.push(asset.dest);
  }
}

if (missing.length) {
  console.error(`fetch-assets: ${missing.length} file(s) missing`);
  process.exit(1);
}
