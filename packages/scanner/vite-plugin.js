// Vite plugin that serves a self-hosted copy of the ML detector files
// ("scanic-ml" package, installed with @dile/scanner at the version that
// matches its scanic version). Use it with the "ml-assets-url" attribute:
//
//   // vite.config.js
//   import { scannerMlAssets } from '@dile/scanner/vite-plugin.js';
//   export default { plugins: [scannerMlAssets()] };
//
//   <dile-scanner ml-detector ml-assets-url="/dile-scanner-ml/"></dile-scanner>
//
// The files are served by the dev server and copied to the build with their
// original names (scanic expects them together in one folder). They are only
// downloaded by the browser when the ML detector is actually used.
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";

export const ML_ASSET_FILES = [
  "doccornernet_lean.ort",
  "ort-wasm-simd-threaded.mjs",
  "ort-wasm-simd-threaded.wasm",
];

const CONTENT_TYPES = {
  ".ort": "application/octet-stream",
  ".mjs": "text/javascript",
  ".wasm": "application/wasm",
};

// Folder of the "scanic-ml" files, resolved from this package so it is the
// version pinned by @dile/scanner.
export function mlAssetsDir() {
  const require = createRequire(import.meta.url);
  return join(dirname(require.resolve("scanic-ml/package.json")), "dist");
}

export function scannerMlAssets({ path = "dile-scanner-ml" } = {}) {
  const folder = path.replace(/^\/+|\/+$/g, "");
  const assetsDir = mlAssetsDir();
  return {
    name: "dile-scanner-ml-assets",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const prefix = `${server.config.base}${folder}/`;
        const url = req.url.split("?")[0];
        const file = url.startsWith(prefix) ? url.slice(prefix.length) : null;
        if (!ML_ASSET_FILES.includes(file)) {
          return next();
        }
        res.setHeader("Content-Type", CONTENT_TYPES[extname(file)]);
        res.end(readFileSync(join(assetsDir, file)));
      });
    },
    generateBundle() {
      for (const file of ML_ASSET_FILES) {
        this.emitFile({
          type: "asset",
          fileName: `${folder}/${file}`,
          source: readFileSync(join(assetsDir, file)),
        });
      }
    },
  };
}
