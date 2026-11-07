import yaml from '@rollup/plugin-yaml';
import { defineConfig } from 'astro/config';

// Preview host until leadership signs DNS cutover. Do not attach sonshinelc.com.
const site = process.env.PUBLIC_SITE_URL || 'https://sonshine-lc.vercel.app';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  server: {
    host: '127.0.0.1',
    port: 4322,
  },
  vite: {
    plugins: [yaml()],
  },
});
