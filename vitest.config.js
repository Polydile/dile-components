import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { scannerMlAssets } from './packages/scanner/vite-plugin.js';

export default defineConfig({
  // Self-hosted ML detector files used by the dile-scanner tests.
  plugins: [scannerMlAssets()],
  test: {
    include: ['packages/**/*.spec.js'],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [
        { browser: 'chromium' },
      ],
    },
  },
});
