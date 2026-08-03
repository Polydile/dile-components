#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV_FILE = path.join(__dirname, '..', '.env');
const EXPORT_FILE = path.join(__dirname, 'icon-catalog.export.json');
const SYNC_PATH = '/api/admin/icons/sync';

const isProd = process.argv.includes('--prod');

if (fs.existsSync(ENV_FILE)) {
  process.loadEnvFile(ENV_FILE);
}

/**
 * Resuelve host y llave de sincronización según el entorno.
 * En dev, usa ICONS_API_SERVER / ICONS_SYNC_KEY.
 * En prod, usa ICONS_API_SERVER_PROD / ICONS_SYNC_KEY_PROD, con fallback a
 * ICONS_SYNC_KEY si aún no has creado una llave específica de producción.
 */
function getConfig() {
  const hostVar = isProd ? 'ICONS_API_SERVER_PROD' : 'ICONS_API_SERVER';
  const host = process.env[hostVar];

  if (!host) {
    console.error(`❌ Error: falta la variable ${hostVar} en .env`);
    process.exit(1);
  }

  const syncKey = isProd
    ? (process.env.ICONS_SYNC_KEY_PROD || process.env.ICONS_SYNC_KEY)
    : process.env.ICONS_SYNC_KEY;

  if (!syncKey) {
    console.error(`❌ Error: falta ICONS_SYNC_KEY${isProd ? '_PROD (o ICONS_SYNC_KEY como fallback)' : ''} en .env`);
    process.exit(1);
  }

  return { host: host.replace(/\/$/, ''), syncKey };
}

async function syncIcons() {
  const env = isProd ? 'producción' : 'desarrollo';
  console.log(`🚀 Sincronizando catálogo de iconos con Laravel (entorno: ${env})...\n`);

  if (!fs.existsSync(EXPORT_FILE)) {
    console.error(`❌ Error: No se encontró ${EXPORT_FILE}. Ejecuta antes "npm run export:icon-catalog".`);
    process.exit(1);
  }

  const { host, syncKey } = getConfig();
  const payload = fs.readFileSync(EXPORT_FILE, 'utf8');
  const url = `${host}${SYNC_PATH}`;

  console.log(`📡 Destino: ${url}`);
  console.log(`📦 Tamaño del payload: ${(payload.length / 1024).toFixed(1)} KB\n`);

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Icons-Sync-Key': syncKey
      },
      body: payload
    });
  } catch (error) {
    console.error(`❌ Error de red al contactar ${url}:`, error.message);
    process.exit(1);
  }

  const responseText = await response.text();

  if (!response.ok) {
    console.error(`❌ El servidor respondió ${response.status} ${response.statusText}`);
    console.error(responseText);
    process.exit(1);
  }

  console.log(`✅ Sincronización completada (HTTP ${response.status})`);
  if (responseText) console.log(responseText);
}

syncIcons();
