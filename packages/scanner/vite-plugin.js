// Vite plugin that serves a self-hosted copy of the ML detector files
// ("scanic-ml" package, installed with @dile/scanner at the version that
// matches its scanic version). Use it with the "ml-assets-url" attribute:
//
//   // vite.config.js
//   import { scannerMlAssets } from '@dile/scanner/vite-plugin.js';
//   export default { plugins: [scannerMlAssets()] };
//
//   // app code
//   import { mlAssetsUrl } from 'virtual:dile-scanner-ml';
//   scanner.mlAssetsUrl = mlAssetsUrl; // "/dile-scanner-ml/0.2.0/"
//
// The files are served by the dev server and copied to the build with their
// original names (scanic expects them together in one folder). They are only
// downloaded by the browser when the ML detector is actually used.
//
// The default folder includes the scanic-ml version, so updating
// @dile/scanner changes the URL of the files. That way a cache (HTTP or a PWA
// service worker) never mixes the model of one version with the runtime of
// another. The "virtual:dile-scanner-ml" module exports the current URL, so
// the app does not have to write the version by hand.
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";

export const ML_ASSET_FILES = [
  "doccornernet_lean.ort",
  "ort-wasm-simd-threaded.mjs",
  "ort-wasm-simd-threaded.wasm",
];

export const ML_VIRTUAL_MODULE = "virtual:dile-scanner-ml";
const RESOLVED_VIRTUAL_MODULE = `\0${ML_VIRTUAL_MODULE}`;

const CONTENT_TYPES = {
  ".ort": "application/octet-stream",
  ".mjs": "text/javascript",
  ".wasm": "application/wasm",
};

function mlPackageJson() {
  const require = createRequire(import.meta.url);
  return require.resolve("scanic-ml/package.json");
}

// Folder of the "scanic-ml" files, resolved from this package so it is the
// version pinned by @dile/scanner.
export function mlAssetsDir() {
  return join(dirname(mlPackageJson()), "dist");
}

// Version of the "scanic-ml" files (e.g. "0.2.0").
export function mlAssetsVersion() {
  return JSON.parse(readFileSync(mlPackageJson(), "utf8")).version;
}

export function scannerMlAssets({
  path = `dile-scanner-ml/${mlAssetsVersion()}`,
} = {}) {
  const folder = path.replace(/^\/+|\/+$/g, "");
  const assetsDir = mlAssetsDir();
  let base = "/";
  return {
    name: "dile-scanner-ml-assets",
    configResolved(config) {
      base = config.base.endsWith("/") ? config.base : `${config.base}/`;
    },
    resolveId(id) {
      return id === ML_VIRTUAL_MODULE ? RESOLVED_VIRTUAL_MODULE : null;
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_MODULE) {
        return null;
      }
      return [
        `export const mlAssetsUrl = ${JSON.stringify(`${base}${folder}/`)};`,
        `export const mlAssetsVersion = ${JSON.stringify(mlAssetsVersion())};`,
      ].join("\n");
    },
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
