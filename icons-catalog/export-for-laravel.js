#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de archivos
const ENRICHED_CATALOG_FILE = path.join(__dirname, 'icon-catalog.enriched.json');
const EXPORT_OUTPUT_FILE = path.join(__dirname, 'icon-catalog.export.json');

/**
 * Adapta un registro del catálogo enriquecido al formato de export final:
 * - 'id' (formato "library.name") pasa a llamarse 'slug', para no confundirlo
 *   con la clave primaria autoincremental que Laravel/Eloquent asignará en su BD.
 */
function toExportRecord(icon) {
  return {
    slug: icon.id,
    library: icon.library,
    is_brand: icon.is_brand,
    name: icon.name,
    tag: icon.tag,
    import: icon.import,
    svg: icon.svg,
    keywords: icon.keywords
  };
}

function exportForLaravel() {
  console.log('🚀 Generando export del catálogo para Laravel...\n');

  if (!fs.existsSync(ENRICHED_CATALOG_FILE)) {
    console.error(`❌ Error: No se encontró ${ENRICHED_CATALOG_FILE}. Ejecuta antes "npm run apply:icon-keywords".`);
    process.exit(1);
  }

  const enrichedCatalog = JSON.parse(fs.readFileSync(ENRICHED_CATALOG_FILE, 'utf8'));

  const exportPayload = {
    generatedAt: new Date().toISOString(),
    count: enrichedCatalog.length,
    icons: enrichedCatalog.map(toExportRecord)
  };

  fs.writeFileSync(EXPORT_OUTPUT_FILE, JSON.stringify(exportPayload, null, 2), 'utf8');

  console.log(`📋 Iconos exportados: ${exportPayload.count}`);
  console.log(`🕒 Generado: ${exportPayload.generatedAt}`);
  console.log(`\n🎉 Export para Laravel generado!`);
  console.log(`📁 Ubicación: ${EXPORT_OUTPUT_FILE}`);
}

exportForLaravel();
