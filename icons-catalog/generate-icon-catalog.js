#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LIBRARY_FOLDERS, getLibraryFilter } from './libraries.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de directorios
const ICONLIB_DIR = path.join(__dirname, '..', 'packages', 'iconlib');
const FONTAWESOME_BRANDS_SRC_DIR = path.join(__dirname, '..', 'src-icons', 'font-awesome', 'brands');
const CATALOG_OUTPUT_FILE = path.join(__dirname, 'icon-catalog.json');

const TAG_REGEX = /customElements\.define\('([^']+)'/;
const SVG_REGEX = /getSvgIcon\(\)\s*\{\s*return\s*`([^`]+)`/;

/**
 * Extrae el nombre del custom element definido en el componente generado
 */
function extractTag(fileContent, filePath) {
  const match = fileContent.match(TAG_REGEX);
  if (!match) {
    throw new Error(`No se encontró customElements.define(...) en ${filePath}`);
  }
  return match[1];
}

/**
 * Extrae el contenido SVG devuelto por getSvgIcon() en el componente generado
 */
function extractSvg(fileContent, filePath) {
  const match = fileContent.match(SVG_REGEX);
  if (!match) {
    throw new Error(`No se encontró getSvgIcon() en ${filePath}`);
  }
  return match[1];
}

/**
 * Devuelve el conjunto de nombres de icono que son marcas (brands) de FontAwesome,
 * leyendo los .svg de origen en src-icons/font-awesome/brands. Esta carpeta no se
 * versiona en git (ver .gitignore), así que si no está disponible localmente se
 * degrada de forma segura: is_brand se marcará como false para todos los iconos.
 */
function getFontawesomeBrandNames() {
  if (!fs.existsSync(FONTAWESOME_BRANDS_SRC_DIR)) {
    console.warn(`⚠️  No se encontró ${FONTAWESOME_BRANDS_SRC_DIR}; "is_brand" se marcará como false para todos los iconos de fontawesome.`);
    return new Set();
  }

  return new Set(
    fs.readdirSync(FONTAWESOME_BRANDS_SRC_DIR)
      .filter(file => file.endsWith('.svg'))
      .map(file => file.replace('.svg', ''))
  );
}

/**
 * Genera las entradas del catálogo para una carpeta de librería
 */
function buildLibraryEntries({ folder, library }, brandNames) {
  const folderPath = path.join(ICONLIB_DIR, folder);

  if (!fs.existsSync(folderPath)) {
    console.error(`❌ Error: No se encontró el directorio ${folderPath}`);
    process.exit(1);
  }

  const svgComponentFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

  return svgComponentFiles.map(fileName => {
    const filePath = path.join(folderPath, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const name = fileName.replace('.js', '');
    const tag = extractTag(fileContent, filePath);
    const svg = extractSvg(fileContent, filePath);

    return {
      id: `${library}.${name}`,
      library,
      is_brand: library === 'fontawesome' && brandNames.has(name),
      name,
      tag,
      import: `@dile/iconlib/${folder}/${fileName}`,
      svg,
      keywords: []
    };
  });
}

function generateCatalog() {
  const libraryFilter = getLibraryFilter();
  const foldersToProcess = libraryFilter
    ? LIBRARY_FOLDERS.filter(({ library }) => libraryFilter.includes(library))
    : LIBRARY_FOLDERS;

  console.log('🚀 Iniciando generación del catálogo de iconos...');
  console.log(libraryFilter
    ? `🎯 Filtro de biblioteca: ${libraryFilter.join(', ')}\n`
    : '🌐 Sin filtro: se procesan todas las bibliotecas\n');

  const brandNames = getFontawesomeBrandNames();

  const entries = foldersToProcess.flatMap(libraryFolder => {
    const libraryEntries = buildLibraryEntries(libraryFolder, brandNames);
    console.log(`📋 ${libraryFolder.library}: ${libraryEntries.length} iconos`);
    return libraryEntries;
  });

  entries.sort((a, b) => a.library.localeCompare(b.library) || a.name.localeCompare(b.name));

  fs.writeFileSync(CATALOG_OUTPUT_FILE, JSON.stringify(entries, null, 2), 'utf8');

  console.log(`\n🎉 Catálogo generado!`);
  console.log(`✅ Total de iconos: ${entries.length}`);
  console.log(`📁 Ubicación: ${CATALOG_OUTPUT_FILE}`);
}

generateCatalog();
