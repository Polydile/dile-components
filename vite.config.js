import { defineConfig } from 'vite'
import { scannerMlAssets } from './packages/scanner/vite-plugin.js'

export default defineConfig({
  root: 'demos',
  // Self-hosted ML detector files for the dile-scanner demo.
  plugins: [scannerMlAssets()],
  server: {
    port: 5174,
  }
})
